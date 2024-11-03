import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './Text';
import {useLocalContext} from './context';
import {ArrowLeft, NavArrowLeft} from 'iconoir-react-native';
import themes from '../utils/themes';

const Header = ({text = '', onBack = () => {}}) => {
  const {theme} = useLocalContext();

  return (
    <View style={styles.container}>
      {typeof onBack === 'function' && (
        <TouchableOpacity onPress={onBack} style={styles.back}>
          <ArrowLeft
            color={themes[theme]?.inputText}
            width={24}
            height={24}
            strokeWidth={2}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.text(theme)}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    paddingRight: 10,
    paddingVertical: 8,
    paddingLeft: 5,
    borderRadius: 50,
  },
  text: theme => ({
    fontSize: 24,
    lineHeight: 28,
    marginHorizontal: 30,
    fontWeight: 'bold',
    ...Platform.select({
      android: {
        // marginBottom: 3,
      },
    }),
  }),
});

export default Header;
