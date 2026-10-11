import {OneFingerSelectHandGesture} from '../icons';
import React, {useEffect, useRef} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';
import animation from '../../utils/animation';
import themes from '../../utils/themes';
import {COUNTER_TYPE, Z_INDEX} from '../constants';
import {useLocalContext} from '../context';
import Text from '../Text';

let swipeAnimation = null;

const SwipeCounter = ({
  direction = COUNTER_TYPE.SWIPE_UP,
  onSwipe = () => {},
  showMore = false,
}) => {
  const {theme, currentData} = useLocalContext();

  // const [counterDirection, setCounterDirection] = useState(direction);

  // main counter
  const position1 = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const position2 = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const opacity1 = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;

  // text hint
  const infoAnimValue = useRef(new Animated.Value(1)).current;

  // icon hint
  const iconPosition = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const iconOpacity = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(null);

  const _handleAnimation = () => {
    animation.swipeCounterAnimation({
      position1,
      position2,
      opacity1,
      opacity2,
      direction,
      duration: 150,
      onComplete: () => {
        // Update counters after animation completes
        onSwipe();
      },
    });
  };

  const _startInfoAnimation = () => {
    animation.timing({
      animationValue: infoAnimValue,
      toValue: 0.5,
      duration: 1500,
      useNativeDriver: true,
    });
  };

  const _startIconAnimation = () => {
    swipeAnimation = animation.swipeHint({
      direction,
      value: iconPosition,
      opacity: iconOpacity,
      toValue: 15,
      duration: 1000,
    });
    swipeAnimation.start();
  };

  const _resetHint = () => {
    infoAnimValue.setValue(1);
    iconOpacity.setValue(1);
    iconPosition.setValue({x: 0, y: 0});
    _startIconAnimation();
  };

  const _handleSwipe = () => {
    if (onSwipe && typeof onSwipe === 'function') {
      if (!showMore) {
        _startInfoAnimation();
        _handleAnimation();
      }
    }
  };

  useEffect(() => {
    // Clean up the animation on component unmount

    if (currentData?.count === 0) {
      infoAnimValue.setValue(1);
      _startIconAnimation();
    }

    // return () => {
    //   if (swipeAnimation) {
    //     swipeAnimation.stop();
    //   }
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData?.count, direction]);

  useEffect(() => {
    panResponder.current = PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const {dx, dy} = gestureState;
        // Set PanResponder if horizontal or vertical move is detected
        return Math.abs(dx) > 5 || Math.abs(dy) > 5;
      },
      onPanResponderRelease: (_, gestureState) => {
        const {dx, dy} = gestureState;
        let newDirection = '';

        if (Math.abs(dx) > Math.abs(dy)) {
          newDirection =
            dx > 0 ? COUNTER_TYPE.SWIPE_RIGHT : COUNTER_TYPE.SWIPE_LEFT;
        } else {
          newDirection =
            dy > 0 ? COUNTER_TYPE.SWIPE_DOWN : COUNTER_TYPE.SWIPE_UP;
        }

        // Increase counter if the detected swipe matches the selected direction
        if (newDirection === direction) {
          _handleSwipe();
        } else {
          _resetHint();
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(currentData)]);

  const _getHintText = () => {
    switch (direction) {
      case COUNTER_TYPE.SWIPE_UP:
        return 'Swipe up';
      case COUNTER_TYPE.SWIPE_DOWN:
        return 'Swipe down';
      case COUNTER_TYPE.SWIPE_LEFT:
        return 'Swipe left';
      case COUNTER_TYPE.SWIPE_RIGHT:
        return 'Swipe right';
      default:
        return 'Swipe to start';
    }
  };

  return (
    <View style={styles.container} {...panResponder.current?.panHandlers}>
      <Animated.Text
        style={[
          styles.text(theme),
          {opacity: opacity1, transform: position1.getTranslateTransform()},
        ]}
        adjustsFontSizeToFit
        numberOfLines={1}>
        {currentData?.count}
      </Animated.Text>
      <Animated.Text
        style={[
          styles.nextText(theme, direction),
          {opacity: opacity2, transform: position2.getTranslateTransform()},
        ]}
        adjustsFontSizeToFit
        numberOfLines={1}>
        {currentData?.count + 1}
      </Animated.Text>
      <Animated.View style={styles.infoWrapper(infoAnimValue)}>
        <Text style={styles.info(theme)}>{_getHintText()}</Text>
        <Animated.View
          style={[
            styles.infoIconWrapper,
            {
              opacity: iconOpacity,
              transform: [...iconPosition.getTranslateTransform()],
            },
          ]}>
          <OneFingerSelectHandGesture
            color={themes[theme]?.infoText}
            width={20}
            height={20}
            style={styles.infoIcon(direction)}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: Z_INDEX.FLOOR,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: theme => ({
    fontSize: 200,
    fontWeight: 'bold',
    color: themes[theme]?.counterText,
    textAlign: 'center',
    position: 'absolute',
  }),
  nextText: (theme, direction) => ({
    fontSize: 200,
    fontWeight: 'bold',
    color: themes[theme]?.counterText,
    textAlign: 'center',
    position: 'absolute',
    ...(direction === COUNTER_TYPE.SWIPE_UP && {
      bottom: 0,
    }),
    ...(direction === COUNTER_TYPE.SWIPE_DOWN && {
      top: 0,
    }),
    ...(direction === COUNTER_TYPE.SWIPE_RIGHT && {
      left: -100,
    }),
    ...(direction === COUNTER_TYPE.SWIPE_LEFT && {
      right: 0,
    }),
  }),
  infoWrapper: (opacity = 1) => ({
    flexDirection: 'row',
    justifyContent: 'center',
    opacity,
    position: 'absolute',
    bottom: '30%',
    left: 0,
    right: 0,
  }),
  info: theme => ({
    color: themes[theme]?.infoText,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
    marginRight: 10,
  }),
  infoIcon: direction => ({
    marginTop: 3,
    transform: [{rotate: '-30deg'}],
    marginLeft: direction === COUNTER_TYPE.SWIPE_LEFT ? 10 : 0,
  }),
});
export default SwipeCounter;
