import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import animation from '../utils/animation';
import assets from '../assets';
import themes from '../utils/themes';
import {useLocalContext} from './context';

const LoadingOverlay = ({isVisible = true, opacity = 1}) => {
  const {theme} = useLocalContext();
  const animValue = useRef(new Animated.Value(1)).current;

  const _animate = () => {
    animation.pulse({
      value: animValue,
      minScale: 1,
      maxScale: 1.1,
      duration: 1000,
    });
  };

  useEffect(() => {
    _animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container(theme, opacity)}>
      <Animated.Image
        source={assets.logo}
        style={StyleSheet.flatten([
          styles.logo,
          {transform: [{scale: animValue}]},
        ])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: (theme, opacity) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes[theme]?.background ?? 'transparent',
    opacity,
  }),
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default LoadingOverlay;
