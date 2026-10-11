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
  leftIcon = null,
  rightIcon = null,
  icon = null,
  round = false,
  type = BUTTON_TYPE.PRIMARY,
  style,
  textStyle,
  disabled = false,
  loading,
  elevated = false,
  border = false,
  borderRadius = 20,
  ...props
}) => {
  const {theme} = useLocalContext();

  const LeftIcon = React.isValidElement(leftIcon) ? leftIcon : null;
  const RightIcon = React.isValidElement(rightIcon) ? rightIcon : null;
  const Icon = React.isValidElement(icon) ? icon : null;

  const hasIcon = LeftIcon || RightIcon || Icon;

  if (!text && icon) {
    return (
      <View
        style={StyleSheet.flatten([
          styles.container(
            theme,
            round,
            type,
            disabled,
            elevated,
            border,
            borderRadius,
          ),
          style,
        ])}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => !disabled && onPress()}
          style={styles.content(
            (leftIcon || rightIcon) && text ? 'space-between' : 'center',
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
            React.isValidElement(Icon) && (
              <View style={styles.iconWrapper(text)}>{Icon}</View>
            )
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={StyleSheet.flatten([
        styles.container(theme, round, type, disabled, elevated),
        style,
      ])}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => !disabled && onPress()}
        style={styles.content(
          rightIcon && text ? 'space-between' : 'center',
          'space-between',
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
            {React.isValidElement(LeftIcon) && (
              <View style={styles.iconWrapper(text)}>{leftIcon}</View>
            )}
            {text && (
              <Text
                style={StyleSheet.flatten([
                  styles.text(type, theme, disabled, hasIcon),
                  textStyle,
                ])}>
                {text}
              </Text>
            )}
            {React.isValidElement(RightIcon) && (
              <View style={styles.iconWrapper(text)}>{rightIcon}</View>
            )}
          </Fragment>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (
    theme,
    round,
    type,
    disabled,
    elevated,
    border,
    borderRadius = 20,
  ) => ({
    backgroundColor:
      type === BUTTON_TYPE.PRIMARY
        ? themes[theme]?.primaryButtonBackground
        : 'transparent',
    opacity: disabled ? 0.5 : 1,
    borderRadius: round ? 50 : borderRadius,
    borderWidth: type === BUTTON_TYPE.OUTLINED ? 2 : border ? 1 : 0,
    borderColor:
      type === BUTTON_TYPE.OUTLINED || border
        ? themes[theme]?.inputBorder
        : null,
    minWidth: 60,
    minHeight: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relatve',
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: elevated ? 2 : 0,
      },
    }),
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
        : themes[theme]?.secondaryButtonBackground,
    paddingHorizontal: 10,
    ...Platform.select({
      android: {
        marginBottom: 3,
      },
    }),
  }),
});

export default Button;
