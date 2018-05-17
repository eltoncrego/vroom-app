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
  Linking,
  Platform,
  SafeAreaView,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

// Our Components
import Auth from '../Authentication/Auth';
import { goTo } from '../Navigation/Navigation';

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
        backgroundColor: GLOBAL.COLOR.DARKBLUE,
      }]}>
        <View style={styles.navbar}>
          <Text style={styleguide.dark_title2}>
            settings<Text style={styleguide.dark_title2_accent}>.</Text>
          </Text>
          <TouchableOpacity onPress={() => this.props.closeCallBack()}>
            <View>
               <Text style={styleguide.dark_title}>
                 <FontAwesome>{Icons.times}</FontAwesome>
               </Text>
             </View>
           </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <ScrollView style={{width: '100%',}} showVerticalScrollIndicator={false}>
            <View style={styles.content_wrapper}>
              <TouchableOpacity onPress={() => {
                this.props.addCallBack();
              }}>
                <View style={styles.setting_item}>
                  <Text style={styleguide.dark_body}>
                    Add a Car
                  </Text>
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={styleguide.dark_body}><FontAwesome>{Icons.plus}</FontAwesome></Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {Linking.canOpenURL('mailto:contact@revi.tech?subject=Vroom Feedback').then(supported => {
                supported && Linking.openURL('mailto:contact@revi.tech?subject=Vroom Feedback');
              }, (err) => console.log(err));}}>
                <View style={styles.setting_item}>
                  <Text style={styleguide.dark_body}>
                    Contact Us
                  </Text>
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={styleguide.dark_body}><FontAwesome>{Icons.paperPlane}</FontAwesome></Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                Linking.canOpenURL('https://revi.tech/privacy').then(supported => {
                  supported && Linking.openURL('https://revi.tech/privacy');
                }, (err) => console.log(err));
              }}>
                <View style={styles.setting_item}>
                  <Text style={styleguide.dark_body}>
                    Our Privacy Policy
                  </Text>
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={styleguide.dark_body}><FontAwesome>{Icons.clipboard}</FontAwesome></Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                Linking.canOpenURL('https://revi.tech/vroom/eula').then(supported => {
                  supported && Linking.openURL('https://revi.tech/vroom/eula');
                }, (err) => console.log(err));
              }}>
                <View style={styles.setting_item}>
                  <Text style={styleguide.dark_body}>
                    Vroom End User License Agreement
                  </Text>
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={styleguide.dark_body}><FontAwesome>{Icons.clipboard}</FontAwesome></Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                  var that = this;
                  Auth.logOut().then(function(){}).catch(
                    function(error){
                      this.props.alert.showAlert("Alert",
                      error.message,
                      "Ok");
                    }
                  )
              }}>
                <View style={styles.setting_item}>
                  <Text style={styleguide.dark_body}>
                    Sign Out
                  </Text>
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={styleguide.dark_body}><FontAwesome>{Icons.lock}</FontAwesome></Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Text style={styleguide.dark_caption_secondary}>Made with <FontAwesome>{Icons.heart}</FontAwesome> by Revi</Text>
          <Text style={styleguide.dark_caption_secondary}>in Santa Cruz, California</Text>
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
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.50)',
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
    justifyContent: 'space-between',
    padding: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.50)',
    backgroundColor: 'rgba(255,255,255,0.10)',
  },

  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
