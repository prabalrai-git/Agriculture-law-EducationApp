

import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import './src/Languages/i18n'
import StackNavigation from './src/navigation/StackNavigation';
import './global'



/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */


const App = () => {



  return (
    < >
      <StatusBar backgroundColor={global.PrimaryColor} />

      <StackNavigation />


    </>
  );
};


export default App;
