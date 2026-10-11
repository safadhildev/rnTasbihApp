import React, {createContext, useContext, useState} from 'react';
import {THEME_CONSTANT} from '../utils/themes';
import {COUNTER_TYPE, SORT_BY, SORT_ORDER} from './constants';

const Context = createContext();

const initialContext = {
  isDev: __DEV__,
  theme: THEME_CONSTANT.lime,
  currentData: {
    date: null,
    hijriDate: null,
    id: null,
    count: 0,
  },
  showMore: false,
  sort: {
    by: SORT_BY.DATE,
    order: SORT_ORDER.DESC,
  },
  counterType: COUNTER_TYPE.SWIPE_LEFT,
};

const AppContext = ({children}) => {
  // const values = useRef(initialContext);

  const [values, setValues] = useState(initialContext);

  // const _handleUpdate = useCallback(
  //   data => {
  //     setValues({
  //       ...values,
  //       data,
  //     });
  //   },
  //   [values],
  // );

  const _handleUpdate = data => {
    setValues(prev => ({
      ...prev,
      ...data,
    }));
  };

  const _handleUpdateCount = () => {
    setValues(prev => ({
      ...prev,
      currentData: {
        ...values?.currentData,
        count: prev.currentData.count + 1,
      },
    }));
  };

  return (
    <Context.Provider
      value={{
        ...values,
        updateContext: _handleUpdate,
        onCount: _handleUpdateCount,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useLocalContext = () => useContext(Context);

export default AppContext;
