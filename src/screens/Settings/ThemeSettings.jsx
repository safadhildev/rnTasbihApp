import {Check, NavArrowDown} from 'iconoir-react-native';
import React, {Fragment, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Button, {BUTTON_TYPE, ICON_POSITION} from '../../components/Button';
import {useLocalContext} from '../../components/context';
import Gap from '../../components/Gap';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import useGlobalFucntion from '../../utils/hooks/useGlobal';
import themes, {getThemes} from '../../utils/themes';

const ThemeSettings = () => {
  const {theme} = useLocalContext();
  const {onChangeTheme} = useGlobalFucntion();

  // Themes
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const _triggerThemeDropdown = () => {
    setShowThemeDropdown(prev => !prev);
  };

  const _handleChangeTheme = val => {
    onChangeTheme(val);
    setShowThemeDropdown(!showThemeDropdown);
  };

  return (
    <Fragment>
      <View style={styles.section(theme)}>
        <Text style={styles.sectionLabel(theme)}>Theme</Text>
        <Button
          text={theme}
          onPress={_triggerThemeDropdown}
          type={BUTTON_TYPE.OUTLINED}
          rightIcon={
            <NavArrowDown
              color={themes[theme]?.inputText}
              width={24}
              height={24}
              strokeWidth={2}
            />
          }
          iconPosition={ICON_POSITION.RIGHT}
          textStyle={styles.input(theme)}
        />
      </View>
      <Modal
        isVisible={showThemeDropdown}
        title="Choose Theme"
        onClose={_triggerThemeDropdown}
        style={{justifyContent: 'flex-end', marginHorizontal: 10}}>
        <FlatList
          data={getThemes()}
          style={{
            marginHorizontal: -20,
            paddingHorizontal: 20,
          }}
          renderItem={({item}) => (
            <Fragment>
              <Button
                text={item.label}
                onPress={() => {
                  _handleChangeTheme(item.value);
                }}
                textStyle={styles.buttonText(theme)}
                rightIcon={
                  item.value === theme && (
                    <Check
                      color={themes[theme]?.primaryButtonText}
                      width={20}
                      height={20}
                      strokeWidth={2}
                    />
                  )
                }
                iconPosition={ICON_POSITION.RIGHT}
              />
              <Gap size={10} />
            </Fragment>
          )}
        />
      </Modal>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  section: theme => ({
    borderColor: themes[theme]?.inputPlacholder,
    marginVertical: 5,
    position: 'relative',
    minHeight: 40,
    paddingVertical: 15,
  }),
  sectionLabel: theme => ({
    fontWeight: 'bold',
    marginHorizontal: 20,
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
  input: theme => ({
    textTransform: 'capitalize',
    color: themes[theme]?.inputText,
  }),
  buttonText: theme => ({
    textTransform: 'capitalize',
    textAlign: 'left',
  }),
});

export default ThemeSettings;
