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
    // this.state = {
    //   reAuth: false,
    //   email: "",
    //   password: "",
    // }
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
    // this.setNotifications(this.state.timeframe[0].value);
  }

  // deleteAccount() {
  //   if(this.state.reAuth){
  //     this.reAuth();
  //   } else {
  //     Alert.alert(
  //       'Oh No!',
  //       'We\'re sorry to see you go.\nAre you sure you want to delete your account? This action cannot be undone!',
  //       [
  //         {text: "Yes", onPress: () => {
  //           alert("Please enter your credentials to confirm account deletion.\nSimply leave the settings page to cancel.");
  //           this.setState({ reAuth: true });
  //         }},
  //         {text: "No"},
  //       ]
  //     )
  //   }
  // }
  //
  // reAuth() {
  //   console.log("reAuth()");
  //   var email = this.state.email;
  //   var password = this.state.password;
  //   Auth.reAuth(email, password);
  // }

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

    // let timeframe = [{
    //   value: 'One Week',
    // }, {
    //   value: 'Two Weeks',
    // }, {
    //   value: 'One Month',
    // }];

    // var reAuth = this.state.reAuth ?
    //   <View style={styles.delete_confirm}>
    //     <TextInput
    //       placeholderTextColor={GLOBAL.COLOR.GRAY}
    //       style={styles.input}
    //       placeholder="email"
    //       autoCapitalize="none"
    //       onChangeText={(text) => {
    //         this.setState({email: text});
    //       }}
    //       underlineColorAndroid='transparent'
    //     />
    //     <TextInput
    //       placeholderTextColor={GLOBAL.COLOR.GRAY}
    //       style={styles.input}
    //       placeholder="password"
    //       autoCapitalize="none"
    //       secureTextEntry={true}
    //       onChangeText={(text) => {
    //         this.setState({password: text});
    //       }}
    //       underlineColorAndroid='transparent'
    //     />
    //   </View>
    //   :
    //   null;

    return (
      <View style={[styleguide.container,{
        backgroundColor: GLOBAL.COLOR.GRAY,
      }]}>
        <StatusBar
           barStyle="dark-content"
         />
        <View style={styles.navbar}>
          <Text style={styleguide.light_title2}>
            settings<Text style={styleguide.light_title2_accent}>.</Text>
          </Text>
          <TouchableOpacity onPress={() => this.props.closeCallBack()}>
            <View>
              <Text style={styleguide.light_title2}>
                <FontAwesome>{Icons.timesCircleO}</FontAwesome>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <ScrollView>
            <View>
            </View>
          </ScrollView>
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
  },
  content: {
    flex: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
