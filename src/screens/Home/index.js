import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {I18nManager, Platform, StyleSheet, View} from 'react-native';
import ButtonMore from '../../components/ButtonMore.jsx';
import {SWIPER_TYPES, Z_INDEX} from '../../components/constants.js';
import {useLocalContext} from '../../components/context';
import Clicker from '../../components/Counter/Clicker.jsx';
import Swiper from '../../components/Counter/Swiper.jsx';
import SaveModal from '../../components/SaveModal.jsx';
import Text from '../../components/Text.jsx';
import {RECORDS, SETTINGS} from '../../routes/constants.js';
import date from '../../utils/Date.js';
import useGlobalFucntion from '../../utils/hooks/useGlobal.js';
import useTime from '../../utils/hooks/useTime.js';
import themes from '../../utils/themes.js';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from 'react-native-google-mobile-ads';
import {BANNER_ADD_UNIT_ID} from '@env';

const Home = () => {
  const bannerRef = useRef(null);
  const navigation = useNavigation();
  const {isDev, theme, currentData, updateContext, counterType, onCount} =
    useLocalContext();
  const {onSaveCount} = useGlobalFucntion();
  const {currentTime} = useTime();

  const [showMore, setShowMore] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const _handleUpdateCount = () => {
    if (showMore) {
      setShowMore(false);
    } else {
      onCount();
    }
  };

  const _triggerExpand = () => {
    setShowMore(!showMore);
  };

  const _triggerSaveModal = () => {
    if (showSaveModal) {
      setShowMore(false);
    }
    setShowSaveModal(!showSaveModal);
  };

  const _handleSave = async item => {
    try {
      if (item) {
        // check if has saved and data still same
        onSaveCount({item, count: currentData.count, id: currentData?.id});
      }
    } catch (e) {
      console.error(e);
      // throw new Error('Error: Home >> _handleSave >> ', e);
    } finally {
      setShowMore(false);
      setShowSaveModal(false);
    }
  };

  const _handleRepeat = () => {
    showMore.current = false;
    updateContext({
      currentData: {...currentData, count: 0},
    });
  };

  const _handleList = () => {
    navigation.navigate(RECORDS);
  };

  const _handleSettings = () => {
    navigation.navigate(SETTINGS);
  };

  useForeground(() => {
    if (Platform.OS === 'ios') {
      bannerRef.current?.load();
    }
  });

  const renderCounterByType = () => {
    if (SWIPER_TYPES.includes(counterType)) {
      return (
        <Swiper
          direction={counterType}
          onSwipe={_handleUpdateCount}
          showMore={showMore}
        />
      );
    }

    // default Clicker
    return <Clicker onPress={_handleUpdateCount} showMore={showMore} />;
  };

  return (
    <View style={styles.container(theme)}>
      {renderCounterByType()}
      <SaveModal
        visible={showSaveModal}
        onClose={_triggerSaveModal}
        onSave={_handleSave}
      />
      <View style={styles.infoContainer} pointerEvents="none">
        <View style={styles.infoDateContainer}>
          <Text style={styles.info(theme)}>
            {date.getTodayDate('DD MMMM YYYY')}
          </Text>
          {/* <Divider direction={DIRECTION.VERTICAL} /> */}
          <Text style={styles.info(theme, 16)}>{date.getHijriDate()}</Text>
        </View>
        <Text style={styles.info(theme, 16)}>{currentTime}</Text>
      </View>
      <ButtonMore
        expand={showMore}
        triggerExpand={_triggerExpand}
        onSave={_triggerSaveModal}
        onRepeat={_handleRepeat}
        onList={_handleList}
        onSettings={_handleSettings}
      />
      {isDev && (
        <Text style={styles.infoDev(theme)}>ID: {currentData?.id}</Text>
      )}

      <BannerAd
        ref={bannerRef}
        unitId={__DEV__ ? TestIds.BANNER : BANNER_ADD_UNIT_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onPaid={event => {
          if (__DEV__) {
            console.log('Banner revenue', event.value, event.currency);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    position: 'relative',
    backgroundColor: themes[theme]?.background,
    padding: 20,
  }),
  ctaWrapper: {
    flexDirection: 'row',
    gap: 5,
  },
  info: (theme, size) => ({
    color: themes[theme]?.infoText,
    fontSize: size ?? 16,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    // textAlign: 'left',
    lineHeight: 24,
    fontWeight: '600',
    opacity: 0.5,
  }),
  infoDev: theme => ({
    position: 'absolute',
    color: themes[theme]?.infoText,
    fontWeight: '600',
    opacity: 0.5,
    fontSize: 10,
    bottom: 10,
    right: 10,
  }),
  infoContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: Z_INDEX.FLOOR,
  },
  infoDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Home;
