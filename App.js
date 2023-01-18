import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import './src/Languages/i18n';
import StackNavigation from './src/navigation/StackNavigation';
import './global';
import FlashMessage from 'react-native-flash-message';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={'green'} />
      <View style={{flex: 1}}>
        <StackNavigation />
        <FlashMessage position="top" />
      </View>
    </>
  );
};

export default App;
