import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonMore from '../../components/ButtonMore.jsx';
import Clicker from '../../components/Clicker.jsx';
import {useLocalContext} from '../../components/context';
import SaveModal from '../../components/SaveModal.jsx';
import Text from '../../components/Text.jsx';
import {RECORDS, SETTINGS} from '../../routes/constants.js';
import date from '../../utils/Date.js';
import useGlobalFucntion from '../../utils/hooks/useGlobal.js';
import themes from '../../utils/themes.js';

const Home = () => {
  const navigation = useNavigation();
  const {isDev, theme, currentData, updateContext} = useLocalContext();
  const {onSaveCount} = useGlobalFucntion();

  const [currentTime, setCurrentTime] = useState(date.getCurrentTime());
  const [showMore, setShowMore] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const _onUpdateClick = () => {
    if (showMore) {
      setShowMore(false);
    } else {
      updateContext({
        currentData: {...currentData, count: currentData?.count + 1},
      });
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

  useEffect(() => {
    const startTimer = setInterval(() => {
      setCurrentTime(date.getCurrentTime());
    }, 1000);

    return () => clearInterval(startTimer);
  }, [currentTime]);

  return (
    <View style={styles.container(theme)}>
      <Clicker onPress={_onUpdateClick} showMore={showMore} />
      <SaveModal
        visible={showSaveModal}
        onClose={_triggerSaveModal}
        onSave={_handleSave}
      />
      <View style={styles.infoContainer} pointerEvents='none'>
        <Text style={styles.info(theme)}>
          {date.getHijriDate()} | {date.getTodayDate()}
        </Text>
        <Text style={styles.info(theme)}>{currentTime}</Text>
        {isDev && <Text style={styles.info(theme)}>ID: {currentData?.id}</Text>}
      </View>
      <View pointerEvents="box-none" style={styles.ctaContainer}>
        <ButtonMore
          expand={showMore}
          triggerExpand={_triggerExpand}
          onSave={_triggerSaveModal}
          onRepeat={_handleRepeat}
          onList={_handleList}
          onSettings={_handleSettings}
        />
      </View>
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
  ctaContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    zIndex: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ctaWrapper: {
    flexDirection: 'row',
    gap: 5,
  },
  info: (theme, size) => ({
    color: themes[theme]?.infoText,
    fontSize: size ?? 16,
    textAlign: 'left',
    lineHeight: 24,
    fontWeight: '600',
    opacity: 0.5,
  }),
  infoContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
    flexDirection: 'column',
  },
});

export default Home;
