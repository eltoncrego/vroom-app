// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');

// Components
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  ScrollView,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
} from 'react-native';
import Onboarding from './Onboarding';
import Dashboard from '../Dashboard/Dashboard';
import { goTo, clearNavStack } from '../Navigation/Navigation';
import {firebaseRef} from '../../../index';
import {
  databaseLogin,
  databaseSignup,
  authListener,
} from '../Database/Database';

export default class EmailPasswordLogin extends Component {

  // Author: Alec Felt
  // Purpose: sets up state for component
  constructor(props) {
    super(props);
  }

  state = {
    em: null,
    ems: null,
    pw: null,
    pws: null,
    pws2: null,
    isFirst: true,
  }

  // defUser = {
  //   cars: [],
  //   ob: false,
  // }

  componentDidMount() {
    // if user is logged in, go to dashboard TODO separate sign in / sign up
    firebaseRef.auth().onAuthStateChanged((user) => {
      if(user){
        var ur = firebaseRef.database().ref("users/");
        var ref = ur.child(user.uid);
        var that = this;
        ref.once("value").then(function (snapshot) {
            var data = snapshot.val();
            if(data.ob == false){
              clearNavStack(that.props.navigation, 'Dashboard');
            } else {
              ref.set({ob: false});
              clearNavStack(that.props.navigation, 'Onboarding');
            }
        });
      }
    });
  }

  static navigationOptions = {
    title: 'Login',
    header: null,
    drawerLockMode: 'locked-closed',
  };

  // Author: Alec Felt, Connick Shields
  // Purpose: Checks state.email and state.password and
  //          authenticates the user with Firebase
  login = () => {
    //check to see if any text fields are empty
    if((!this.state.em) || (!this.state.pw)){
        alert('Please make sure to fill in all fields.');
        return;
    }
    databaseLogin(this.state.em, this.state.pw);
  }

  // Author: Connick Shields
  // Purpose: navigates to a signup component

  signup = () => {
    // check to see if any text fields are empty
    if((!this.state.ems) || (!this.state.pws)){
        Alert.alert('Please make sure to fill in all fields.');
        return;
    }
    // make sure passwords match
    if(this.state.pws != this.state.pws2){
        Alert.alert('Please make sure both passwords match.');
        return;
    }
    // sign up the user
    databaseSignup(this.state.ems, this.state.pws);
  }

  // Author: Connick Shields
  // Purpose: swap view cards

  swapCards(){
    if(this.state.isFirst){
      // go to sign up
      this.setState({isFirst:!this.state.isFirst});
    } else {
      // go to sign in
      this.setState({isFirst:!this.state.isFirst});
    }
  }

  // Author: Alec Felt
  // Purpose: Renders UI for login
  render() {

    var sign_in_card = this.state.isFirst ?
      <View style={styles.card}>
        <TextInput
            placeholderTextColor={GLOBAL.COLOR.GRAY}
            style={styles.input}
            placeholder="email"
            autoCapitalize="none"
            onChangeText={(text) => {
              this.setState({em: text});
              this.setState({ems: text});
            }}
          />
          <TextInput
            placeholderTextColor={GLOBAL.COLOR.GRAY}
            style={styles.input}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({pw: text});
              this.setState({pws: text});
            }}
            onSubmitEditing={ () => this.login() }
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={ () => this.login() }
            style={styles.button_container}
          >
            <View>
              <Text style={styles.button}>Sign In</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.signin}
            onPress={ () => this.swapCards() }
            >No account? Sign up!</Text>
          </View>
        </View>
          :
        <View style={styles.card}>
          <TextInput
            placeholderTextColor={GLOBAL.COLOR.GRAY}
            style={styles.input}
            placeholder="email"
            autoCapitalize="none"
            onChangeText={(text) => {
              this.setState({em: text});
              this.setState({ems: text});
            }}
          />
          <TextInput
            placeholderTextColor={GLOBAL.COLOR.GRAY}
            style={styles.input}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({pw: text});
              this.setState({pws: text});
            }}
          />
          <TextInput
            placeholderTextColor={GLOBAL.COLOR.GRAY}
            style={styles.input}
            placeholder="retype password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={ (text) => this.setState( {pws2: text} ) }
            onSubmitEditing={ () => this.signup() }
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={ () => this.signup() }
            style={styles.button_container}
          >
            <View>
              <Text style={styles.button}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.signin}
            onPress={ () => this.swapCards() }
            >Have an account? Sign in!</Text>
          </View>
        </View>;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
       <StatusBar
         barStyle="light-content"
       />
        <View style={styles.header}>
          <Text style={styles.vroom}>vroom</Text>
          <Text style={styles.tag_line}>The app that keeps your car happy!</Text>
        </View>
        {sign_in_card}
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
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the sign in line
   */
  signin: {
    fontFamily: 'Nunito',
    textAlign: 'center',
    fontSize: 15,
    color: GLOBAL.COLOR.GREEN,
    marginTop: 10,
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
  },
});
