import {useNavigation} from '@react-navigation/native';
import {ArrowDown, ArrowUp, Edit, Search, Sort} from 'iconoir-react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import BackgroundView from '../../components/BackgroundView';
import Button, {BUTTON_TYPE} from '../../components/Button';
import {DIRECTION, SORT_OPTIONS, SORT_ORDER} from '../../components/constants';
import {useLocalContext} from '../../components/context';
import Divider from '../../components/Divider';
import Gap from '../../components/Gap';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import SaveModal from '../../components/SaveModal';
import Text from '../../components/Text';
import {onSort} from '../../utils/common';
import useGlobalFucntion from '../../utils/hooks/useGlobal';
import themes from '../../utils/themes';
import {zikirOptions} from '../../utils/zikir';
import ListHeaderComponent from './ListHeaderComponent';
import Checkbox from '../../components/Checkbox';

const Records = () => {
  const navigation = useNavigation();
  const {theme, sort, updateContext} = useLocalContext();
  const {onUpdateCount, getSavedRecords, onDelete} = useGlobalFucntion();

  const [records, setRecords] = useState([]);
  const [edit, setEdit] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [itemWidth, setItemWidth] = useState(0);

  const getRecords = async searchValue => {
    try {
      const data = await getSavedRecords(searchValue);
      const sortedData = onSort(data, sort?.by, sort?.order);
      setRecords(sortedData);
    } catch (e) {
      console.error(e);
    }
  };

  const _handleDeleteRecord = async () => {
    try {
      await onDelete(idToDelete);
      setIdToDelete(null);
      setEdit(null);
      await getRecords();
    } catch (e) {
      console.error(e);
    }
  };

  const _handleSelectAll = () => {
    console.log('[DEBUG] >> selectAll ');
    if (selectedIds?.length === records?.length) {
      // Deselect All
      console.log('[DEBUG] >> selectAll >> deselectAll ');
      setSelectedIds([]);
    } else {
      console.log('[DEBUG] >> selectAll >> selectAll ');
      setSelectedIds(records?.map(item => item?.id));
    }
  };

  const _onChangeSearchValue = async value => {
    await getRecords(value);
  };

  const _handleUpdate = async ({id, data}) => {
    setUpdateLoading(true);
    try {
      if (id && data) {
        // check if has saved and data still same
        await onUpdateCount({id, data});
        await getRecords();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdateLoading(false);
      setEdit(null);
      setIdToDelete(null);
    }
  };

  const _handleBack = () => {
    if (selectMode) {
      setSelectMode(false);
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    getRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    setSelectMode(false);
    setSelectedIds([]);
  }, []);

  useEffect(() => {
    const _handleBackPress = () => {
      if (selectMode) {
        setSelectMode(false);
        return true;
      }
      return false;
    };

    if (selectMode) {
      BackHandler.addEventListener('hardwareBackPress', _handleBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', _handleBackPress);
    }
  }, [selectMode]);

  const _renderItem = ({item, index}) => {
    const _onEdit = () => {
      setEdit(item);
    };

    const getTitle = () => {
      let title = item?.zikir?.label;

      if (title) {
        return title;
      }

      if (item?.zikir?.value?.length > 0) {
        const found = zikirOptions?.find(a => a?.value === item?.zikir.value);

        if (found) {
          title = found?.label;
        }
      } else {
        title = 'Dhikr';
      }

      return title;
    };

    const getChecked = () => {
      if (selectedIds?.length === records.length) {
        return true;
      }

      const found = selectedIds?.find(id => item.id === id);
      return !!found;
    };

    const _onCheckItem = () => {
      console.log('[DEBUG] _onCheckItem >> ', {isChecked: getChecked()});
      if (getChecked()) {
        setSelectedIds(prev => prev.filter(id => id !== item.id));
        // selectedIds.current = selectedIds.current.filter(id => id !== item.id);
      } else {
        setSelectedIds([...selectedIds, item.id]);
        // selectedIds.current = [...selectedIds.current, item.id];
      }
    };

    const isFirstItem = () => index === 0;

    return (
      <View
        style={[styles.itemContainer, isFirstItem() && {marginTop: 20}, selectMode &&{marginRight: -20}]}>
        {selectMode && (
          <TouchableOpacity
            style={styles.itemSelect(isFirstItem())}
            onPress={_onCheckItem}
          />
        )}
        {selectMode && <Checkbox checked={getChecked()} size={24} />}
        <BackgroundView
          key={index}
          backgroundColor={themes[theme]?.listItemBackground}
          containerStyle={[styles.itemWrapper]}
          opacity={0.5}>
          <TouchableOpacity
            activeOpacity={1}
            onLongPress={() => {
              if (!selectMode) {
                setSelectMode(true);
                _onCheckItem();
              }
            }}>
            <View style={styles.item(theme)}>
              <View style={styles.infoWrapper}>
                <Text style={styles.count(theme)}>{item?.count}</Text>
                <Text style={styles.title(theme)}>{getTitle()}</Text>
                <Text style={styles.date(theme)}>
                  {item?.hijriDate} | {item?.date}
                </Text>
              </View>
              <Gap size={20} direction={DIRECTION.HORIZONTAL} />
              <View style={styles.countWrapper}>
                <Button
                  onPress={_onEdit}
                  icon={
                    <Edit
                      color={themes[theme]?.primaryButtonText}
                      opacity={0.5}
                      width={24}
                      height={24}
                    />
                  }
                  style={{
                    minWidth: 50,
                    minHeight: 50,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </BackgroundView>
      </View>
    );
  };

  return (
    <View style={styles.container(theme)}>
      <Header text="Records" onBack={_handleBack} />
      <View style={{flex: 1}}>
        <FlatList
          onStartShouldSetResponder={() => true}
          data={records}
          renderItem={_renderItem}
          contentContainerStyle={styles.listWrapper(selectMode)}
          scrollEnabled
          ListHeaderComponent={
            <ListHeaderComponent
              total={records?.length}
              onChangeSearchValue={_onChangeSearchValue}
              selectMode={selectMode}
              selectedIds={selectedIds}
              onSelectAll={_handleSelectAll}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyWrapper}>
              <Text
                style={{
                  color: themes[theme]?.infoText,
                  fontSize: 16,
                  fontWeight: 'bold',
                  opacity: 0.6,
                }}>
                No Records
              </Text>
            </View>
          }
          ListFooterComponent={
            records?.length > 0 && (
              <View style={{flexDirection: 'row'}}>
                <Divider direction="horizontal" width={0} style={{flex: 1}} />
                <Text style={styles.listFooter}>End of records</Text>
                <Divider direction="horizontal" width={0} style={{flex: 1}} />
              </View>
            )
          }
          stickyHeaderIndices={[0]}
        />
      </View>

      {/* SAVE */}
      <SaveModal
        isEdit
        visible={edit !== null}
        selectedItem={edit}
        onClose={() => setEdit(null)}
        onUpdate={_handleUpdate}
        onDelete={setIdToDelete}
        loading={updateLoading}
      />

      {/* DELETE */}
      <Modal
        isVisible={idToDelete !== null}
        title="Delete Record?"
        onClose={() => {
          setIdToDelete(null);
        }}>
        <View style={{flex: 1}}>
          <Text>Are you sure you want to delete this record?</Text>
        </View>
        <Gap size={20} direction={DIRECTION.VERTICAL} />
        <View style={{flexDirection: 'row'}}>
          <Button
            text="Delete"
            onPress={_handleDeleteRecord}
            type={BUTTON_TYPE.SECONDARY}
            style={{flex: 1}}
            textStyle={{color: themes[theme]?.secondaryButtontext}}
          />
          <Button
            text="Cancel"
            onPress={() => {
              setIdToDelete(null);
            }}
            type={BUTTON_TYPE.PRIMARY}
            style={{flex: 3}}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    // position: 'relative',
    backgroundColor: themes[theme]?.background,
  }),
  countWrapper: {
    // height: '100%',
    justifyContent: 'center',
  },
  count: theme => ({
    color: themes[theme]?.listItemTextPrimary,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: 'bold',
  }),
  titleWrapper: {
    flexDirection: 'row',
  },
  title: theme => ({
    color: themes[theme]?.listItemTextSecondary,
    fontSize: 15,
    lineHeight: 20,
    marginVertical: 5,
  }),
  date: theme => ({
    color: themes[theme]?.listItemTextSecondary,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'left',
    opacity: 0.5,
  }),
  listWrapper: selectMode => ({
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 50,
    paddingLeft: 20,
  }),
  itemWrapper: {
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    position: 'relative',
    marginVertical: 5,
  },
  itemSelect: isFirstItem => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    borderRadius: 10,
  }),
  item: theme => ({
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  infoWrapper: {
    flex: 3,
  },
  sortWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  sort: {
    flexDirection: 'row',
    gap: 10,
    textTransform: 'capitalize',
  },
  sortLabel: {
    textTransform: 'capitalize',
  },
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  listFooter: {
    textAlign: 'center',
    opacity: 0.5,
    marginVertical: 20,
    flex: 1,
  },
});

export default Records;
