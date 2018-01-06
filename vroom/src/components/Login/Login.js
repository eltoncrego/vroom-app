// Global Requirements
import React, {Component,} from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

// React Components
import {
  View,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import {Auth} from '.';

// Necessary Files
const bg = require('./../../../assets/img/login-bg.jpg')

export default class Login extends Component {

 /*
  * Author: Elton C. Rego
  * Purpose: Set up state for this specific component
  */
  constructor(props) {
    super(props);
    this.state = {
      input_style1: STYLE.input_inactive,
      input_style2: STYLE.input_inactive,
      input_style3: STYLE.input_inactive,
      button_color: GLOBAL.COLOR.GREEN,

      sign_up: false,
      email: null,
      password: null,
      password_verification: null,

      fade_animation: new Animated.Value(0),
      field_animation: new Animated.Value(0),
      shake_animation: new Animated.Value(0),
    };
  }

 /*
  * Author: Elton C. Rego
  * Purpose: Print to the console that the login screen has mounted
  *   animate in the page
  */
  componentDidMount() {
    console.log("Login component successfuly mounted.");
    Animated.timing(
      this.state.fade_animation,
      {
        toValue: 1,
        duration: 600,
      }
    ).start();
  }

 /*
  * Author: Elton C. Rego
  * Purpose: When called, the page will toggle the visibility of the
  *   verify password field, the text in the submit button, and the
  *   text of the signup link
  */
  toggleSignUp(){
    this.setState({
      sign_up: !this.state.sign_up,
    });
    Animated.timing(
      this.state.field_animation,
      {
        toValue: 1,
        duration: 500,
      }
    ).start();
    if(this.state.sign_up){
      this.setState({
        field_animation: new Animated.Value(0),
      });
    }
  }

 /*
  * Author: Elton C. Rego
  * Purpose: When called, changes the style of a text input to active
  */
  onFocus(index) {
    if(index == 1){
      this.setState({
        input_style1: STYLE.input_active,
      });
    }
    if(index == 2){
      this.setState({
        input_style2: STYLE.input_active,
      });
    }
    if(index == 3){
      this.setState({
        input_style3: STYLE.input_active,
      });
    }
  }

 /*
  * Author: Elton C. Rego
  * Purpose: When called, changes the style of a text input to inactive
  */
  onBlur(index) {
    if(index == 1){
      this.setState({
        input_style1: STYLE.input_inactive,
      });
    }
    if(index == 2){
      this.setState({
        input_style2: STYLE.input_inactive,
      });
    }
    if(index == 3){
      this.setState({
        input_style3: STYLE.input_inactive,
      });
    }
  }

 /*
  * Author: Elton C. Rego
  * Purpose: When called, shakes the button
  */
  shakeButton(){
    this.setState({
      button_color: GLOBAL.COLOR.RED,
    });
    Animated.sequence([
      Animated.timing(this.state.shake_animation, {
        toValue: -8,
        duration: 50,
      }),
      Animated.timing(this.state.shake_animation, {
        toValue: 8,
        duration: 50,
      }),
      Animated.timing(this.state.shake_animation, {
        toValue: -8,
        duration: 50,
      }),
      Animated.timing(this.state.shake_animation, {
        toValue: 8,
        duration: 50,
      }),
      Animated.timing(this.state.shake_animation, {
        toValue: 0,
        duration: 50,
      }),
    ]).start();
  }

 /*
  * Author: Alec Felt, Connick Shields
  * Purpose: Checks state.email and state.password and
  *          authenticates the user with Firebase
  */
  signin = () => {
    if((!this.state.email)){
      this.shakeButton();
      Alert.alert(
        'Woah there!',
        'You can\'t log in with an empty email!',
        [
          {text: 'I understand', onPress: () => {
            console.log('User understands their mistake.');
            this.setState({
              button_color: GLOBAL.COLOR.GREEN,
            });
          }},
        ],
      )
      return;
    }
    if((!this.state.password)){
      this.shakeButton();
      Alert.alert(
        'Hey there, friendo!',
        'You can\'t log in with an empty password!',
        [
          {text: 'I understand', onPress: () => {
            console.log('User understands their mistake.');
            this.setState({
              button_color: GLOBAL.COLOR.GREEN,
            });
          }},
        ],
      )
      return;
    }
    Auth.firebaseLogin(this.state.email, this.state.password);
  }

 /*
  * Author: Connick Shields
  * Purpose: navigates to a signup component
  */
  signup = () => {
    if((!this.state.email)){
      this.shakeButton();
      Alert.alert(
        'Now wait just a second!',
        'You can\'t log in with an empty email!',
        [
          {text: 'I understand', onPress: () => {
            console.log('User understands their mistake.');
            this.setState({
              button_color: GLOBAL.COLOR.GREEN,
            });
          }},
        ],
      )
      return;
    }
    if((!this.state.password)){
      this.shakeButton();
      Alert.alert(
        'Hold up!',
        'You can\'t log in with an empty password!',
        [
          {text: 'I understand', onPress: () => {
            console.log('User understands their mistake.');
            this.setState({
              button_color: GLOBAL.COLOR.GREEN,
            });
          }},
        ],
      )
      return;
    }
    if(this.state.password != this.state.password_verification){
      this.shakeButton();
      Alert.alert(
        'Imma let you finish',
        'but your passwords don\'t match',
        [
          {text: 'Let me fix it!', onPress: () => {
            console.log('User wants to fix it.');
            this.setState({
              button_color: GLOBAL.COLOR.GREEN,
            });
          }},
        ],
      )
      return;
    }
    Auth.firebaseSignup(this.state.email, this.state.password);
  }

 /*
  * Author: Elton C. Rego
  * Purpose: render the login component
  */
  render() {

   /*
    * Author: Elton C. Rego
    * Purpose: Checks if it's a sign_up instance vs sign_in instance
    *   and toggles the verify password field visibity as such
    */
    var pw_confirm_field = this.state.sign_up ?
      <Animated.View style={{opacity: this.state.field_animation,}}>
        <TextInput
          ref='password_verification_field'
          style={this.state.input_style3}
          placeholder="re-enter password"
          placeholderTextColor="rgba(255,255,255,0.6)"
          underlineColorAndroid={GLOBAL.COLOR.GREEN}
          autoCapitalize="none"
          secureTextEntry={true}
          onFocus={() => this.onFocus(3)}
          onBlur={() => this.onBlur(3)}
          onChangeText={(text) => {this.setState({password_verification: text})}}
          onSubmitEditing={ () => this.signup()}
        />
      </Animated.View> : null ;

   /*
    * Author: Elton C. Rego
    * Purpose: Checks if it's a sign_up instance vs sign_in instance
    *   and toggles the sign up link text as such
    */
    var signup_link_text = this.state.sign_up ?
      "Have an account with us? Sign in!" : "Don't have an account? Sign up!" ;

   /*
    * Author: Elton C. Rego
    * Purpose: Checks if it's a sign_up instance vs sign_in instance
    *   and toggles the sign up button text as such
    */
    var signup_button_text = this.state.sign_up ?
      "sign up!" : "sign in!" ;

    return (
      <Animated.View style={{opacity: this.state.fade_animation,}}>
        <ImageBackground
            style={[
              {
                width: '100%',
                height: '100%',
              }]
            }
        source={bg}>
        <View style={[
          STYLE.container,
          STYLE.scrim,]}>
          <StatusBar barStyle="light-content"/>
          <Animated.View style={styles.logo_container}>
            <Text style={STYLE.display2_accent_center}>vroom</Text>
            <Text style={[STYLE.dark_subheader_center, styles.sub_title]}>keep your car happy!</Text>
          </Animated.View>
          <KeyboardAvoidingView
            style={styles.form_container}
            behavior="padding">
            <Animated.View style={{transform: [{translateX: this.state.shake_animation}]}}>
            <TextInput
              style={this.state.input_style1}
              placeholder="email"
              placeholderTextColor="rgba(255,255,255,0.6)"
              underlineColorAndroid={GLOBAL.COLOR.GREEN}
              autoCapitalize="none"
              onFocus={() => this.onFocus(1)}
              onBlur={() => this.onBlur(1)}
              onChangeText={(text) => {this.setState({email: text})}}
              onSubmitEditing={() => this.refs.password_field.focus()}
            />
            <TextInput
              ref='password_field'
              style={this.state.input_style2}
              placeholder="password"
              placeholderTextColor="rgba(255,255,255,0.6)"
              underlineColorAndroid={GLOBAL.COLOR.GREEN}
              autoCapitalize="none"
              secureTextEntry={true}
              onFocus={() => this.onFocus(2)}
              onBlur={() => this.onBlur(2)}
              onChangeText={(text) => {this.setState({password: text})}}
              onSubmitEditing={ () => {
                if(this.state.sign_up){
                  this.refs.password_verification_field.focus()
                } else {
                  this.signin();
                }
              }}
            />
            {pw_confirm_field}
             <TouchableOpacity style={[STYLE.button_container,
              {
                backgroundColor: this.state.button_color,
              }]}
              onPress={()=>{
                if(this.state.sign_up){
                  this.signup();
                } else {
                  this.signin();
                }
              }}>
              <Text style={STYLE.green_button_text}>{signup_button_text}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleSignUp()}>
              <Text style={STYLE.normal_link_text}>{signup_link_text}</Text>
            </TouchableOpacity>
            </Animated.View>
          </KeyboardAvoidingView>
        </View>
        </ImageBackground>
      </Animated.View>
    );
  }

}


const styles = StyleSheet.create({

 /*
  * Author: Elton C. Rego
  * Purpose: Styles the container for the logo and subheader
  */
  logo_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },

 /*
  * Author: Elton C. Rego
  * Purpose: Styles the container for the login form
  */
  form_container: {
    padding: 32,
    marginBottom: 32,
  },

 /*
  * Author: Elton C. Rego
  * Purpose: Styles the subtitle for the login logo
  */
  sub_title: {
    marginTop: -16,
  },
});
