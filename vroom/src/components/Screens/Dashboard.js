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
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

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
      <View style={
        [styleguide.container,
        {
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: GLOBAL.COLOR.DARKGRAY,
        }]
      }>
      <StatusBar barStyle="light-content"/>
        <View style={styles.navbar}>
          <Text style={styleguide.dark_title2}>vroom<Text style={styleguide.dark_title2_accent}>.</Text></Text>
          <TouchableOpacity><Text style={styleguide.dark_subheader2}><FontAwesome>{Icons.plus}</FontAwesome></Text></TouchableOpacity>
        </View>
        <View style={styles.content}>
            <View style={[styles.card,
                {
                  transform: [{
                    translateY: 250,
                  }]
                }]}>
            </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  navbar: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 32,
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 10,
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scroll: {
    flex: 1,

  },
  card: {
    height: 812,
    width: 375,
    backgroundColor: GLOBAL.COLOR.WHITE,
  },
  ico: {
    fontSize: 24,
    color: GLOBAL.COLOR.WHITE,
  },

});
