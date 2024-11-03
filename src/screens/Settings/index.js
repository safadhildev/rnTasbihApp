import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import BackgroundView from '../../components/BackgroundView';
import Header from '../../components/Header';
import Text from '../../components/Text';
import themes from '../../utils/themes';
import ThemeSettings from './ThemeSettings';

const Settings = () => {
  const navigation = useNavigation();

  const _handleBack = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  return (
    <BackgroundView>
      <View style={{flexGrow: 1}}>
        <Header text="Settings" onBack={_handleBack} />
        <ScrollView contentContainerStyle={styles.contentContaienr}>
          <View style={{flex: 1}}>
            <ThemeSettings />
          </View>
          <Text style={styles.appVersion}>v0.0.1</Text>
        </ScrollView>
      </View>
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  contentContaienr: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
  },

  section: theme => ({
    // borderWidth: 1,
    // borderRadius: 20,
    // borderStyle: 'dashed',
    borderColor: themes[theme]?.inputPlacholder,
    marginVertical: 5,
    position: 'relative',
    minHeight: 40,
    paddingVertical: 15,
    // paddingHorizontal: 10,
  }),
  sectionLabel: theme => ({
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginBottom: 3,
    position: 'absolute',
    backgroundColor: themes[theme]?.background,
    color: themes[theme]?.inputPlacholder,
    zIndex: 1,
    top: 5,
    left: 0,
    paddingHorizontal: 5,
    fontSize: 14,
  }),
  appVersion: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
    opacity: 0.5,
  },
});

export default Settings;
