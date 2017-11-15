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
import EmailPasswordLogin from './src/components/Login/EmailPasswordLogin';

/*
 * Constant: Vroom
 * Author: Elton C. Rego
 *
 * Purpose: Creates a stack of the possible screens
 *   that can be used in the application
 */

const DrawerContent = (props) => (
  <ScrollView scrollsToTop={false} style={styles.menu}>
    <SafeAreaView style={styles.drawer_container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Text style={styles.menu_title}>Menu</Text>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const InnerNavigator = DrawerNavigator ({
    Dashboard: { screen: Dashboard},
    Tutorial: {screen: Onboarding},
  }, {
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

const vroom = StackNavigator({
  // EmailPasswordLogin: {screen: EmailPasswordLogin},
  // Onboarding: {screen: Onboarding},
  Dashboard: {screen: InnerNavigator},
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
