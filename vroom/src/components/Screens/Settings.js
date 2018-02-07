/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');

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
// import { Dropdown } from 'react-native-material-dropdown';


// Files Needed
import {firebaseRef} from "../Database/Database";
import {Auth} from "../Login";
import {goTo, clearNavStack} from "../Navigation/Navigation";
import * as firebase from 'firebase';


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
    this.state = {
      reAuth: false,
      email: "",
      password: "",
      timeframe: [{
        value: 'One Week',
      }, {
        value: 'Two Weeks',
      }, {
        value: 'One Month',
      }],
    }
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
    this.setNotifications(this.state.timeframe[0].value);
  }

  deleteAccount() {
    if(this.state.reAuth){
      this.reAuth();
    } else {
      Alert.alert(
        'Oh No!',
        'We\'re sorry to see you go.\nAre you sure you want to delete your account? This action cannot be undone!',
        [
          {text: "Yes", onPress: () => {
            alert("Please enter your credentials to confirm account deletion.\nSimply leave the settings page to cancel.");
            this.setState({ reAuth: true });
          }},
          {text: "No"},
        ]
      )
    }
  }

  reAuth() {
    console.log("reAuth()");
    var email = this.state.email;
    var password = this.state.password;
    Auth.reAuth(email, password);
  }

  setNotifications(val) {
    console.log("Dropdown value: "+val);
    firebaseRef.database().ref("users/"+Auth.getAuth().uid+"/settings/notifications")
      .set(val).then(() => {
        console.log("successfully set notification setting for user");
      }).catch((error) => {
        alert("Error: couldn't set notification");
        console.log("Unsuccessfully set notification setting for user");
      });
  }

  /*
   * Static: navigationOptions
   * Author: Elton C. Rego, Alec Felt
   *
   * Purpose: To set the navigation bar options for this page
   */
  static navigationOptions = ({navigation, screenProps}) => ({

      /*
       * navigationOptions: headerStyle, headerRight
       * Author: Elton C. Rego, Alec Felt
       *
       * Purpose: Add color/font to navbar
       *          Add button on headerRight for navigation
       *          options in the future
       */
      headerStyle: {
        backgroundColor: GLOBAL.COLOR.DARKGRAY,
      },

      title: (<Text style={styles.header_middle}>Settings</Text>),

      headerRight: (
        <TouchableOpacity onPress={() => { Auth.logOut(); }}>
          <Text style={styles.button_header}>Sign Out</Text>
        </TouchableOpacity>
      ),
      headerLeft: (
          <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={styles.button}>
            <View>
              <Text style={styles.menu}>Menu</Text>
            </View>
          </TouchableOpacity>
      ),
  });

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

    var reAuth = this.state.reAuth ?
      <View style={styles.delete_confirm}>
        <TextInput
          placeholderTextColor={GLOBAL.COLOR.GRAY}
          style={styles.input}
          placeholder="email"
          autoCapitalize="none"
          onChangeText={(text) => {
            this.setState({email: text});
          }}
          underlineColorAndroid='transparent'
        />
        <TextInput
          placeholderTextColor={GLOBAL.COLOR.GRAY}
          style={styles.input}
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({password: text});
          }}
          underlineColorAndroid='transparent'
        />
      </View>
      :
      null;

    return (
      <View
        style={styles.container}
      >
        <StatusBar
           barStyle="light-content"
         />
        <Text
          style={styles.header}
        >
          Settings
        </Text>
        <Text style={styles.settings_title}>
          Notification Timeframe
        </Text>
        <Text style={styles.settings_text}>
          How far in advance would you like to recieve notifications?
        </Text>
        {reAuth}
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.8}
          onPress={
              () => this.deleteAccount()
          }>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  /*
    * Style: Button Header
    * Author: Elton C. Rego
    * Purpose: Add style to the navbar button
    *          to stay consistent with project theme
    */
    button_header: {
      fontFamily: 'Nunito',
      color: GLOBAL.COLOR.BLUE,
      margin: 20,
    },
    header_middle: {
      color: GLOBAL.COLOR.BLUE,
      fontFamily: 'Nunito',
      margin: 20,
    },
    menu: {
      fontFamily: 'Nunito',
      color: GLOBAL.COLOR.BLUE,
      margin: 20,
    },
    container: {
      flex: 1,
      backgroundColor: GLOBAL.COLOR.DARKGRAY,
      padding: 32,
    },
    /*
     * Style: input
     * Author: Alec Felt
     * Purpose: adds alignment/spacing to the textInputs
     */
    input: {
      fontFamily: 'Nunito',
      textAlign: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      fontSize: 20,
      marginBottom: 32,
      borderBottomWidth: 2,
      paddingBottom: 2,
      width: '80%',
      borderColor: GLOBAL.COLOR.RED,
      color: GLOBAL.COLOR.RED
    },
    /*
     * Style: button
     * Author: Elton C. Rego
     * Purpose: Adds styling to the touchable opacity elements
     */
     button_container: {
        backgroundColor: GLOBAL.COLOR.GREEN,
        padding: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        margin: 8,
     },
     /*
      * Style: button
      * Author: Alec Felt
      * Purpose: add style to the login and signup buttons
      */
     button: {
       textAlign: 'center',
       fontFamily: 'Nunito',
       color: GLOBAL.COLOR.WHITE,
       backgroundColor: 'transparent',
       fontSize: 15,
       fontWeight: '600',
    },
    /*
    * Style: Settings Header
    * Author: Elton C. Rego
    * Purpose: Styles the header of the settings page
    */
    header: {
      fontFamily: 'Nunito',
      fontWeight: '900',
      fontSize: 40,
      color: GLOBAL.COLOR.BLUE,
    },

      /*
     * Style: Button
     * Author: Elton C. Rego
     * Purpose: This styles the Next button
     */
    buttonContainer: {
      backgroundColor: GLOBAL.COLOR.RED,
      padding: 12,
      paddingHorizontal: 24,
      borderRadius: 20,
      margin: 32,
    },
    buttonText: {
      textAlign: 'center',
      fontFamily: 'Nunito',
      color: GLOBAL.COLOR.DARKGRAY,
      backgroundColor: 'transparent',
      fontSize: 20,
      fontWeight: '600',
    },

    settings_title: {
      fontFamily: 'Nunito',
      fontSize: 20,
      fontWeight: '900',
      color: GLOBAL.COLOR.WHITE,
    },
    settings_text: {
      fontFamily: 'Nunito',
      fontSize: 15,
      fontWeight: '200',
      color: GLOBAL.COLOR.WHITE,
    },
    delete_confirm: {
      marginTop: 32,
    },

});
