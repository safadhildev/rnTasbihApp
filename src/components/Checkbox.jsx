import {Check} from 'iconoir-react-native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useLocalContext} from './context';
import themes from '../utils/themes';

const Checkbox = ({checked = false, onPress, size = 20}) => {
  const {theme} = useLocalContext();

  return (
    <TouchableOpacity
      style={styles.container(theme, checked, size)}
      onPress={onPress}>
      {checked && (
        <Check
          color={themes[theme]?.primaryButtonText}
          width={size - 5}
          height={size - 5}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (theme, checked, size) => ({
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: themes[theme].primaryButtonBackground,
    borderRadius: 4,
    backgroundColor: checked
      ? themes[theme]?.primaryButtonBackground
      : 'transparent',
  }),
});

export default Checkbox;
