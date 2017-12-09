// Global Requirements
import React, {Component,} from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

// React and External Components
import {
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';

/*
 * Class: Onboarding
 * Author: Elton C.  Rego
 *
 * Purpose: Welcome users to the application
 */
export default class Onboarding extends Component{

 /*
  * Static: navigationOptions
  * Author: Elton C. Rego
  *
  * Purpose: To set the navigation bar options for this page
  */
  static navigationOptions = {
    title: 'Welcome',
    header: null,
    lockMode: 'locked-closed',
  };
 
 /*
  * Author: Elton C. Rego
  * Purpose: render the onboarding component
  */
  render() {
    return (
      <View style={[STYLE.container, styles.onboarding_container]}>
        <StatusBar barStyle="light-content"/>
        <View 
          style={STYLE.card_focused}>
        </View>
      </View>
    );
  }

}

/*
 * Styles for this Page
 * Author: Elton C. Rego
 */
const styles = StyleSheet.create({

  /*
   * Style: Button
   * Author: Elton C. Rego
   * Purpose: This styles the onboarding_container on top of default
   */
  onboarding_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});