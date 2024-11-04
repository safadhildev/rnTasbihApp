import {NavArrowDown, NavArrowUp} from 'iconoir-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, Keyboard, StyleSheet, View} from 'react-native';
import {onSearch} from '../utils/common';
import themes from '../utils/themes';
import Button, {BUTTON_TYPE, ICON_POSITION} from './Button';
import {useLocalContext} from './context';
import Divider from './Divider';
import Input from './Input';

const Dropdown = ({
  inputRef = null,
  options = [],
  selected = null,
  showDropdown = false,
  onChange = () => {},
  tempValue = null,
  setTempValue = () => {},
  onTriggerDropdown = () => {},
}) => {
  const {theme} = useLocalContext();
  const [filteredOptions, setFilteredOptions] = useState(options);

  const _handleChangeText = text => {
    setTempValue(text);

    if (text?.length === 0) {
      setFilteredOptions(options);
      return;
    }

    const filtered = onSearch(text, options);

    if (filtered.length > 0) {
      setFilteredOptions(filtered);
    } else if (text?.length > 0) {
      setFilteredOptions([{value: text, label: text}]);
    } else {
      setFilteredOptions(options);
    }
  };

  useEffect(() => {
    if (tempValue) {
      Keyboard.addListener('keyboardDidHide', () => {
        onChange({value: tempValue, label: tempValue});
        onTriggerDropdown();
      });

      return () => Keyboard.removeAllListeners('keyboardDidHide');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempValue]);

  useEffect(() => {
    setTempValue(_getSelectedLabel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const _renderItem = ({item}) => {
    return (
      <Button
        text={item.label}
        type={BUTTON_TYPE.SECONDARY}
        onPress={() => {
          onChange(item);
          setTempValue(item.label);
          setFilteredOptions(options);
        }}
        textStyle={styles.itemText(theme)}
        style={styles.item(theme)}
        round={false}
      />
    );
  };

  const _getSelectedLabel = () => {
    const inList = options.find(item => item.value === selected);
    if (inList) {
      return inList.label;
    }

    if (selected) {
      return selected;
    }

    return null;
  };

  const _getInputLabel = () => {
    if (tempValue || Keyboard.isVisible() || showDropdown) {
      return tempValue?.label ?? tempValue?.value ?? tempValue;
    }

    const inList = options.find(item => item.value === selected);
    if (inList) {
      return inList.label;
    }

    if (selected) {
      return selected?.label ?? selected?.value ?? selected;
    }

    return null;
  };

  return (
    <View style={styles.container(showDropdown)}>
      <Input
        forwardRef={inputRef}
        value={_getInputLabel()}
        placeholder="Select a Dhikr"
        style={styles.dropdownInput(theme, showDropdown)}
        onChangeText={_handleChangeText}
        onPressInput={() => !showDropdown && onTriggerDropdown(true)}
        autoFocus
        icon={
          showDropdown ? (
            <NavArrowUp
              color={themes[theme]?.inputPlacholder}
              width={30}
              height={30}
            />
          ) : (
            <NavArrowDown
              color={themes[theme]?.inputPlacholder}
              width={30}
              height={30}
            />
          )
        }
        iconPress={() => onTriggerDropdown(!showDropdown)}
        iconPostion={ICON_POSITION.RIGHT}
      />

      {showDropdown && (
        <View style={styles.dropdownModal(theme)}>
          <FlatList
            data={filteredOptions}
            renderItem={_renderItem}
            bounces={false}
            bouncesZoom={false}
            keyboardShouldPersistTaps="handled"
            ItemSeparatorComponent={
              <Divider width="90%" color={themes[theme]?.inputPlacholder} />
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: showDropdown => ({
    minHeight: showDropdown ? 300 : 50,
    zIndex: 9,
  }),
  optionsContainer: theme => ({
    minHeight: 230,
    zIndex: 999,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: themes[theme]?.inputBorder,
    backgroundColor: themes[theme]?.inputBackground,
    overflow: 'hidden',
  }),
  dropdown: theme => ({
    backgroundColor: themes[theme]?.inputBackground,
    borderRadius: 20,
    minHeight: 50,
  }),
  dropdownInput: (theme, showDropdown) => ({
    backgroundColor: themes[theme]?.inputBackground,
    minHeight: 50,
    borderBottomLeftRadius: showDropdown ? 0 : 20,
    borderBottomRightRadius: showDropdown ? 0 : 20,
  }),
  dropdownModal: theme => ({
    position: 'absolute',
    top: 50,
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 40,
    maxHeight: 190,
    // zIndex: 99999999,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
    borderColor: themes[theme]?.inputBorder,
    backgroundColor: themes[theme]?.inputBackground,
    overflow: 'hidden',
  }),
  item: theme => ({
    minHeight: 40,
    justifyContent: 'center',
  }),
  itemText: theme => ({
    color: themes[theme]?.inputText,
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '400',
  }),
});

export default Dropdown;
