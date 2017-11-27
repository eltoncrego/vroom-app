/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React from 'react';
GLOBAL = require('./src/Globals');

// Components
import Auth from "./src/components/Login/Auth";
import { 
  SignedOut,
  SignedIn,
} from "./src/components/Navigation/Router";
import {
  AppRegistry,
} from 'react-native';
import {firebaseRef} from './src/components/Database/Database';

// Pushes the Navigation Stack onto the View
AppRegistry.registerComponent('vroom', () => Auth);