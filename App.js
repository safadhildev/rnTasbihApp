import React, { useEffect, useRef } from 'react';
import { Platform, StatusBar } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import BackgroundView from './src/components/BackgroundView';
import AppContext, { useLocalContext } from './src/components/context';
import Navigator from './src/routes';
import { onClosed as onInterstitialClosed } from './src/utils/interstitial';
import themes from './src/utils/themes';

const Root = () => {
  const {theme} = useLocalContext();
  // Android 16 (targetSdk 36) always draws edge-to-edge, so keep content out
  // from under the system bars while the background fills behind them
  const insets = useSafeAreaInsets();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  // full-screen ads can leave the status bar in their own style;
  // re-apply the current theme's once the ad is dismissed
  useEffect(
    () =>
      onInterstitialClosed(() => {
        const current = themes[themeRef.current];
        StatusBar.setBarStyle(current?.barStyle ?? 'dark-content');
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor(current?.background);
        }
      }),
    [],
  );

  return (
    <BackgroundView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <StatusBar
        barStyle={themes[theme]?.barStyle ?? 'dark-content'}
        backgroundColor={themes[theme]?.background}
      />
      <Navigator />
    </BackgroundView>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContext>
        <Root />
      </AppContext>
    </SafeAreaProvider>
  );
};

export default App;
