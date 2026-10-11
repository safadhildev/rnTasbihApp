import React, { useEffect, useRef } from 'react';
import { Platform, StatusBar } from 'react-native';
import BackgroundView from './src/components/BackgroundView';
import AppContext, { useLocalContext } from './src/components/context';
import Navigator from './src/routes';
import { onClosed as onInterstitialClosed } from './src/utils/interstitial';
import themes from './src/utils/themes';

const Root = () => {
  const {theme} = useLocalContext();
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
    <BackgroundView>
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
    <AppContext>
      <Root />
    </AppContext>
  );
};

export default App;
