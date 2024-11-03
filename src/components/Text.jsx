import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import themes from '../utils/themes';
import {useLocalContext} from './context';

export const TEXT_TYPE = {
  title: 'title',
  body: 'body',
  link: 'link',
  subtext: 'subtext',
  error: 'error',
};

const Text = ({children = '', type = TEXT_TYPE.body, style = {}}) => {
  const {theme} = useLocalContext();

  return (
    <RNText
      allowFontScaling={false}
      style={StyleSheet.flatten([styles.main(type, theme), style])}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  main: (type, theme) => ({
    color: themes[theme]?.inputText,
    fontSize: 16,
  }),
});

export default Text;
