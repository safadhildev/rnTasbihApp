import React from 'react';
import {StyleSheet, View} from 'react-native';
import themes from '../utils/themes';
import {useLocalContext} from './context';

const DIVIDER_TYPE = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

const Divider = ({
  direction = DIVIDER_TYPE.HORIZONTAL,
  width = '100%',
  color,
  style = null,
}) => {
  const {theme} = useLocalContext();
  return (
    <View
      style={StyleSheet.flatten([
        styles.divider(theme, direction, width, color),
        style,
      ])}
    />
  );
};

const styles = StyleSheet.create({
  divider: (
    theme,
    direction = DIVIDER_TYPE.HORIZONTAL,
    width = '100%',
    color,
  ) => ({
    alignSelf: 'center',
    width: direction === DIVIDER_TYPE.VERTICAL ? 1 : width,
    height: direction === DIVIDER_TYPE.HORIZONTAL ? 1 : width,
    backgroundColor: color ?? themes[theme]?.inputPlacholder,
    opacity: 0.5,
  }),
});

export default Divider;
