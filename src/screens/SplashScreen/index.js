import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import LoadingOverlay from '../../components/LodaingOverlay';
import animation from '../../utils/animation';
import useGlobalFucntion from '../../utils/hooks/useGlobal';

const SplashScreen = () => {
  const navigation = useNavigation();
  const {init} = useGlobalFucntion();

  const animValue = useRef(new Animated.Value(1)).current;

  const _animate = () => {
    animation.pulse({
      value: animValue,
      minScale: 1,
      maxScale: 1.1,
      duration: 1000,
    });
  };

  const _init = async () => {
    await init(navigation);
    _animate();
  };

  useEffect(() => {
    _init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <LoadingOverlay isVisible />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default SplashScreen;
