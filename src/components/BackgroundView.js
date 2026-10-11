import React from 'react';
import {StyleSheet, View} from 'react-native';
import themes from '../utils/themes';
import {useLocalContext} from './context';

/**
 * Themed background. Rendered once at the app root (App.js) so every screen
 * sits on the current theme's background; can also be used locally with a
 * custom color. `opacity` only affects the background layer, not children.
 */
const BackgroundView = ({
  children = null,
  backgroundColor = null,
  style = null,
  containerStyle = null,
  opacity = 1,
  borderRadius = 0,
}) => {
  const {theme} = useLocalContext();

  return (
    <View
      style={StyleSheet.flatten([
        styles.container(borderRadius),
        containerStyle,
      ])}>
      <View
        pointerEvents="none"
        style={styles.background(theme, backgroundColor, opacity)}
      />
      <View style={StyleSheet.flatten([styles.children, style])}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: borderRadius => ({
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
    borderRadius,
  }),
  background: (theme, customColor, opacity) => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor: customColor ?? themes[theme]?.background,
    opacity,
  }),
  children: {
    flex: 1,
  },
});

export default BackgroundView;
