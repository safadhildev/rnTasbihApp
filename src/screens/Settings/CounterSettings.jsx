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
import {COUNTER_TYPE_ARRAY} from '../../components/constants';
import HintIcon from '../../components/HintIcon';

const CounterSettings = () => {
  const {theme, counterType} = useLocalContext();
  const {onChangeCounterType} = useGlobalFucntion();

  // Themes
  const [showDropdown, setShowDropdown] = useState(false);

  const _triggerDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const _handleChange = val => {
    onChangeCounterType(val);
    setShowDropdown(!showDropdown);
  };

  const _getLabel = () => {
    return (
      COUNTER_TYPE_ARRAY.find(item => item.value === counterType)?.label ??
      'Select'
    );
  };

  return (
    <Fragment>
      <View style={styles.section(theme)}>
        <Text style={styles.sectionLabel(theme)}>Counter Type</Text>
        <Button
          text={_getLabel()}
          onPress={_triggerDropdown}
          type={BUTTON_TYPE.OUTLINED}
          rightIcon={
            <NavArrowDown
              color={themes[theme]?.inputText}
              width={24}
              height={24}
              strokeWidth={2}
            />
          }
          style={{borderRadius: 10}}
          textStyle={styles.input(theme)}
        />
      </View>
      <Modal
        isVisible={showDropdown}
        title="Choose Counter Type"
        description="Note: Changing counter type will reset your count"
        onClose={_triggerDropdown}
        style={{justifyContent: 'flex-end', marginHorizontal: 10}}>
        <FlatList
          data={COUNTER_TYPE_ARRAY}
          style={{
            marginHorizontal: -10,
            paddingHorizontal: 10,
          }}
          renderItem={({item}) => (
            <Fragment>
              <Button
                text={item.label}
                onPress={() => {
                  _handleChange(item.value);
                }}
                textStyle={styles.buttonText(theme)}
                leftIcon={
                  <View style={styles.leftIconWrapper}>
                    <HintIcon counterType={item.value} />
                  </View>
                }
                rightIcon={
                  <View>
                    {item.value === counterType && (
                      <Check
                        color={themes[theme]?.primaryButtonText}
                        width={20}
                        height={20}
                        strokeWidth={2}
                      />
                    )}
                  </View>
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
  input: theme => ({
    textTransform: 'capitalize',
    color: themes[theme]?.inputText,
  }),
  buttonText: theme => ({
    backgroundColor: 'transparent',
    textTransform: 'capitalize',
    textAlign: 'left',
    flex: 1,
  }),
  leftIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
});

export default CounterSettings;
