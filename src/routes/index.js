import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { useLocalContext } from '../components/context';
import Home from '../screens/Home';
import Records from '../screens/Records';
import Settings from '../screens/Settings';
import SplashScreen from '../screens/SplashScreen';
import themes from '../utils/themes';
import { HOME, RECORDS, SETTINGS, SPLASH_SCREEN } from './constants';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const localContext = useLocalContext();
  const theme = localContext?.theme;

  // screens paint the navigation theme's background, so match the app theme
  const navigationTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: themes[theme]?.background ?? DefaultTheme.colors.background,
      },
    }),
    [theme],
  );

  if (!localContext) {
    return null;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={SPLASH_SCREEN}>
        <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
        <Stack.Screen name={HOME} component={Home} />
        <Stack.Screen name={RECORDS} component={Records} />
        <Stack.Screen name={SETTINGS} component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
