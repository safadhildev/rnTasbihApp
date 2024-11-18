import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import AppContext, { useLocalContext } from './src/components/context';
import Navigator from './src/routes';
import themes from './src/utils/themes';

const Root = () => {
  const {theme} = useLocalContext();

  return (
    <Fragment>
      <StatusBar
        barStyle={themes[theme]?.barStyle ?? 'dark-content'}
        backgroundColor={themes[theme]?.background}
      />
      <Navigator />
    </Fragment>
  );
};

const App = () => {
  return (
    <AppContext>
      <Root />
    </AppContext>
  );
};

export default App;
