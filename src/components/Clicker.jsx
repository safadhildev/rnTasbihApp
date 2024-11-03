import React, {useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import themes from '../utils/themes';
import BouncingText from './BouncingText';
import {useLocalContext} from './context';
import animation from '../utils/animation';

const Clicker = ({onPress = () => {}, showMore = false}) => {
  const {theme, currentData} = useLocalContext();
  const animationValue = useRef(new Animated.Value(0)).current;

  const _handleAnimation = () => {
    animation.bounce({
      animationValue,
      toValue: -20,
      duration: 200,
      bounciness: 10,
    });
  };

  const _handleClick = () => {
    if (onPress && typeof onPress === 'function') {
      onPress();
      if (!showMore) {
        _handleAnimation();
      }
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
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
});

export default Clicker;
