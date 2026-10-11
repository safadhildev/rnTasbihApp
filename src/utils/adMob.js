import {TestIds} from 'react-native-google-mobile-ads';

// AdMob unit IDs are public (they ship inside the app binary), so they live in
// code rather than .env. The AdMob app ID is configured in app.json.
const AD_MOB_BANNER_UNIT_ID = 'ca-app-pub-3081755002327907/4754178314';
const AD_MOB_INTERSTITIAL_UNIT_ID = 'ca-app-pub-3081755002327907/8451634769';

export const AD_UNIT_ID = __DEV__ ? TestIds.BANNER : AD_MOB_BANNER_UNIT_ID;

// once the interstitial ad unit is ready to serve
export const INTERSTITIAL_UNIT_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : AD_MOB_INTERSTITIAL_UNIT_ID;

export const AD_REQUEST_OPTIONS = {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['islam', 'quran'],
};

export const AD_TYPE = {
  BANNER: 'BANNER',
  INTERSTITIAL: 'INTERSTITIAL',
};
