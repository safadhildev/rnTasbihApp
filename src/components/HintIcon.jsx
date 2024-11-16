import {OneFingerSelectHandGesture} from 'iconoir-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import themes from '../utils/themes';
import {COUNTER_TYPE, SWIPER_TYPES} from './constants';
import {useLocalContext} from './context';
import animation from '../utils/animation';

const HintIcon = ({
  counterType,
  customContainerStyle,
  iconStyle,
  size = 20,
}) => {
  const {theme} = useLocalContext();

  const [type, setType] = useState(COUNTER_TYPE.CLICKER);

  const position1 = useRef(new Animated.Value(1)).current;

  const position2 = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const opacity = useRef(new Animated.Value(1)).current;

  const swipeAnimation = useRef(null);

  const _onAnimate = () => {
    let delay = 1000;
    switch (counterType) {
      case COUNTER_TYPE.SWIPE_UP:
        delay = 500;
        break;
      case COUNTER_TYPE.SWIPE_DOWN:
        delay = 800;
        break;
      case COUNTER_TYPE.SWIPE_LEFT:
        delay = 750;
        break;
      case COUNTER_TYPE.SWIPE_RIGHT:
        delay = 1000;
        break;
      default:
        delay = 1000;
        break;
    }

    if (SWIPER_TYPES.includes(counterType)) {
      swipeAnimation.current = animation.swipeHint({
        direction: counterType,
        value: position2,
        opacity: opacity,
        toValue: 10,
        duration: 750,
        delay,
      });
      swipeAnimation.current.start();
    } else if (counterType === COUNTER_TYPE.CLICKER) {
      animation.pulse({
        value: position1,
        minScale: 0.8,
        maxScale: 1,
        duration: 1000,
        delay: 1000,
      });
    }
  };

  useEffect(() => {
    if (counterType) {
      setType(counterType);
      _onAnimate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterType]);

  if (!counterType) {
    return null;
  }

  console.log('[DEBUG] >> ', {position1});

  return (
    <Animated.View
      style={[
        customContainerStyle,
        styles.container(type, type === COUNTER_TYPE.CLICKER ? 1 : opacity),
        counterType === COUNTER_TYPE.CLICKER
          ? {
              transform: [{scale: position1}],
            }
          : [...position2.getTranslateTransform()],
      ]}>
      <OneFingerSelectHandGesture
        color={themes[theme]?.infoText}
        width={size}
        height={size}
        style={iconStyle ?? [styles.infoIcon(counterType)]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: (type, opacity, transform) => ({
    opacity,
    transform,
  }),
  infoIcon: counterType => ({
    marginTop: 3,
    transform: [{rotate: '-30deg'}],
    // marginLeft: counterType === COUNTER_TYPE.SWIPE_LEFT ? 10 : 0,
  }),
});

export default HintIcon;
