/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
styleguide = require('../../global-styles');

// Components
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Animation from 'lottie-react-native';

/*
 * Class: Dashboard
 * Author: Elton C.  Rego
 *
 * Purpose: Be the main screen on the application
 */
export default class Dashboard extends Component {

   /*
   * Method: constructor(props)
   * Author: Elton C. Rego
   *
   * Purpose: Sets the state text for the card naming
   * props: the properties passed in from the super class (index.js)
   */
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <SafeAreaView style={
        [
          STYLE.container,
          {
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: GLOBAL.COLOR.DARKGRAY,
          }
        ]
      }>
      <StatusBar barStyle="light-content"/>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  /*
    * Style: Button Header
    * Author: Alec Felt
    * Purpose: Add style to the navbar button
    *          to stay consistent with project theme
    */
    button_header: {
      fontFamily: 'Nunito',
      color: GLOBAL.COLOR.BLUE,
      margin: 20,
    },
    header_middle: {
      color: GLOBAL.COLOR.BLUE,
      fontFamily: 'Nunito',
      margin: 20,
    },
    menu: {
      fontFamily: 'Nunito',
      color: GLOBAL.COLOR.BLUE,
      margin: 20,
    },

  /* Style: Scroll
   * Author: Elton C. Rego
   * Purpose: Styles the scrollview that houses all the tasks
   */
   scroll: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
   }

});
