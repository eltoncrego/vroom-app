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

// Files Needed
import Login from './src/components/Login/Login';
import Onboarding from './src/components/Onboarding/Onboarding';
import Dashboard from './src/components/Dashboard/Dashboard';

/*
 * Constant: Vroom
 * Author: Elton C. Rego
 *
 * Purpose: Creates a stack of the possible screens
 *   that can be used in the application
 */
const vroom = StackNavigator({
  Login: {screen: Login},
  Onboarding: {screen: Onboarding},
  Dashboard: {screen: Dashboard},
});

// Pushes the Navigation Stack onto the View
AppRegistry.registerComponent('vroom', () => vroom);
