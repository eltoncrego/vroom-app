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
  SafeAreaView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
  Animated,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// Our Components
import Auth from '../Authentication/Auth';
import {InputField} from './../Custom/InputField'
import {Button} from './../Custom/Button';
import { goTo } from '../Navigation/Navigation';
import VroomAlert from './../Custom/VroomAlert';


/*
 * Class: Map
 * Author: Payam Katoozian
 *
 * Purpose: Shows a map, for now.
 *
 */
export default class MapScreen extends Component {
  /*
   * Method: Constructor
   * Author: Payam Katoozian
   *
   * Purpose: Constructs the class with given props
   *
   * @param: properties
   */
   constructor(props) {
    super(props);
   }

   render() {
    return(
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.container }
        initialRegion={{ // London
            latitude: 39.7392,
            longitude: -104.9903,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
      />
    );
   }
}

const styles = StyleSheet.create({
    container: {
        height:'100%',
        width: '100%',
    }
});


























