import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import themes from '../utils/themes';
import {useLocalContext} from './context';

const BouncingText = ({
  text = null,
  style = null,
  animationValue = new Animated.Value(0),
  ...props
}) => {
  const {theme} = useLocalContext();

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.text(theme),
          style,
          {transform: [{translateY: animationValue}]},
        ]}
        {...props}>
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: theme => ({
    fontSize: 200,
    fontWeight: 'bold',
    color: themes[theme]?.counterText,
    textAlign: 'center',
  }),
});

export default BouncingText;
