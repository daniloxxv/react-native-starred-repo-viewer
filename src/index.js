import React from 'react';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';

import '../config/ReactotronConfig';
import Routes from './routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
      <FlashMessage position="bottom" />
    </>
  );
}
