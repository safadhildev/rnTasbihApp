import React, {Fragment} from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {useLocalContext} from './context';
import themes from '../utils/themes';
import Text from './Text';

export const FLOATING_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
};

const positions = {
  [FLOATING_POSITIONS.TOP_LEFT]: {
    top: 10,
    left: 10,
  },
  [FLOATING_POSITIONS.TOP_RIGHT]: {
    top: 10,
    right: 10,
  },
  [FLOATING_POSITIONS.BOTTOM_LEFT]: {
    bottom: 10,
    left: 10,
  },
  [FLOATING_POSITIONS.BOTTOM_RIGHT]: {
    bottom: 10,
    right: 10,
  },
};

const FloatingButton = ({
  onPress = () => {},
  text = null,
  position = FLOATING_POSITIONS.BOTTOM_LEFT,
}) => {
  const {theme} = useLocalContext();

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={themes[theme]?.primaryDarker}
      style={styles.container(
        theme,
        positions[position] ?? styles.container(positions.BOTTOM_LEFT),
      )}>
      <Fragment>
        {text && <Text styles={styles.text(theme)}>{text}</Text>}
      </Fragment>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: (theme, position) => ({
    ...position,
    backgroundColor: themes[theme]?.primaryButton,
    position: 'absolute',
    padding: 10,
    zIndex: 999,
    borderRadius: 500,


  }),
  text: theme => ({
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: themes[theme]?.link,
  }),
});

export default FloatingButton;
