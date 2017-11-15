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
  ScrollView,
  Text,
} from 'react-native';
import {
  StackNavigator,
  DrawerNavigator,
  DrawerItems,
  SafeAreaView
} from 'react-navigation';
import * as firebase from 'firebase';

// Necessary Files
import Onboarding from './src/components/Login/Onboarding';
import Dashboard from './src/components/Dashboard/Dashboard';
import Settings from './src/components/Database/Settings';
import EmailPasswordLogin from './src/components/Login/EmailPasswordLogin';

/*
 * Constant: DrawerContent
 * Author: Elton C. Rego
 *
 * Purpose: Creates a custom drawer DOM which can be styled according
 *   to our design guidelines
 */
const DrawerContent = (props) => (
  <ScrollView scrollsToTop={false} style={styles.menu}>
    <SafeAreaView style={styles.drawer_container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Text style={styles.menu_title}>Menu</Text>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

/*
 * Constant: InnerNavigator
 * Author: Elton C. Rego
 *
 * Purpose: Handles the stack navigator component within the
 *   Drawer navigator. Allows us to maintain our custom navigation
 *   bar with an overlayed drawer navigation. Place screens that
 *   should not have a drawer menu here.
 */
const InnerNavigator = StackNavigator ({
  EmailPasswordLogin: {screen: EmailPasswordLogin},
  Onboarding: {screen: Onboarding},
  Dashboard: { screen: Dashboard},
  Settings: {screen: Settings},
});

/*
 * Constant: Vroom
 * Author: Elton C. Rego
 *
 * Purpose: Impliments a Drawer Navigator that has a nested
 *   Stack navigtor within. Allows for a drawer menu in the
 *   screens mentioned here, but still supports our old method
 *   of navigating between screens
 */
const vroom = DrawerNavigator({
  Dashboard: {screen: InnerNavigator},
  Settings: {screen: Settings},
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
 * Congfiguration: firebase.initializeApp
 * Author: Alec Felt
 *   Purpose: Attach our app to our database
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

/*
 * Constant: Styles
 * Author: Elton C. Rego
 *
 * Purpose: Styles the drawer navigation menu
 */
const styles = StyleSheet.create({
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
