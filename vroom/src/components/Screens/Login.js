// Global Requirements
import React, {Component,} from 'react';
GLOBAL = require('../../Globals');
styleguide = require('../../global-styles');

// React Components
import {
  SafeAreaView,
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
  Modal,
} from 'react-native';
import {Icons} from 'react-native-fontawesome';
import Auth from '../Authentication/Auth';
import {InputField} from './../Custom/InputField';
import {Button} from './../Custom/Button';
import {VAlert} from './../Custom/VAlert';

export default class Login extends Component {

 /*
  * Method: Constructor
  * Author: Elton C. Rego
  *
  * Purpose: Constructs the class with given props
  *
  * @param: properties
  */
  constructor(props) {
    super(props);
    this.state = {
      button_color: GLOBAL.COLOR.GREEN,

      sign_up: false,
      page_text: "Sign in",
      button_text: "sign in!",
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
        duration: 1000,
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
        page_text: "Sign in",
        button_text: "sign in!",
      });
    } else {
      this.setState({
        page_text: "Sign up",
        button_text: "sign up!",
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
        <InputField
          icon={Icons.check}
          label={"re-enter password"}
          labelColor={"rgba(37,50,55,0.5)"}
          inactiveColor={GLOBAL.COLOR.DARKGRAY}
          activeColor={GLOBAL.COLOR.GREEN}
          topMargin={24}
          autoCapitalize={"none"}
          secureTextEntry={true}
          onChangeText={
            (text) => {this.setState({password_verification: text})}
          }
          onSubmitEditing={ () => {() => this.signup()}}
        />
      </Animated.View> : null ;

   /*
    * Author: Elton C. Rego
    * Purpose: Checks if it's a sign_up instance vs sign_in instance
    *   and toggles the sign up link text as such
    */
    var signup_link_text = this.state.sign_up ?
      "Have an account with us? Sign in!"
      : "Don't have an account? Sign up!" ;

   /*
    * Author: Elton C. Rego
    * Purpose: Checks if it's a sign_up instance vs sign_in instance
    *   and toggles the sign up button text as such
    */
    var signup_button_text = this.state.sign_up ?
      "sign up!" : "sign in!" ;

    return (
      <SafeAreaView style={[
        styleguide.container,
        styles.container,
      ]}>
        <Animated.View style={{opacity: this.state.fade_animation,}}>
          <KeyboardAvoidingView
            style={styles.sign_in_form}
            behavior="padding"
          >
            <Text style={styleguide.light_display2}>
              {this.state.page_text}
              <Text style={styleguide.light_display2_accent}>.</Text>
            </Text>
            <InputField
              autoFocus={true}
              icon={Icons.inbox}
              label={"email"}
              labelColor={"rgba(37,50,55,0.5)"}
              inactiveColor={GLOBAL.COLOR.DARKGRAY}
              activeColor={GLOBAL.COLOR.GREEN}
              topMargin={32}
              autoCapitalize={"none"}
              onChangeText={(text) => {this.setState({email: text})}}
            />
            <InputField
              icon={Icons.lock}
              label={"password"}
              labelColor={"rgba(37,50,55,0.5)"}
              inactiveColor={GLOBAL.COLOR.DARKGRAY}
              activeColor={GLOBAL.COLOR.GREEN}
              topMargin={24}
              autoCapitalize={"none"}
              secureTextEntry={true}
              onChangeText={(text) => {this.setState({password: text})}}
              onSubmitEditing={ () => {
                if(!this.state.sign_up){
                  this.signin();
                }
              }}
            />
            {pw_confirm_field}
            <TouchableOpacity onPress={() => {alert("ok?")}}>
              <Text
                style={[
                  styleguide.light_body_secondary,
                  styles.forgot_password_text
                ]}
              >forgot password?</Text>
          </TouchableOpacity>
            <Animated.View
              style={
                {
                  transform: [{translateX: this.state.shake_animation}]
                }
              }>
               <Button
                backgroundColor={this.state.button_color}
                label={this.state.button_text}
                height={64}
                marginTop={40}
                shadowColor={this.state.button_color}
                onPress={()=>{
                  if(this.state.sign_up){
                    this.signup();
                  } else {
                    this.signin();
                  }
                }}
              />
            </Animated.View>
            <TouchableOpacity onPress={() => this.toggleSignUp()}>
              <Text style={[
                styleguide.light_body_secondary,
                {
                  alignSelf: 'center',
                  paddingTop: 40
                }
              ]}>
                {signup_link_text}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Animated.View>
        <VAlert/>
      </SafeAreaView>
    );
  }

}


const styles = StyleSheet.create({

 /*
  * Author: Elton C. Rego
  * Purpose: Styles the container for the login form
  */
  container: {
    backgroundColor: GLOBAL.COLOR.WHITE,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sign_in_form: {
    margin: 32,
  },

  forgot_password_text: {
    marginTop: 8,
    alignSelf: 'flex-end',
  }

});
