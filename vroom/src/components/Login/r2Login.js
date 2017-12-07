// Global Requirements
import React from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

// React Components
import {
  View,
  StatusBar,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-view';

export default class r2Login extends React.Component {

 /*
  * Author: Elton Rego
  * Purpose: Set up state for this specific component
  */
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("r2Login component successfuly mounted.");
  }

 /*
  * Author: Elton C. Rego
  * Purpose: render the login component
  */
  render() {
    return (
      <SafeAreaView style={STYLE.container}>
        <StatusBar barStyle="light-content"/>
      </SafeAreaView>  
    );
  }

}