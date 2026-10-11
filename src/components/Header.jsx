import {ArrowLeft, FloppyDisk, MoreVert, Xmark} from './icons';
import React, {Fragment, useEffect, useState} from 'react';
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
import {DIRECTION, HEADER_CTA} from './constants';
import {useLocalContext} from './context';

const Header = ({
  text = '',
  onBack = () => {},
  options = [],
  onCtaPress = () => {},
  cta = null,
}) => {
  const {theme} = useLocalContext();
  const [showOptions, setShowOptions] = useState(false);

  const _triggerOptions = () => {
    setShowOptions(!showOptions);
  };

  const _handleClickActionItem = val => {
    onCtaPress(val);
    _triggerOptions();
  };

  const getIconByCTA = () => {
    const defaultProps = {
      color: themes[theme]?.inputText,
      width: 24,
      height: 24,
      strokeWidth: 2,
    };
    switch (cta) {
      case HEADER_CTA.MORE:
        return <MoreVert {...defaultProps} />;
      case HEADER_CTA.CANCEL:
        return <Xmark {...defaultProps} width={30} height={30} />;
      case 'save':
        return <FloppyDisk {...defaultProps} />;
      default:
        return null;
    }
  };

  const _handleCta = () => {
    switch (cta) {
      case HEADER_CTA.MORE:
        _triggerOptions();
        break;
      default:
        onCtaPress();
        break;
    }
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
        {cta && (
          <TouchableOpacity onPress={_handleCta} style={styles.back}>
            {getIconByCTA()}
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
        contentContainerStyle={styles.popupContent(theme, 20)}>
        <FlatList
          data={options}
          contentContainerStyle={styles.popupContentWrapper(theme)}
          renderItem={({item, index}) => {
            return (
              <Fragment>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => _handleClickActionItem(item?.value)}>
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
    height: 60,
    overflow: 'hidden',
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
  popupContent: (theme, yOffset = 0) => ({
    alignSelf: 'flex-end',
    width: '40%',
    marginTop: yOffset,
    minHeight: 0,
    borderRadius: 20,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: themes[theme]?.inputPlacholder,
  }),
  popupContentWrapper: theme => ({
    padding: 10,
    borderRadius: 20,
  }),
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Header;
