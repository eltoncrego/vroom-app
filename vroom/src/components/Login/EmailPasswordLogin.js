import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  Button,
  TextInput,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import Onboarding from './Onboarding';
import FadeInView from '../Login/Login';
import * as firebase from 'firebase';
import {databaseLogin} from '../Database/Database';
import {databaseSignup} from '../Database/Database';

GLOBAL = require('../../Globals');

export default class EmailPasswordLogin extends Component {

  // Author: Alec Felt
  // Purpose: sets up state for TextInput/Authentication use
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      status: '',
      modalVisible: false,
      modalText: ''
    };
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
    var error = databaseLogin(this.state.email, this.state.password);
    if (error != "") {this.state.modalText = error; this.setModalVisible(true);}
  }

  // Author: Alec Felt
  // Purpose: navigates to a signup component
  // TODO: Create a sign up component that gathers more info
  //       than just the email and password
  signup = () => {
    databaseSignup(this.state.email, this.state.password);
  }

  // Author: Alec Felt
  // Purpose: sets the modal to visible/invisible
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  // Author: Alec Felt
  // Purpose: Renders UI for login
  render() {

    // Author: Alec Felt
    // Purpose: Notify the user if login/signup doesn't work
    // TODO: implement logic to use the modal
    var modal = this.state.modalVisible ?
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={{marginTop: 22}}>
            <View>
              <Text>{this.state.modalText}</Text>
              <TouchableHighlight onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
         </View>
        </Modal>
      </View>
    : null;


    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.header}>
          <Text style={styles.vroom}>vroom</Text>
        </View>

        <View style={styles.card}>
          <TextInput
            placeholderTextColor={GLOBAL.COLOR.GRAY}
            style={styles.input}
            placeholder="email"
            autoCapitalize="none"
            onChangeText={(text) => this.setState({email: text})}
            onSubmitEditing={ () => this.login() }
          />
          <TextInput
            placeholderTextColor={GLOBAL.COLOR.GRAY}
            style={styles.input}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={ (text) => this.setState( {password: text} ) }
            onSubmitEditing={ () => this.login() }
          />
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={ () => this.login() }
            style={styles.button_container}
          >
            <View>
              <Text style={styles.button}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={ () => this.signup() }
            style={styles.button_container}
          >
            <View>
              <Text style={styles.button}>Signup</Text>
            </View>
          </TouchableOpacity>
        </View>
        {modal}
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
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
    color: GLOBAL.COLOR.GREEN,
    marginTop: 20,
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
   * Style: input
   * Author: Alec Felt
   * Purpose: adds alignment/spacing to the textInputs
   */
  input: {
    fontFamily: 'Nunito',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginBottom: 32,
    borderBottomWidth: 2,
    paddingBottom: 2,
    width: '80%',
    borderColor: GLOBAL.COLOR.GREEN,
  },
  /*
   * Style: input_container
   * Author: Elton
   * Purpose: Creates a card for the inputs to sit on
   */
  card: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    width: 312,
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    paddingTop: 32,
    paddingBottom: 32,
  }
});
