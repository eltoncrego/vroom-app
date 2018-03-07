// Global Requirements
import React, {Component,} from 'react';
GLOBAL = require('../../Globals');
styleguide = require('../../global-styles');

// React Components
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  Platform,
  Keyboard,
} from 'react-native';
import {Icons} from 'react-native-fontawesome';
import Animation from 'lottie-react-native';

// Our Custom Components
import Auth from '../Authentication/Auth';
import { goTo } from '../Navigation/Navigation';
import {initUser} from '../Database/Database';
import {InputField} from './../Custom/InputField';
import {Button} from './../Custom/Button';
import VAlert from './../Custom/VAlert';
import Loading from './../Screens/Loading';

import loader_icon from '../../../assets/animations/loading.json';

/*
* Class: Button
* Author: Elton C. Rego
* Purpose: Renders a styled button with the given properties
*
* @function: componentDidMount() - sets up the component
* @function: toggleSignUp() - call when you want to switch the state from
*   sign up to sign in and vice versa
* @function: signin() - asynchronous call to firebase sign in, verifies if
*   the data is inputted correctly
* @function: - asynchronous call to firebase sign up, verifies if
*   the data is inputted correctly
* @function: openModal() - opens the modal for indicating Loading
* @function: closeModal() - closes the modal for indicating loaded
*
* @return Login: the view for sign up and sign in screens
*/
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
      // State Variable
      sign_up: true,
      page_text: "Sign up",
      button_text: "sign up!",
      email: null,
      password: null,
      password_verification: null,

      // Modal toggle
      modalVisible: false,

      // Animation Values
      fade_animation: new Animated.Value(0),
      keyboardHeight: new Animated.Value(0),
      pageTextSize: new Animated.Value(50),
      formMargin: new Animated.Value(24),
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
   * Purpose: sets event listeners for the keyboard
   */
   componentWillMount () {
     this.keyboardWillShowSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', this.keyboardWillShow);
     this.keyboardWillHideSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', this.keyboardWillHide);
   }

   componentWillUnmount() {
     this.keyboardWillShowSub.remove();
     this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    if(Platform.OS === 'ios'){
      var end = (event.endCoordinates.height-128)/2;
      Animated.parallel([
        Animated.timing(this.state.keyboardHeight, {
          duration: event.duration,
          toValue: end,
        }),
        Animated.timing(this.state.pageTextSize, {
          duration: event.duration,
          toValue: 35,
        }),
        Animated.timing(this.state.formMargin, {
          duration: event.duration,
          toValue: 8,
        }),
      ]).start();
    } else {
      var end = (event.endCoordinates.height-128)/2;
      Animated.parallel([
        Animated.timing(this.state.keyboardHeight, {
          duration: 200,
          toValue: end,
        }),
        Animated.timing(this.state.pageTextSize, {
          duration: 200,
          toValue: 35,
        }),
        Animated.timing(this.state.formMargin, {
          duration: 200,
          toValue: 8,
        }),
      ]).start();
    }
  };

  keyboardWillHide = (event) => {
    if(Platform.OS === 'ios'){
      Animated.parallel([
        Animated.timing(this.state.keyboardHeight, {
          duration: event.duration,
          toValue: 0,
        }),
        Animated.timing(this.state.pageTextSize, {
          duration: event.duration,
          toValue: 50,
        }),
        Animated.timing(this.state.formMargin, {
          duration: event.duration,
          toValue: 24,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(this.state.keyboardHeight, {
          duration: 200,
          toValue: 0,
        }),
        Animated.timing(this.state.pageTextSize, {
          duration: 200,
          toValue: 50,
        }),
        Animated.timing(this.state.formMargin, {
          duration: 200,
          toValue: 24,
        }),
      ]).start();
    }
  };

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
  * Author: Alec Felt, Connick Shields
  * Purpose: Checks state.email and state.password and
  *          authenticates the user with Firebase
  */
  signin = () => {
    if((!this.state.email)){
      this.refs.submitButton.indicateError();
      this.refs.valert.showAlert('Woah there!',
      'You can\'t log in with an empty email!',
      'I understand');
      return;
    }
    if((!this.state.password)){
      this.refs.submitButton.indicateError();
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
      this.refs.submitButton.indicateError();
      this.refs.valert.showAlert('Now wait just a second!',
      'You can\'t sign up with an empty email!',
      'I understand');
      return;
    }
    if((!this.state.password)){
      this.refs.submitButton.indicateError();
      this.refs.valert.showAlert('Hold up!',
      'You can\'t sign up with an empty password!',
      'I understand');
      return;
    }
    if(this.state.password != this.state.password_verification){
      this.refs.submitButton.indicateError();
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
          ref="password2"
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
          onSubmitEditing={() => this.signup()}
        />: null ;

   /*
    * Author: Elton C. Rego
    * Purpose: Checks if it's a sign_up instance vs sign_in instance
    *   and toggles the sign up link text as such
    */
    var signup_link_text = this.state.sign_up ?
      "have an account with us? sign in!"
      : "don't have an account? sign up!" ;

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

        <Animated.View style={[styles.sign_in_form, {opacity: this.state.fade_animation, paddingBottom: this.state.keyboardHeight}]}>
          <Animated.Text style={[styleguide.light_display2, {fontSize: this.state.pageTextSize}]}>
            {this.state.page_text}
            <Animated.Text style={[styleguide.light_display2_accent, {fontSize: this.state.pageTextSize}]}>.</Animated.Text>
          </Animated.Text>
            <InputField
              icon={Icons.inbox}
              label={"email"}
              labelColor={"rgba(37,50,55,0.5)"}
              inactiveColor={GLOBAL.COLOR.DARKGRAY}
              activeColor={GLOBAL.COLOR.GREEN}
              topMargin={this.state.formMargin}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
              autoCorrect={false}
              returnKeyType={'next'}
              onChangeText={(text) => {this.setState({email: text})}}
              onSubmitEditing={ () => {
                this.refs.password1.focus();
              }}
            />
            <InputField
              ref="password1"
              icon={Icons.lock}
              label={"password"}
              labelColor={"rgba(37,50,55,0.5)"}
              inactiveColor={GLOBAL.COLOR.DARKGRAY}
              activeColor={GLOBAL.COLOR.GREEN}
              topMargin={24}
              autoCapitalize={"none"}
              secureTextEntry={true}
              autoCorrect={false}
              returnKeyType={this.state.sign_up? 'next' : 'go'}
              onChangeText={(text) => {this.setState({password: text})}}
              onSubmitEditing={ () => {
                if(!this.state.sign_up){
                  this.signin();
                } else {
                  this.refs.password2.focus();
                }
              }}
            />
            {pw_confirm_field}
            <TouchableOpacity onPress={() => {
                goTo(this.props.navigation, 'ForgotPassword');
              }}>
                <Text
                  style={[
                    styleguide.light_body,
                    styles.forgot_password_text
                  ]}
                >forgot password?</Text>
            </TouchableOpacity>
         <Button
          ref="submitButton"
          backgroundColor={GLOBAL.COLOR.GREEN}
          label={this.state.button_text}
          height={64}
          marginTop={40}
          shadow={true}
          onPress={()=>{
            if(this.state.sign_up){
              this.signup();
            } else {
              this.signin();
            }
          }}/>
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
