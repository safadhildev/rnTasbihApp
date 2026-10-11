import {AppState, Platform, StatusBar} from 'react-native';
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads';
import {STORAGE_KEYS} from '../components/constants';
import {AD_REQUEST_OPTIONS, INTERSTITIAL_UNIT_ID} from './adMob';
import LocalStorage from './LocalStorage';

// App-wide interstitial: preloaded once ads are initialized, shown only at a
// natural transition point (see Settings), capped by a persisted cooldown and
// a per-session limit to stay within AdMob interstitial policy.
export const INTERSTITIAL_COOLDOWN_MS = 10 * 60 * 1000;
export const INTERSTITIAL_SESSION_CAP = 2;
// loaded interstitials expire after ~1 hour
export const AD_TTL_MS = 55 * 60 * 1000;
const RETRY_DELAYS_MS = [30 * 1000, 60 * 1000, 120 * 1000];

let ad = null;
let unsubscribeAd = null;
let loadedAt = 0;
let retryIndex = 0;
let retryTimer = null;
let pending = false;
let showing = false;
let sessionCount = 0;
const closeListeners = new Set();

export const isEligible = ({now, lastShownAt, count, loaded, adLoadedAt}) =>
  !!loaded &&
  now - adLoadedAt < AD_TTL_MS &&
  count < INTERSTITIAL_SESSION_CAP &&
  (lastShownAt == null || now - lastShownAt >= INTERSTITIAL_COOLDOWN_MS);

const _handleAdEvent = ({type, payload}) => {
  switch (type) {
    case AdEventType.LOADED:
      loadedAt = Date.now();
      retryIndex = 0;
      break;
    case AdEventType.ERROR:
      showing = false;
      if (__DEV__) {
        console.log('interstitial error', payload);
      }
      if (retryIndex < RETRY_DELAYS_MS.length) {
        clearTimeout(retryTimer);
        retryTimer = setTimeout(preload, RETRY_DELAYS_MS[retryIndex++]);
      }
      break;
    case AdEventType.OPENED:
      showing = true;
      if (Platform.OS === 'ios') {
        StatusBar.setHidden(true);
      }
      break;
    case AdEventType.CLOSED:
      showing = false;
      if (Platform.OS === 'ios') {
        StatusBar.setHidden(false);
      }
      closeListeners.forEach(fn => fn());
      preload();
      break;
    case AdEventType.CLICKED:
    case AdEventType.PAID:
    default:
      break;
  }
};

const _discard = () => {
  unsubscribeAd?.();
  ad = null;
  loadedAt = 0;
};

/**
 * Load an interstitial if none is loaded/loading. Replaces an expired one.
 */
export const preload = () => {
  if (!INTERSTITIAL_UNIT_ID) {
    return;
  }
  if (ad?.loaded && Date.now() - loadedAt >= AD_TTL_MS) {
    _discard();
  }
  if (!ad) {
    ad = InterstitialAd.createForAdRequest(
      INTERSTITIAL_UNIT_ID,
      AD_REQUEST_OPTIONS,
    );
    unsubscribeAd = ad.addAdEventsListener(_handleAdEvent);
  }
  ad.load(); // no-op while loaded or loading
};

export const markPending = () => {
  pending = true;
};

export const onClosed = fn => {
  closeListeners.add(fn);
  return () => closeListeners.delete(fn);
};

/**
 * Show the interstitial if one was requested (markPending) and the ad is
 * ready and allowed by the caps. Never waits for an ad to load.
 * @returns {Promise<boolean>} true when the ad was shown
 */
export const showIfEligible = async () => {
  if (!pending || showing || !ad || AppState.currentState !== 'active') {
    return false;
  }
  pending = false;

  const lastShownAt = JSON.parse(
    await LocalStorage.getItem(STORAGE_KEYS.LAST_INTERSTITIAL_AT),
  );
  const eligible = isEligible({
    now: Date.now(),
    lastShownAt,
    count: sessionCount,
    loaded: ad.loaded,
    adLoadedAt: loadedAt,
  });
  if (!eligible) {
    preload();
    return false;
  }

  try {
    showing = true;
    await ad.show();
    sessionCount += 1;
    await LocalStorage.setItem(STORAGE_KEYS.LAST_INTERSTITIAL_AT, Date.now());
    return true;
  } catch (e) {
    showing = false;
    if (__DEV__) {
      console.log('interstitial show error', e);
    }
    preload();
    return false;
  }
};
