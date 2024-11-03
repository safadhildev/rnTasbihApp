import {useRef} from 'react';
import {Animated, Easing} from 'react-native';

export default {
  moveAndFade: function ({type, animation, opacity, offset, duration = 200}) {
    Animated.parallel([
      Animated.timing(animation, {
        toValue: type === 'in' ? offset : 0, // Move back to the original position
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: type === 'in' ? 1 : 0, // Fade out to invisible
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  },
  moveAndFadeDiagonally: function ({
    type,
    positionX,
    positionY,
    opacity,
    offset,
    duration = 200,
  }) {
    Animated.parallel([
      Animated.timing(positionX, {
        toValue: type === 'in' ? offset : 0, // Return to initial X position
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(positionY, {
        toValue: type === 'in' ? -offset : 0, // Return to initial Y position
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: type === 'in' ? 1 : 0, // Fade out to invisible
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  },
  tap: function () {},
  bounce: function ({
    animationValue = 0,
    toValue = 0,
    duration = 200,
    bounciness = 10,
  }) {
    animationValue.setValue(0);

    Animated.sequence([
      Animated.timing(animationValue, {
        toValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.spring(animationValue, {
        toValue: 0,
        bounciness,
        useNativeDriver: true,
      }),
    ]).start();
  },
  pulse: function ({value, minScale = 0, maxScale = 1.5, duration = 500}) {
    Animated.loop(
      Animated.sequence([
        Animated.spring(value, {
          toValue: minScale,
          duration,
          easing: Easing.elastic(3),
          useNativeDriver: true,
        }),
        Animated.spring(value, {
          toValue: maxScale,
          duration,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
        Animated.spring(value, {
          toValue: minScale,
          duration,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  },
};
