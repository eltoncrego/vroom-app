/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');

// Components
import {Animated, Platform} from "react-native";
import {StackNavigator} from "react-navigation";
import FontAwesome, { Icons } from 'react-native-fontawesome';

// Necessary Files
import Login from '../Screens/Login';
import Dashboard from '../Screens/Dashboard';
import Onboarding from '../Screens/Onboarding';
import ForgotPassword from '../Screens/ForgotPassword';
import MapScreen from '../Screens/MapScreen';

/*
 * Constant: SignedOut
 * Author: Elton C. Rego
 *
 * Purpose: Impliments a Stack Navigator that holds the screen
 *   for when a user is logged out.
 *
 * @return: SignedOut(Login)
 */
export const SignedOut = StackNavigator ({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      header: null,
    },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      title: 'ForgotPassword',
      header: null,
    },
  },
});

/*
 * Constant: SignedIn
 * Author: Elton C. Rego
 *
 * Purpose: Handles the drawer navigator component within the
 *   Drawer navigator. Allows us to maintain our custom navigation
 *   bar with an overlayed drawer navigation. Place screens that
 *   should not have a drawer menu here.
 * @return: SignedIn(Dashboard)
 */
export const SignedIn = StackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      header: null,
      title: "Dashboard",
    }
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      header: null,
      title: "Map Screen",
    }
  },
});

/*
 * Constant: SignedIn
 * Author: Elton C. Rego
 *
 * Purpose: Handles the drawer navigator component within the
 *   Drawer navigator. Allows us to maintain our custom navigation
 *   bar with an overlayed drawer navigation. Place screens that
 *   should not have a drawer menu here.
 * @return: SignedUp(Onboarding)
 */
export const SignedUp = StackNavigator({
  Onboarding: {
    screen: Onboarding,
    navigationOptions: {
      title: 'Onboarding',
      header: null,
    },
  },
  Dashboard: {
    screen: SignedIn,
    navigationOptions: {
      title: 'Dashboard',
      header: null,
      gesturesEnabled: false,
    },
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      header: null,
      title: "Map Screen",
    }
  },
});
