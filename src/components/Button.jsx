import React, {Fragment} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import themes from '../utils/themes';
import {useLocalContext} from './context';
import Text from './Text';

export const BUTTON_TYPE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINED: 'outlined',
};

export const ICON_POSITION = {
  LEFT: 'left',
  RIGHT: 'right',
};

const Button = ({
  onPress = () => {},
  text = null,
  icon = null,
  iconPosition = ICON_POSITION.LEFT,
  round = true,
  type = BUTTON_TYPE.PRIMARY,
  style,
  textStyle,
  disabled = false,
  loading,
  ...props
}) => {
  const {theme} = useLocalContext();

  const Icon = React.isValidElement(icon) ? icon : null;

  return (
    <View
      style={StyleSheet.flatten([
        styles.container(theme, iconPosition, round, type, disabled),
        style,
      ])}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => !disabled && onPress()}
        style={styles.content(
          icon && text ? 'space-between' : 'center',
          disabled,
        )}
        disabled={disabled}
        {...props}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={themes[theme]?.primaryButtonText}
          />
        ) : (
          <Fragment>
            {React.isValidElement(Icon) &&
              iconPosition === ICON_POSITION.LEFT && (
                <View style={styles.iconWrapper(text)}>{icon}</View>
              )}
            {text && (
              <Text
                style={StyleSheet.flatten([
                  styles.text(
                    type,
                    theme,
                    disabled,
                    React.isValidElement(Icon),
                  ),
                  textStyle,
                ])}>
                {text}
              </Text>
            )}
            {React.isValidElement(Icon) &&
              iconPosition === ICON_POSITION.RIGHT && (
                <View style={styles.iconWrapper(text)}>{icon}</View>
              )}
          </Fragment>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (theme, position, round, type, disabled) => ({
    ...position,
    backgroundColor:
      type === BUTTON_TYPE.PRIMARY
        ? themes[theme]?.primaryButtonBackground
        : 'transparent',
    opacity: disabled ? 0.5 : 1,
    borderRadius: round ? 50 : 20,
    borderWidth: type === BUTTON_TYPE.OUTLINED ? 2 : 0,
    borderColor: themes[theme]?.inputBorder,
    minWidth: 60,
    minHeight: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relatve',
    overflow: 'hidden',
  }),
  disabledPrimary: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(100,100,100,0.7)',
  },
  content: justifyContent => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent,
    paddingHorizontal: 5,
  }),
  iconWrapper: hasText => ({
    marginHorizontal: hasText ? 10 : 0,
  }),
  text: (type, theme, disabled, hasIcon) => ({
    flex: 1,
    marginHorizontal: 5,
    opacity: disabled ? 0.5 : 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: hasIcon ? 'left' : 'center',
    color:
      type === BUTTON_TYPE.PRIMARY
        ? themes[theme]?.primaryButtonText
        : themes[theme]?.inputText,
    paddingHorizontal: 10,
    ...Platform.select({
      android: {
        marginBottom: 3,
      },
    }),
  }),
});

export default Button;
