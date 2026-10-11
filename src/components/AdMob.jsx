import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {AD_REQUEST_OPTIONS, AD_UNIT_ID} from '../utils/adMob';

const AdMobBanner = () => {
  return (
    <View style={styles.bannerAd}>
      <BannerAd
        unitId={AD_UNIT_ID}
        onAdClosed={() => console.log('closed')}
        onPaid={event => console.log(event)}
        size={BannerAdSize.BANNER}
        requestOptions={{
          ...AD_REQUEST_OPTIONS,
          networkExtras: {
            collapsible: 'bottom',
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerAd: {
    width: '100%',
    alignItems: 'center',
  },
});

export default AdMobBanner;
