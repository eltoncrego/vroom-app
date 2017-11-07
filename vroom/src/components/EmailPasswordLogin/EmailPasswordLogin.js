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
  TouchableHighlight
} from 'react-native';
import Onboarding from '../Onboarding/Onboarding';
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
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.vroom}>vroom</Text>
        </View>

        <View style={styles.input_container}>

          <View style={styles.inputs}>

            <TextInput
              placeholderTextColor={GLOBAL.COLOR.GRAY}
              style={styles.input}
              placeholder="email"
              autoCapitalize="none"
              onChangeText={(text) => this.setState({email: text})}
              onSubmitEditing={ () => this.login() }
            />

          </View>

          <View style={styles.inputs}>

            <TextInput
              placeholderTextColor={GLOBAL.COLOR.GRAY}
              style={styles.input}
              placeholder="password"
              autoCapitalize="none"
              secureTextEntry={true}
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

        {modal}

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
