import {Animated, Easing} from 'react-native';
import {COUNTER_TYPE} from '../components/constants';

export default {
  timing: function ({animationValue, duration = 2000, toValue = 0}) {
    Animated.timing(animationValue, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  },
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
  click: function ({value, minScale = 0, maxScale = 1.5, duration, delay}) {
    Animated.loop(Animated.sequence([]));
  },
  pulse: function ({
    value,
    minScale = 0,
    maxScale = 1.5,
    duration = 500,
    delay = 0,
  }) {
    Animated.loop(
      Animated.sequence([
        Animated.spring(value, {
          toValue: minScale,
          duration,
          // easing: Easing.elastic(3),
          delay,
          useNativeDriver: true,
        }),
        Animated.spring(value, {
          toValue: maxScale,
          duration,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  },
  swipeHint: function ({
    direction,
    value,
    opacity,
    toValue = 200,
    duration = 200,
    delay = 1000,
  }) {
    let endVal;

    switch (direction) {
      case COUNTER_TYPE.SWIPE_LEFT:
        endVal = {x: -toValue, y: 0};
        break;
      case COUNTER_TYPE.SWIPE_RIGHT:
        endVal = {x: toValue, y: 0};
        break;
      case COUNTER_TYPE.SWIPE_UP:
        endVal = {x: 0, y: -toValue};
        break;
      case COUNTER_TYPE.SWIPE_DOWN:
        endVal = {x: 0, y: toValue};
        break;
      default:
        endVal = {x: 0, y: 0};
    }

    // Run the animation
    return Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(value, {
            toValue: endVal,
            duration,
            delay,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(value, {
            toValue: {x: 0, y: 0}, // Reset position
            duration: 50,
            delay: 100,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
  },
  swipeCounterAnimation: function ({
    position1,
    position2,
    opacity1,
    opacity2,
    direction = COUNTER_TYPE.SWIPE_UP,
    duration = 500,
    toValue = 500,
    onComplete,
  }) {
    // Determine the final position based on direction
    let endValue;

    switch (direction) {
      case COUNTER_TYPE.SWIPE_LEFT:
        endValue = {x: -toValue, y: 0};
        break;
      case COUNTER_TYPE.SWIPE_RIGHT:
        endValue = {x: toValue, y: 0};
        break;
      case COUNTER_TYPE.SWIPE_UP:
        endValue = {x: 0, y: -toValue};
        break;
      case COUNTER_TYPE.SWIPE_DOWN:
        endValue = {x: 0, y: toValue};
        break;
      default:
        endValue = {x: 0, y: 0};
    }

    // Run animations in parallel for swipe and fade, with a reset on complete
    Animated.parallel([
      Animated.timing(position1, {
        toValue: endValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity1, {
        toValue: 0, // Fade out Text#1
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(position2, {
        toValue: endValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity2, {
        toValue: 1, // Fade in Text#2
        duration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset positions and opacity
      position1.setValue({x: 0, y: 0});
      position2.setValue({x: 0, y: 0});
      opacity1.setValue(1);
      opacity2.setValue(0);

      // Callback function to update count values
      if (onComplete) {
        onComplete();
      }
    });
  },
};
