import React from 'react';
import {StyleSheet, View} from 'react-native';
import themes from '../utils/themes';
import {useLocalContext} from './context';

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
        style={styles.background(
          theme,
          backgroundColor,
          opacity,
          borderRadius,
        )}>
        {React.isValidElement(children) && (
          <View style={StyleSheet.flatten([styles.children, style])}>
            {children}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: borderRadius => ({
    backgroundColor: 'blue',
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
    borderRadius,
  }),
  background: (theme, customColor, opacity, borderRadius) => ({
    flex: 1,
    backgroundColor: customColor ?? themes[theme]?.background,
    borderRadius,
    opacity,
  }),
  children: {
    flex: 1,
  },
});

export default BackgroundView;
