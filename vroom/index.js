/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('./src/Globals');

// Components
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import * as firebase from 'firebase';

// Necessary Files
import Onboarding from './src/components/Login/Onboarding';
import Dashboard from './src/components/Dashboard/Dashboard';
import EmailPasswordLogin from './src/components/Login/EmailPasswordLogin';
import EmailPasswordSignup from './src/components/Login/EmailPasswordSignup';

/*
 * Constant: Vroom
 * Author: Elton C. Rego
 *
 * Purpose: Creates a stack of the possible screens
 *   that can be used in the application
 */
const vroom = StackNavigator({
  // EmailPasswordLogin: {screen: EmailPasswordLogin},
  // EmailPasswordSignup: {screen: EmailPasswordSignup},
  // Onboarding: {screen: Onboarding},
  Dashboard: {screen: Dashboard},

});

/*
 * Congfiguration: firebase.initializeApp
 * Author: Alec Felt
 * Purpose: Attach our app to our database
 */
 // Initialize Firebase
 const config = {
   apiKey: "AIzaSyAmJxDUilgKOlQDyji9qmMNh2Bb73WcP7U",
   authDomain: "vroom-d5c0e.firebaseapp.com",
   databaseURL: "https://vroom-d5c0e.firebaseio.com",
   projectId: "vroom-d5c0e",
   storageBucket: "vroom-d5c0e.appspot.com",
   messagingSenderId: "52629805323"
 };
 export const firebaseRef = firebase.initializeApp(config);

// Pushes the Navigation Stack onto the View
AppRegistry.registerComponent('vroom', () => vroom);
