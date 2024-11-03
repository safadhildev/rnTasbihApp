import {ArrowDown, ArrowUp, Check, Search, Sort} from 'iconoir-react-native';
import React, {Fragment, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DIRECTION, SORT_OPTIONS, SORT_ORDER} from '../../components/constants';
import {useLocalContext} from '../../components/context';
import Divider from '../../components/Divider';
import Gap from '../../components/Gap';
import Input from '../../components/Input';
import Text from '../../components/Text';
import themes from '../../utils/themes';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

const ListHeaderComponent = ({
  onChangeSearchValue = () => {},
  onTriggerSortModal,
}) => {
  const {theme, sort, updateContext} = useLocalContext();

  const [sortButtonLayout, setSortButtonLayout] = useState(null);
  const [showSortModal, setShowSortModal] = useState(false);

  const _handleChangeSortBy = val => {
    updateContext({
      sort: {
        ...sort,
        by: val,
      },
    });
    setShowSortModal(false);
  };

  const _triggerSortModal = () => {
    setShowSortModal(!showSortModal);
  };

  const _triggerSortOrder = () => {
    updateContext({
      sort: {
        ...sort,
        order:
          sort?.order === SORT_ORDER.DESC ? SORT_ORDER.ASC : SORT_ORDER.DESC,
      },
    });
  };

  return (
    <Fragment>
      <View style={styles.inputWrapper(theme)}>
        <Input
          placeholder="Search"
          onChangeText={onChangeSearchValue}
          icon={
            <Search
              color={themes[theme]?.inputPlacholder}
              width={24}
              height={24}
              style={{marginBottom: 3}}
            />
          }
        />
        <Gap size={20} direction={DIRECTION.VERTICAL} />
        <View
          style={styles.sortWrapper}
          onLayout={e => {
            if (e?.nativeEvent?.layout) {
              setSortButtonLayout(e?.nativeEvent?.layout);
            }
          }}>
          <TouchableOpacity style={styles.sort} onPress={_triggerSortModal}>
            <Sort color={themes[theme]?.inputText} width={20} height={24} />
            <Text style={styles.sortLabel}>{sort?.by}</Text>
          </TouchableOpacity>
          <Gap size={15} direction={DIRECTION.HORIZONTAL} />
          <Divider direction={DIRECTION.VERTICAL} width="100%" />
          <Gap size={15} direction={DIRECTION.HORIZONTAL} />
          <TouchableOpacity style={styles.sort} onPress={_triggerSortOrder}>
            {sort?.order === SORT_ORDER.ASC ? (
              <ArrowUp
                color={themes[theme]?.inputText}
                width={16}
                height={24}
                strokeWidth={2}
              />
            ) : (
              <ArrowDown
                color={themes[theme]?.inputText}
                width={16}
                height={24}
                strokeWidth={2}
              />
            )}
          </TouchableOpacity>
        </View>
        <Gap size={10} />
        <Divider width="100%" />
      </View>
      <Modal
        isVisible={showSortModal}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onClose={_triggerSortModal}
        showCloseButton={false}
        backdropColor="rgba(0,0,0,0)"
        style={{
          justifyContent: 'flex-start',
        }}
        contentContainerStyle={styles.popupContent(
          sortButtonLayout
            ? sortButtonLayout?.height + sortButtonLayout?.y + 60
            : 0,
        )}>
        <FlatList
          data={SORT_OPTIONS}
          renderItem={({item, index}) => {
            return (
              <Fragment>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => _handleChangeSortBy(item?.value)}>
                  {index !== 0 && (
                    <Gap size={10} direction={DIRECTION.VERTICAL} />
                  )}
                  <View style={styles.listItem}>
                    <Text style={{marginHorizontal: 5}}>{item?.label}</Text>
                    {sort?.by === item?.value && (
                      <Check
                        color={themes[theme]?.inputText}
                        width={20}
                        height={20}
                      />
                    )}
                  </View>
                  {index !== SORT_OPTIONS.length - 1 && <Gap size={10} />}
                  {index !== SORT_OPTIONS.length - 1 && (
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
  container: theme => ({
    flex: 1,
    // position: 'relative',
    backgroundColor: themes[theme]?.background,
  }),
  inputWrapper: theme => ({
    backgroundColor: themes[theme]?.background,
    // paddingBottom: 20,
  }),
  countWrapper: {
    // height: '100%',
    justifyContent: 'flex-end',
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
  listWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 20,
  },
  itemWrapper: {
    marginVertical: 5,
    borderRadius: 10,
  },
  item: theme => ({
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

export default ListHeaderComponent;
