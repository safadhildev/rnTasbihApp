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
}) => {
  const {theme} = useLocalContext();

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <View style={styles.background(theme, backgroundColor, opacity)}>
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
  container: {
    backgroundColor: 'blue',
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
  },
  background: (theme, customColor, opacity) => ({
    flex: 1,
    backgroundColor: customColor ?? themes[theme]?.background,
  }),
  children: {
    flex: 1,
  },
});

export default BackgroundView;
