import React, {createRef, useEffect, useRef} from 'react';
import {useLocalContext} from './context';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import themes from '../utils/themes';
import {ICON_POSITION} from './Button';

const INPUT_TYPE = {
  DEFAULT: 'default',
  OUTLINED: 'outlined',
};

const Input = ({
  forwardRef = createRef(),
  type = 'default',
  value,
  onChangeText,
  placeholder,
  autoFocus = false,
  icon,
  iconPosition = ICON_POSITION.RIGHT,
  iconPress = () => {},
  disabled = false,
  style,
  onPressInput = () => {},
  ...props
}) => {
  const {theme} = useLocalContext();

  return (
    <View
      style={StyleSheet.flatten([
        type === INPUT_TYPE.OUTLINED
          ? styles.outlinedInputWrapper(theme)
          : styles.inputWrapper(theme),
        style,
      ])}>
      {React.isValidElement(icon) && iconPosition === ICON_POSITION.LEFT && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.icon(iconPosition)}
          onPress={iconPress}>
          {icon}
        </TouchableOpacity>
      )}
      <TextInput
        ref={forwardRef}
        value={value}
        onChangeText={onChangeText}
        allowFontScaling={false}
        style={styles.input(theme, icon && iconPosition)}
        numberOfLines={1}
        placeholder={placeholder}
        placeholderTextColor={themes[theme]?.inputPlacholder}
        autoFocus={!!autoFocus && !disabled}
        editable={!disabled}
        onPress={() => !disabled && onPressInput()}
        {...props}
      />
      {React.isValidElement(icon) && iconPosition === ICON_POSITION.RIGHT &&  (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.icon(iconPosition)}
          onPress={iconPress}>
          {icon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: (theme, position) => ({
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    paddingLeft: position === ICON_POSITION.RIGHT ? 20 : 0,
    paddingRight: position === ICON_POSITION.LEFT ? 20 : 0,
    color: themes[theme]?.inputText,
  }),
  inputWrapper: theme => ({
    borderWidth: 2,
    borderColor: themes[theme]?.inputBorder,
    borderRadius: 20,
    minHeight: 40,
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
  }),
  // OUTLINED
  outlinedInputWrapper: theme => ({
    borderWidth: 2,
    borderColor: themes[theme]?.inputBorder,
    position: 'relative',
    borderRadius: 20,
    height: 40,
    overflow: 'hidden',
    flexDirection: 'row',
  }),
  icon: position => ({
    paddingHorizontal: 15,
    alignItems: position === ICON_POSITION.LEFT ? 'flex-start' : 'flex-end',
    justifyContent: 'center',
  }),
});

export default Input;
