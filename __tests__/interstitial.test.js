import {describe, expect, it, jest} from '@jest/globals';

jest.mock('react-native-google-mobile-ads', () => ({
  AdEventType: {},
  InterstitialAd: {createForAdRequest: jest.fn()},
  TestIds: {BANNER: 'test-banner', INTERSTITIAL: 'test-interstitial'},
}));
jest.mock('../src/utils/LocalStorage', () => ({}));

const {
  AD_TTL_MS,
  INTERSTITIAL_COOLDOWN_MS,
  INTERSTITIAL_SESSION_CAP,
  isEligible,
} = require('../src/utils/interstitial');

const now = 10 * 60 * 60 * 1000;
const base = {
  now,
  lastShownAt: null,
  count: 0,
  loaded: true,
  adLoadedAt: now - 1000,
};

describe('isEligible', () => {
  it('allows the first ever interstitial', () => {
    expect(isEligible(base)).toBe(true);
  });

  it('rejects when the ad is not loaded', () => {
    expect(isEligible({...base, loaded: false})).toBe(false);
  });

  it('rejects an expired ad', () => {
    expect(isEligible({...base, adLoadedAt: now - AD_TTL_MS})).toBe(false);
  });

  it('rejects once the session cap is reached', () => {
    expect(isEligible({...base, count: INTERSTITIAL_SESSION_CAP})).toBe(false);
  });

  it('rejects inside the cooldown', () => {
    expect(
      isEligible({...base, lastShownAt: now - INTERSTITIAL_COOLDOWN_MS + 1}),
    ).toBe(false);
  });

  it('allows once the cooldown has elapsed', () => {
    expect(
      isEligible({...base, lastShownAt: now - INTERSTITIAL_COOLDOWN_MS}),
    ).toBe(true);
  });
});
