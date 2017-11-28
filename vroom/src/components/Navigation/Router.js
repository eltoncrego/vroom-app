/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');

// Components
import {
  StackNavigator,
  DrawerNavigator,
  SafeAreaView,
  DrawerItems,
} from "react-navigation";
import {
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";

// Necessary Files
import Login from '../Login/Login';
import Onboarding from '../Screens/Onboarding';
import Dashboard from '../Screens/Dashboard';
import Settings from '../Screens/Settings';
import Events from '../Screens/Events';

/*
 * Constant: DrawerContent
 * Author: Elton C. Rego
 *
 * Purpose: Creates a custom drawer DOM which can be styled according
 *   to our design guidelines
 */
const DrawerContent = (props) => (
  <ScrollView scrollsToTop={false} style={drawer_styles.menu}>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      <Text style={drawer_styles.menu_title}>Menu</Text>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

/*
 * Constant: SignedOut
 * Author: Elton C. Rego
 *
 * Purpose: Impliments a Stack Navigator that holds the screen
 *   for when a user is logged out.
 */
export const SignedOut = StackNavigator ({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
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
 */
export const SignedIn_D = DrawerNavigator({
  Dashboard: {screen: Dashboard},
  Onboarding: { screen: Onboarding},
  Settings: {screen: Settings},
  Events: {screen: Events},
},{
  contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: GLOBAL.COLOR.GREEN,
      inactiveTintColor: GLOBAL.COLOR.BLUE,
      labelStyle:{
        fontSize: 22,
        fontWeight: '500',
        fontFamily: 'Nunito',
        paddingLeft: 5,
      },
      itemsContainerStyle: {
        marginVertical: 0,
      },
    },
});

export const SignedIn_O = DrawerNavigator({
  Onboarding: { screen: Onboarding},
  Dashboard: {screen: Dashboard},
  Settings: {screen: Settings},
  Events: {screen: Events},
},{
  contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: GLOBAL.COLOR.GREEN,
      inactiveTintColor: GLOBAL.COLOR.BLUE,
      labelStyle:{
        fontSize: 22,
        fontWeight: '500',
        fontFamily: 'Nunito',
        paddingLeft: 5,
      },
      itemsContainerStyle: {
        marginVertical: 0,
      },
    },
});

/*
 * Constant: Styles
 * Author: Elton C. Rego
 *
 * Purpose: Styles the drawer navigation menu
 */
const drawer_styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor:  GLOBAL.COLOR.GRAY,
  },
  menu_title: {
    color: GLOBAL.COLOR.DARKBLUE,
    fontFamily: 'Nunito',
    fontWeight: '900',
    fontSize: 40,
    padding: 20,
  },
});
