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
  Alert,
  Animated,
  Platform,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

// Our Components
import Auth from '../Authentication/Auth';
import { goTo, goBack } from '../Navigation/Navigation';
import {InputField} from './../Custom/InputField';
import {Button} from './../Custom/Button';
import VAlert from './../Custom/VAlert';

/*
 * Class: ForgotPassword
 * Author: Elton C.  Rego
 *
 * Purpose: Walks the user through the process of resetting their
 *    password.
 *
 */

export default class ForgotPassword extends Component {

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
       email: "",
     };
   }

   /*
    * Author: Payam Katoozian
    * Purpose: allow resetting of password
    */
    passwordReset = () => {
      if(!this.state.email){
        this.refs.linkButton.indicateError();
        this.refs.valert.showAlert('No email entered',
        'Simply enter your email address and try again!',
        'Ok');
      } else {
        var that = this;
        Auth.firebasePasswordReset(this.state.email).then(function(){
          that.refs.linkButton.indicateError();
          that.refs.valert.showAlert('Password Reset Request Received',
          'Please check your email',
          'I\'ll go check!', GLOBAL.COLOR.GREEN);
        }).catch(function(error){
          that.refs.linkButton.indicateError();
          that.refs.valert.showAlert("Alert",
          error.message,
          'Ok');
        });
      }
    }

   render() {

     var keyboardBehavior = Platform.OS === 'ios' ? "position" : null;

     return(
       <SafeAreaView style={[
           styleguide.container,
         {
           backgroundColor: GLOBAL.COLOR.WHITE,
         }]}>
         <VAlert ref="valert"/>
         <View style={styles.navbar}>
           <TouchableOpacity onPress={() => {goBack(this.props.navigation)}}>
             <Animated.View>
                 <Text style={styleguide.light_title}>
                   <FontAwesome>{Icons.chevronLeft}</FontAwesome>
                 </Text>
             </Animated.View>
           </TouchableOpacity>
         </View>
         <KeyboardAvoidingView
           style={styles.content}
           behavior={"padding"}
         >
           <Text style={styleguide.light_headline2}>
             Forgot Password
             <Text style={styleguide.light_headline2_accent}>.</Text>
           </Text>
           <Text
             style={styleguide.light_title_secondary}>
             To reset your password, please enter the email address associated with your account.
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
             onChangeText={(text) => {this.setState({email: text})}}
           />
         <Button
            ref="linkButton"
            backgroundColor={GLOBAL.COLOR.GREEN}
            label={"send me a link"}
            height={64}
            marginTop={40}
            width={'100%'}
            onPress={() => {this.passwordReset();}}/>
         </KeyboardAvoidingView>
       </SafeAreaView>
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
    margin: 32,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
