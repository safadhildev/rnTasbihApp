import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import animation from '../utils/animation';
import themes from '../utils/themes';
import {useLocalContext} from './context';
import Text from './Text';
import {OpenSelectHandGesture} from 'iconoir-react-native';

const Clicker = ({onPress = () => {}, showMore = false}) => {
  const {theme, currentData} = useLocalContext();
  const animationValue = useRef(new Animated.Value(0)).current;
  const infoAnimValue = useRef(new Animated.Value(1)).current;

  const _handleAnimation = () => {
    animation.bounce({
      animationValue,
      toValue: -20,
      duration: 200,
      bounciness: 10,
    });
  };

  const _startInfoAnimation = () => {
    animation.timing({
      animationValue: infoAnimValue,
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    });
  };

  const _handleClick = () => {
    if (onPress && typeof onPress === 'function') {
      onPress();
      if (!showMore) {
        if (currentData?.count === 0) {
          _startInfoAnimation();
        }
        _handleAnimation();
      }
    }
  };

  useEffect(() => {
    if (currentData?.count === 0) {
      infoAnimValue.setValue(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData?.count]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={_handleClick}
      style={styles.container}>
      <Animated.Text
        style={[
          styles.text(theme),
          {transform: [{translateY: animationValue}]},
        ]}
        animationValue={animationValue}
        adjustsFontSizeToFit
        numberOfLines={1}>
        {currentData?.count}
      </Animated.Text>
      <Animated.View style={styles.infoWrapper(infoAnimValue)}>
        <Text style={styles.info(theme)}>Tap anywhere to start</Text>
        <OpenSelectHandGesture
          color={themes[theme]?.infoText}
          width={20}
          height={20}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: -1,
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
  }),
  infoWrapper: (opacity = 1) => ({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity,
  }),
  info: theme => ({
    color: themes[theme]?.infoText,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
    marginRight: 10,
  }),
});

export default Clicker;
