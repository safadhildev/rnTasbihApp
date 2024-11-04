import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import themes from '../utils/themes';
import {zikirOptions} from '../utils/zikir';
import Button, {BUTTON_TYPE} from './Button';
import {useLocalContext} from './context';
import Dropdown from './Dropdown';
import Gap from './Gap';
import Modal from './Modal';
import Text from './Text';

const SaveModal = ({
  visible,
  onClose = () => {},
  onSave = () => {},
  onUpdate = () => {},
  onDelete = () => {},
  isEdit = false,
  loading = false,
  selectedItem = null,
}) => {
  const {theme} = useLocalContext();

  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const [selectedZikir, setSelectedZikir] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);

  const _handleChangeText = text => {
    setInputValue(text);
  };

  const _handleSelectZikir = zikir => {
    setSelectedZikir(zikir);
    _handleChangeText(zikir?.label);
    setShowDropdown(false);
  };

  const _handleCancel = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }

    if (showDropdown) {
      setShowDropdown(false);
    } else {
      _handleChangeText('');
      onClose();
    }
  };

  const _handleSave = () => {
    _handleChangeText('');
    if (isEdit) {
      onUpdate({
        id: selectedItem?.id,
        data: selectedZikir || {value: inputValue, label: inputValue},
      });
    } else {
      onSave(selectedZikir || {value: inputValue, label: inputValue});
    }
  };

  useEffect(() => {
    if (isEdit && selectedItem?.zikir) {
      _handleChangeText(selectedItem?.zikir?.label);
    } else {
      _handleChangeText(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, JSON.stringify(selectedItem), visible]);

  return (
    <Modal
      isVisible={visible}
      onClose={_handleCancel}
      title={isEdit ? 'Edit Dhikr' : 'Save Dhikr'}
      onHideKeyboard={() => {
        setShowDropdown(false);
      }}
      contentContainerStyle={styles.content(isEdit, showDropdown)}>
      <View style={{flex: 1}}>
        <Dropdown
          inputRef={inputRef}
          options={zikirOptions}
          showDropdown={showDropdown}
          onTriggerDropdown={setShowDropdown}
          onChange={_handleSelectZikir}
          selected={selectedZikir}
          tempValue={inputValue}
          setTempValue={setInputValue}
        />

        {isEdit && !showDropdown && (
          <View style={styles.editInfo}>
            <Text style={styles.editInfoText}>ID: {selectedItem?.id}</Text>
            <Text style={styles.editInfoText}>
              Count: {selectedItem?.count}
            </Text>
            <Text style={styles.editInfoText}>
              Date: {selectedItem?.date} | {selectedItem?.hijriDate}
            </Text>
          </View>
        )}
      </View>
      <Gap size={20} />
      <View style={styles.ctaWrapper}>
        {isEdit && (
          <Button
            text="Delete"
            type={BUTTON_TYPE.SECONDARY}
            round={false}
            style={{flex: 1}}
            textStyle={{color: themes[theme]?.secondaryButtonBackground}}
            onPress={() => onDelete(selectedItem?.id)}
            disabled={loading}
          />
        )}
        <Button
          text={isEdit ? 'Update' : 'Save'}
          round={false}
          style={{flex: 2}}
          onPress={_handleSave}
          disabled={loading}
          loading={loading}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  backdrop: {
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  text: theme => ({fontSize: 12, color: themes[theme]?.infoText}),
  content: (isEdit, showDropdown) => ({
    minHeight: showDropdown || isEdit ? 350 : 300,
  }),
  ctaWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  // OPTIONS
  itemWrapper: theme => ({
    backgroundColor: 'red',
    marginRight: 10,
    padding: 3,
    borderWidth: 1,
    borderColor: themes[theme]?.inputBorder,
  }),
  itemText: theme => ({
    fontSize: 12,
    color: themes[theme]?.infoText,
  }),
  optionsWrapper: {
    // flex: 1,
  },
  editInfo: {
    marginVertical: 10,
    marginHorizontal: 10,
    opacity: 0.7,
    zIndex: 0,
  },
  editInfoText: {
    fontSize: 12,
  },
});

export default SaveModal;
