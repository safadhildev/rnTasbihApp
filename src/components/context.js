import React, {createContext, useContext, useState} from 'react';
import {THEME_CONSTANT} from '../utils/themes';
import {SORT_BY, SORT_ORDER} from './constants';

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

  return (
    <Context.Provider
      value={{
        ...values,
        updateContext: _handleUpdate,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useLocalContext = () => useContext(Context);

export default AppContext;
