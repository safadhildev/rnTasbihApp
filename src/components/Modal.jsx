import React, {Fragment} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {useLocalContext} from './context';
import Text from './Text';
import Divider from './Divider';
import Gap from './Gap';
import themes from '../utils/themes';
import {Xmark} from './icons';

const Modal = ({
  children,
  isVisible,
  title,
  description,
  style = null,
  contentContainerStyle = null,
  onClose = () => {},
  onHideKeyboard = () => {},
  showCloseButton = true,
  animationIn = 'slideInUp',
  ...props
}) => {
  const {theme} = useLocalContext();

  const _handleDropdownBlur = () => {
    Keyboard.dismiss();
    onHideKeyboard();
  };
  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn={animationIn}
      hasBackdrop
      backdropOpacity={0.5}
      animationInTiming={100}
      animationOutTiming={100}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onRequestClose={onClose}
      style={StyleSheet.flatten([styles.container, style])}
      {...props}>
      <TouchableWithoutFeedback onPress={_handleDropdownBlur}>
        <View
          style={StyleSheet.flatten([
            styles.content(theme),
            contentContainerStyle,
          ])}>
          {(title?.length > 0 || showCloseButton) && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              {showCloseButton && (
                <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
                  <Xmark
                    color={themes[theme]?.inputText}
                    width={24}
                    height={24}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          {title && (
            <Fragment>
              <Divider width="100%" />
              {!description && <Gap size={5} />}
            </Fragment>
          )}
          {description && (
            <View>
              <Text style={styles.description(theme)}>{description}</Text>
              <Gap size={5} />
            </View>
          )}
          {children}
        </View>
      </TouchableWithoutFeedback>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  content: theme => ({
    flexDirection: 'column',
    backgroundColor: themes[theme]?.cardBackground,
    width: '100%',
    minHeight: 250,
    maxHeight: 475,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    gap: 10,
  }),
  header: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
  },
  description: theme => ({
    color: themes[theme]?.infoText,
    fontSize: 12,
    lineHeight: 24,
    fontWeight: '400',
  }),
});

export default Modal;
