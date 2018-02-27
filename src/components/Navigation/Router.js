/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');

// Components
import {Animated, Platform} from "react-native";
import {StackNavigator, TabNavigator} from "react-navigation";
import FontAwesome, { Icons } from 'react-native-fontawesome';

// Necessary Files
import Login from '../Screens/Login';
import Dashboard from '../Screens/Dashboard';
import Onboarding from '../Screens/Onboarding';
import ForgotPassword from '../Screens/ForgotPassword';
import Toolbox from '../Screens/Toolbox';

/*
 * Constant: SignedOut
 * Author: Elton C. Rego
 *
 * Purpose: Impliments a Stack Navigator that holds the screen
 *   for when a user is logged out.
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
export const SignedIn = TabNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
      <Animated.Text style={[styleguide.light_title ,{color: tintColor }]}><FontAwesome>{Icons.tachometer}</FontAwesome></Animated.Text>
    ),
    },
  },
  Toolbox: {
    screen: Toolbox,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
      <Animated.Text style={[styleguide.light_title ,{color: tintColor }]}><FontAwesome>{Icons.gears}</FontAwesome></Animated.Text>
    ),
    },
  }
},
{
  tabBarOptions: {
    showLabel: Platform.OS === 'ios'? false : true,
    activeTintColor: GLOBAL.COLOR.WHITE,
    inactiveTintColor: GLOBAL.COLOR.GRAY,
    style: {
      backgroundColor: '#000',
    },
    indicatorStyle: {
        backgroundColor: GLOBAL.COLOR.WHITE,
    },
  },
  tabBarPosition: 'bottom',
  animationEnabled: true,
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
  }
});
