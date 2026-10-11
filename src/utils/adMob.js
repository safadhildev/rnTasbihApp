import {AD_MOB_BANNER_UNIT_ID} from '@env';
import {TestIds} from 'react-native-google-mobile-ads';

export const AD_UNIT_ID = __DEV__ ? TestIds.BANNER : AD_MOB_BANNER_UNIT_ID;

// TODO: switch to `__DEV__ ? TestIds.INTERSTITIAL : AD_MOB_INTERSTITIAL_UNIT_ID`
// (from '@env') once the interstitial ad unit is ready to serve
export const INTERSTITIAL_UNIT_ID = TestIds.INTERSTITIAL;

export const AD_REQUEST_OPTIONS = {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['islam', 'quran'],
};

export const AD_TYPE = {
  BANNER: 'BANNER',
  INTERSTITIAL: 'INTERSTITIAL',
};
