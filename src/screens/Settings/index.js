import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import AdMobBanner from '../../components/AdMob';
import Header from '../../components/Header';
import Text from '../../components/Text';
import {APP_VERSION_LABEL} from '../../utils/appVersion';
import {showIfEligible as showInterstitial} from '../../utils/interstitial';
import themes from '../../utils/themes';
import CounterSettings from './CounterSettings';
import ThemeSettings from './ThemeSettings';

// let the native pop animation finish before the interstitial covers the screen
const INTERSTITIAL_DELAY_MS = 500;

const Settings = () => {
  const navigation = useNavigation();

  // Covers header back, Android hardware back and iOS swipe back.
  // Only shows if a theme change marked the interstitial as pending.
  useEffect(
    () =>
      navigation.addListener('beforeRemove', () => {
        setTimeout(showInterstitial, INTERSTITIAL_DELAY_MS);
      }),
    [navigation],
  );

  const _handleBack = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
        <Header text="Settings" onBack={_handleBack} />
        <ScrollView contentContainerStyle={styles.contentContaienr}>
          <View style={{flex: 1}}>
            <ThemeSettings />
            <CounterSettings />
          </View>
          <Text style={styles.appVersion}>{APP_VERSION_LABEL}</Text>
        </ScrollView>
        <AdMobBanner />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flexGrow: 1},
  contentContaienr: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
  },

  section: theme => ({
    // borderWidth: 1,
    // borderRadius: 20,
    // borderStyle: 'dashed',
    borderColor: themes[theme]?.inputPlacholder,
    marginVertical: 5,
    position: 'relative',
    minHeight: 40,
    paddingVertical: 15,
    // paddingHorizontal: 10,
  }),
  sectionLabel: theme => ({
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginBottom: 3,
    position: 'absolute',
    backgroundColor: themes[theme]?.background,
    color: themes[theme]?.inputPlacholder,
    zIndex: 1,
    top: 5,
    left: 0,
    paddingHorizontal: 5,
    fontSize: 14,
  }),
  appVersion: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
    opacity: 0.5,
  },
  bannerAd: {
    width: '100%',
    alignItems: 'center',
  },
});

export default Settings;
