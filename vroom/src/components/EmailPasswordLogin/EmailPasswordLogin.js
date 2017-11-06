import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  Button,
  TextInput
} from 'react-native';
import Onboarding from '../Onboarding/Onboarding';
import FadeInView from '../Login/Login';
import * as firebase from 'firebase';
import {firebaseRef} from '../../../index.js';
import Database from '../Database/Database';

GLOBAL = require('../../Globals');

export default class EmailPasswordLogin extends Component {

  // Author: Alec Felt
  // Purpose: sets up state for TextInput/Authentication use
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      status: ''
    };
  }

  componentDidMount() {

  }

  static navigationOptions = {
    title: 'EmailPasswordLogin',
    header: null,
  };

  goToOnboardingPage() {
    const { navigate } = this.props.navigation;
    navigate('Onboarding')
  }

  // Author: Alec Felt
  // Purpose: Checks state.email and state.password and
  //          authenticates the user with Firebase
  login = () => {
    firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
      // ...
    });
  }

  // Author: Alec Felt
  // Purpose: navigates to a signup component
  // TODO: Write the function and create the signup component
  signup = () => {
    firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
      // ...
    });
  }

  // Author: Alec Felt
  // Purpose: Renders UI for login
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.vroom}>Vroom</Text>
        </View>

        <View style={styles.input_container}>

          <View style={styles.inputs}>

            <TextInput
              placeholderTextColor={GLOBAL.COLOR.GRAY}
              style={styles.input}
              placeholder="email"
              onChangeText={(text) => this.setState({email: text})}
              onSubmitEditing={ () => this.login() }
            />

          </View>

          <View style={styles.inputs}>

            <TextInput
              placeholderTextColor={GLOBAL.COLOR.GRAY}
              style={styles.input}
              placeholder="password"
              onChangeText={ (text) => this.setState( {password: text} ) }
              onSubmitEditing={ () => this.login() }
            />

          </View>

        </View>

        <View style={styles.buttons}>

          <TouchableOpacity activeOpacity={0.8} onPress={ () => this.login() }>
            <View>
              <Text style={styles.button}>Login</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={ () => this.signup() }>
            <View>
              <Text style={styles.button}>Signup</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>
    );
  }

}

/*
 * Styles for this Page
 * Author: Connick Shields
 *
 */
const styles = StyleSheet.create({

  /*
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the card titles on this page
   */
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: GLOBAL.COLOR.DARKGRAY,
  },
  /*
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the header part of this page
   */
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  /*
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the title page of the app
   */
  vroom: {
    fontFamily: 'Nunito',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 80,
    color: GLOBAL.COLOR.GRAY,
    marginBottom: -5
  },
  /*
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the tagline of the application
   */
  tag_line: {
    fontFamily: 'Nunito',
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 20
  },
  /*
   * Style: button
   * Author: Alec Felt
   * Purpose: add style to the login and signup buttons
   */
  button: {
    fontFamily: 'Nunito',
    color: GLOBAL.COLOR.GREEN,
    fontSize: 30,
    marginTop: 3
  },
  /*
   * Style: buttons
   * Author: Alec Felt
   * Purpose: adds alignment/spacing to the buttons
   */
  buttons: {
    marginTop: 10,
    marginBottom: 10,
  },
  /*
   * Style: inputs
   * Author: Alec Felt
   * Purpose: adds alignment/spacing to the textInputs
   */
  inputs: {
    marginBottom: 10,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: GLOBAL.COLOR.GREEN,
  },
  /*
   * Style: input
   * Author: Alec Felt
   * Purpose: adds alignment/spacing to the textInputs
   */
  input: {
    width: 200,
    height: 40,
    marginBottom: 3,
    color: GLOBAL.COLOR.WHITE,
    padding: 10,
  },
  /*
   * Style: input_container
   * Author: Alec Felt
   * Purpose: adds alignment/spacing to the textInputs
   */
  input_container: {

  }
});
