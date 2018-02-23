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
  TouchableOpacity,
  Animated,
  Modal,
  Platform,
} from 'react-native';
import {Icons} from 'react-native-fontawesome';
import Animation from 'lottie-react-native';

import Auth from '../Authentication/Auth';
import { goTo } from '../Navigation/Navigation';
import {initUser} from '../Database/Database';
import {InputField} from './../Custom/InputField';
import {Button} from './../Custom/Button';
import VAlert from './../Custom/VAlert';
import Loading from './../Screens/Loading';

import loader_icon from '../../../assets/animations/loading.json';

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
      button_color: new Animated.Value(0),

      sign_up: true,
      page_text: "Sign up",
      button_text: "sign up!",
      email: null,
      password: null,
      password_verification: null,

      modalVisible: false,

      fade_animation: new Animated.Value(0),
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
    var that = this;
    Animated.timing(
      this.state.fade_animation,
      {
        toValue: 0,
        duration: 500,
      }
    ).start(() => {
      that.setState({
        sign_up: !this.state.sign_up,
      });
      if(!that.state.sign_up){
        that.setState({
          page_text: "Sign in",
          button_text: "sign in!",
        });
      } else {
        that.setState({
          page_text: "Sign up",
          button_text: "sign up!",
        });
      }
      Animated.timing(
        that.state.fade_animation,
        {
          toValue: 1,
          duration: 500,
        }
      ).start();
    });
  }

  /*
   * Author: Elton C. Rego
   * Purpose: When called, shakes the button
   */
   shakeButton(){
     Animated.sequence([
       Animated.timing(this.state.button_color, {
         toValue: 1,
         duration: 150,
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
       Animated.timing(this.state.button_color, {
         toValue: 0,
         duration: 150,
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
      this.refs.valert.showAlert('Woah there!',
      'You can\'t log in with an empty email!',
      'I understand');
      return;
    }
    if((!this.state.password)){
      this.shakeButton();
      this.refs.valert.showAlert('Hey there, friendo!',
      'You can\'t log in with an empty password!',
      'I understand');
      return;
    }
    this.openModal();
    var that = this;
    Auth.firebaseLogin(this.state.email, this.state.password).then(function(rv){
      that.closeModal();
    }).catch(function(error){
      that.closeModal();
      that.refs.valert.showAlert('Alert',
      error.message,
      'Ok');
    })
  }

 /*
  * Author: Connick Shields
  * Purpose: navigates to a signup component
  */
  signup = () => {
    if((!this.state.email)){
      this.shakeButton();
      this.refs.valert.showAlert('Now wait just a second!',
      'You can\'t sign up with an empty email!',
      'I understand');
      return;
    }
    if((!this.state.password)){
      this.shakeButton();
      this.refs.valert.showAlert('Hold up!',
      'You can\'t sign up with an empty password!',
      'I understand');
      return;
    }
    if(this.state.password != this.state.password_verification){
      this.shakeButton();
      this.refs.valert.showAlert('Our OCD is going off...',
      'your passwords don\'t match',
      'I understand');
      return;
    }
    this.openModal();
    var that = this;
    Auth.firebaseSignup(this.state.email, this.state.password).then(function(rv){
      that.closeModal();
    }).catch(function(error) {
      that.closeModal();
      that.refs.valert.showAlert('Alert',
      error.message,
      'Ok');
    });
  }

  /*
   * Function: openModal()
   * Author: Elton C. Rego
   * Purpose: Opens the modal to add a gas item
   */
   openModal() {
     this.setState({modalVisible:true});
     Animated.timing(
       this.state.fade_animation,
       {
         toValue: 0.1,
         duration: 150,
       }
     ).start();
   }

  /*
   * Function: closeModal()
   * Author: Elton C. Rego
   * Purpose: Closes the modal to add a gas item
   */
   closeModal() {
     Animated.timing(
       this.state.fade_animation,
       {
         toValue: 1,
         duration: 150,
       }
     ).start();
     this.setState({modalVisible:false});
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
        <InputField
          icon={Icons.check}
          label={"re-enter password"}
          labelColor={"rgba(37,50,55,0.5)"}
          inactiveColor={GLOBAL.COLOR.DARKGRAY}
          activeColor={GLOBAL.COLOR.GREEN}
          topMargin={24}
          autoCapitalize={"none"}
          secureTextEntry={true}
          autoCorrect={false}
          returnKeyType={'go'}
          onChangeText={
            (text) => {this.setState({password_verification: text})}
          }
          onSubmitEditing={ () => {() => this.signup()}}
        />: null ;

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

    var keyboardBehavior = Platform.OS === 'ios' ? "padding" : null;

    var buttonColor = this.state.button_color.interpolate({
      inputRange: [0, 1],
      outputRange: [GLOBAL.COLOR.GREEN, GLOBAL.COLOR.RED]
    });

    return (
      <SafeAreaView style={[
        styleguide.container,
        styles.container,
      ]}>

      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        animationType={'slide'}
      >
        <View style={styles.modalContainer}>
          <View style={{flex: 3}}></View>
          <View style={styles.innerContainer}>
            <Loading label={"we're contacting the database gods"}/>
          </View>
        </View>
      </Modal>

      <VAlert ref="valert"/>

        <Animated.View style={{opacity: this.state.fade_animation,}}>
          <KeyboardAvoidingView
            style={styles.sign_in_form}
            behavior={keyboardBehavior}
          >
            <Text style={styleguide.light_display2}>
              {this.state.page_text}
              <Text style={styleguide.light_display2_accent}>.</Text>
            </Text>
            <InputField
              icon={Icons.inbox}
              label={"email"}
              labelColor={"rgba(37,50,55,0.5)"}
              inactiveColor={GLOBAL.COLOR.DARKGRAY}
              activeColor={GLOBAL.COLOR.GREEN}
              topMargin={32}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
              autoCorrect={false}
              returnKeyType={'done'}
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
              autoCorrect={false}
              returnKeyType={'go'}
              onChangeText={(text) => {this.setState({password: text})}}
              onSubmitEditing={ () => {
                if(!this.state.sign_up){
                  this.signin();
                }
              }}
            />
            {pw_confirm_field}
          <TouchableOpacity onPress={() => {
              goTo(this.props.navigation, 'ForgotPassword');
            }}>
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
                backgroundColor={buttonColor}
                label={this.state.button_text}
                height={64}
                marginTop={40}
                shadowColor={buttonColor}
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
                styleguide.light_body,
                {
                  alignSelf: 'center',
                  marginTop: 32,
                }
              ]}>
                {signup_link_text}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Animated.View>
      </SafeAreaView>
    );
  }

}


const styles = StyleSheet.create({

 /*
  * Author: Elton C. Rego
  * Purpose: Styles the container for the login form
  */
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
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
  },

  // FOR PROTOTYPING
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 64,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: GLOBAL.COLOR.DARKGRAY,
  },

  /*
   * Style: Revi Animations
   * Author: Elton C. Rego
   * Purpose: This styles the Revis on each card
   */
  animations: {
    alignSelf: 'center',
    height: 128,
    width: 128,
  },

});
