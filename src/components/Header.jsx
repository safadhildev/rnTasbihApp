import {ArrowLeft, MoreVert} from 'iconoir-react-native';
import React, {Fragment, useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import themes from '../utils/themes';
import Divider from './Divider';
import Gap from './Gap';
import Modal from './Modal';
import Text from './Text';
import {DIRECTION} from './constants';
import {useLocalContext} from './context';

const Header = ({
  text = '',
  onBack = () => {},
  options = [],
  onCtaPress = () => {},
}) => {
  const {theme} = useLocalContext();
  const [showOptions, setShowOptions] = useState(false);
  const [optionsButtonLayout, setOptionsButtonLayout] = useState(null);

  const _triggerOptions = () => {
    setShowOptions(!showOptions);
  };

  const _handleClickAction = val => {
    onCtaPress(val);
    _triggerOptions();
  };

  return (
    <Fragment>
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
        {options?.length > 0 && (
          <TouchableOpacity onPress={_triggerOptions} style={styles.back}>
            <MoreVert
              color={themes[theme]?.inputText}
              width={24}
              height={24}
              strokeWidth={3}
            />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        isVisible={showOptions}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onClose={_triggerOptions}
        showCloseButton={false}
        backdropColor="rgba(0,0,0,0)"
        style={{
          justifyContent: 'flex-start',
        }}
        contentContainerStyle={styles.popupContent(20)}>
        <FlatList
          data={options}
          renderItem={({item, index}) => {
            return (
              <Fragment>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => _handleClickAction(item?.value)}>
                  {index !== 0 && (
                    <Gap size={10} direction={DIRECTION.VERTICAL} />
                  )}
                  <View style={styles.listItem}>
                    <Text style={{marginHorizontal: 5}}>{item?.label}</Text>
                  </View>
                  {index !== options.length - 1 && <Gap size={10} />}
                  {index !== options.length - 1 && (
                    <Divider direction="horizontal" width="100%" />
                  )}
                </TouchableOpacity>
              </Fragment>
            );
          }}
        />
      </Modal>
    </Fragment>
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
    flex: 1,
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
  popupContent: (yOffset = 0) => ({
    alignSelf: 'flex-end',
    width: '40%',
    marginTop: yOffset,
    minHeight: 0,
    paddingVertical: 15,
    borderRadius: 15,
  }),
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Header;
