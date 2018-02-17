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
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  TextInput,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

// Our Components
import Auth from '../Authentication/Auth';


// Files Needed
// import {firebaseRef} from "../Database/Database";
// import Auth from "../Authentication/Auth";
// import {goTo, clearNavStack} from "../Navigation/Navigation";
// import * as firebase from 'firebase';


/*
 * Class: Settings
 * Author: Elton C.  Rego
 *
 * Purpose: Be the main area where users can customize their experience
 */
export default class Settings extends Component {

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

  /*
   * Method: componentDidMount()
   * Author: Elton C. Rego
   *
   * Purpose: When a component specified sucessfully is rendered,
   *   it runs the action
   */
  componentDidMount() {
    console.log("Settings component mounted");
  }


  /*
   * Method: render
   * Author: Elton C. Rego
   *
   * Purpose: Renders the Dashboard page.
   *  As of now this just contains some dummy tasks that
   *  we can learn to populate later.
   *
   */
  render() {

    return (
      <View style={[styleguide.container,{
        backgroundColor: GLOBAL.COLOR.GRAY,
      }]}>
        <View style={styles.navbar}>
          <Text style={styleguide.dark_title2}>
            settings<Text style={styleguide.dark_title2_accent}>.</Text>
          </Text>
          <TouchableOpacity onPress={() => this.props.closeCallBack()}>
            <View>
              <Text style={styleguide.dark_title2}>
                <FontAwesome>{Icons.times}</FontAwesome>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <ScrollView style={{width: '100%',}} showVerticalScrollIndicator={false}>
            <View style={styles.content_wrapper}>
              <TouchableOpacity onPress={() => {Auth.logOut()}}>
                <View style={styles.setting_item}>
                  <View style={{
                    marginRight: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={styleguide.dark_body}><FontAwesome>{Icons.unlockAlt}</FontAwesome></Text>
                  </View>
                  <Text style={styleguide.dark_body}>
                    Sign Out
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Text style={styleguide.dark_caption_secondary}>Made with <FontAwesome>{Icons.heart}</FontAwesome> by Revi</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderColor: 'rgba(255,255,255,0.50)',
  },
  content: {
    flex: 9,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  content_wrapper: {
    flex: 1,
    width: '100%',
  },
  setting_item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.50)',
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
