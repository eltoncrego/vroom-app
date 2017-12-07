// Global Requirements
import React, { Component, } from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

// React Components
import {
  View,
  StatusBar,
} from 'react-native';

// Necessary files


export default class r2Login extends Component {

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
      <View style={STYLE.container}>
        <StatusBar barStyle="light-content"/>
      </View>
    );
  }

}