import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DIRECTION} from './constants';

const Gap = ({direction = DIRECTION.VERTICAL, size = 0}) => {
  return <View style={styles.container(direction, size)} />;
};

const styles = StyleSheet.create({
  container: (direction, size) => ({
    height: direction === DIRECTION.VERTICAL ? size : 0,
    width: direction === DIRECTION.HORIZONTAL ? size : 0,
  }),
});

export default Gap;
