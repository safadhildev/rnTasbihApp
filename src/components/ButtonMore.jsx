import {
  ClockRotateRight,
  FloppyDisk,
  List,
  MoreHoriz,
  Settings,
} from 'iconoir-react-native';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import animation from '../utils/animation';
import themes from '../utils/themes';
import Button from './Button';
import {useLocalContext} from './context';
import {Z_INDEX} from './constants';

const ButtonMore = ({
  expand = false,
  triggerExpand = () => {},
  onSave = () => {},
  onList = () => {},
  onRepeat = () => {},
  onSettings = () => {},
}) => {
  const {theme, currentData} = useLocalContext();

  // MORE BUTTON
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  // Repeat Button
  const repeatBtnPosition = useRef(new Animated.Value(0)).current;
  const repeatBtnOpacity = useRef(new Animated.Value(0)).current;

  // Complete Button
  const completeBtnPosition = useRef(new Animated.Value(0)).current;
  const completeBtnOpacity = useRef(new Animated.Value(0)).current;

  // List Button
  const listBtnPostionX = useRef(new Animated.Value(0)).current;
  const listBtnPostionY = useRef(new Animated.Value(0)).current;
  const listBtnOpacity = useRef(new Animated.Value(0)).current;

  // List Button
  const settingsBtnPostionX = useRef(new Animated.Value(0)).current;
  const settingsBtnPostionY = useRef(new Animated.Value(0)).current;
  const settingsBtnOpacity = useRef(new Animated.Value(0)).current;

  const _triggerAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: expand ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    animation.moveAndFade({
      type: expand ? 'in' : 'out',
      animation: repeatBtnPosition,
      opacity: repeatBtnOpacity,
      offset: 80,
    });

    animation.moveAndFade({
      type: expand ? 'in' : 'out',
      animation: completeBtnPosition,
      opacity: completeBtnOpacity,
      offset: -240,
    });

    animation.moveAndFade({
      type: expand ? 'in' : 'out',
      animation: listBtnPostionY,
      opacity: listBtnOpacity,
      offset: -160,
    });

    animation.moveAndFade({
      type: expand ? 'in' : 'out',
      animation: settingsBtnPostionY,
      opacity: settingsBtnOpacity,
      offset: -80,
    });

    // moveAndFadeDiagonally({
    //   type: expand ? 'in' : 'out',
    //   positionX: listBtnPostionX,
    //   positionY: listBtnPostionY,
    //   opacity: listBtnOpacity,
    //   offset: 70,
    // });
  };

  const _handleSave = () => {
    onSave();
    // triggerExpand();
  };

  const _handleRepeat = () => {
    onRepeat();
    triggerExpand();
  };

  const _handleList = () => {
    onList();
    triggerExpand();
  };

  const _handleSettings = () => {
    onSettings();
    triggerExpand();
  };

  useEffect(() => {
    _triggerAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expand]);

  const spin = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '270deg'],
  });

  const iconProps = {
    color: themes[theme]?.primaryButtonText,
    width: 30,
    height: 30,
    opacity: 0.7,
    strokeWidth: 2,
  };

  return (
    <View pointerEvents="box-none" style={styles.container}>
      {expand && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.overlay}
          onPress={triggerExpand}
        />
      )}
      <View style={styles.btnMore}>
        <Button
          round
          elevated={!!expand}
          icon={
            <Animated.View style={{transform: [{rotate: spin}]}}>
              <MoreHoriz {...iconProps} />
            </Animated.View>
          }
          onPress={triggerExpand}
        />
      </View>
      {/* Complete */}
      {currentData?.count > 0 && expand && (
        <Animated.View
          style={[
            styles.button,
            {
              transform: [{translateY: completeBtnPosition}],
              opacity: completeBtnOpacity,
            },
          ]}>
          <Button
            round
            icon={<FloppyDisk {...iconProps} />}
            onPress={_handleSave}
          />
        </Animated.View>
      )}

      {/* List */}
      <Animated.View
        style={[
          styles.button,
          {
            transform: [
              {translateX: listBtnPostionX},
              {translateY: listBtnPostionY},
            ],
            opacity: listBtnOpacity,
          },
        ]}>
        <Button round icon={<List {...iconProps} />} onPress={_handleList} />
      </Animated.View>

      {/* Settings */}
      <Animated.View
        style={[
          styles.button,
          {
            transform: [
              {translateX: settingsBtnPostionX},
              {translateY: settingsBtnPostionY},
            ],
            opacity: settingsBtnOpacity,
          },
        ]}>
        <Button
          round
          icon={<Settings {...iconProps} />}
          onPress={_handleSettings}
        />
      </Animated.View>

      {/* Repeat */}
      <Animated.View
        style={[
          styles.button,
          {
            transform: [{translateX: repeatBtnPosition}],
            opacity: repeatBtnOpacity,
          },
        ]}>
        <Button
          round
          icon={<ClockRotateRight {...iconProps} />}
          onPress={_handleRepeat}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: Z_INDEX.FLOATING_BUTTON,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnMore: {
    zIndex: Z_INDEX.FLOATING_BUTTON,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  button: {
    zIndex: Z_INDEX.FLOATING_BUTTON_ITEMS,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: Z_INDEX.OVERLAY,
  },
});

export default ButtonMore;
