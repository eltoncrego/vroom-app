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
  Keyboard,
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
       keyboardHeight: new Animated.Value(0),
       pageTextSize: new Animated.Value(25),
       pageDescriptionSize: new Animated.Value(20),
       topMargin: new Animated.Value(24),
     };
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
           toValue: 20,
         }),
         Animated.timing(this.state.pageDescriptionSize, {
           duration: event.duration,
           toValue: 15,
         }),
         Animated.timing(this.state.topMargin, {
           duration: 200,
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
           toValue: 20,
         }),
         Animated.timing(this.state.pageDescriptionSize, {
           duration: 200,
           toValue: 15,
         }),
         Animated.timing(this.state.topMargin, {
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
           toValue: 25,
         }),
         Animated.timing(this.state.pageDescriptionSize, {
           duration: event.duration,
           toValue: 20,
         }),
         Animated.timing(this.state.topMargin, {
           duration: 200,
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
           toValue: 25,
         }),
         Animated.timing(this.state.pageDescriptionSize, {
           duration: 200,
           toValue: 20,
         }),
         Animated.timing(this.state.topMargin, {
           duration: 200,
           toValue: 24,
         }),
       ]).start();
     }
   };

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
         <Animated.View style={[styles.content, {paddingBottom: this.state.keyboardHeight}]}>
           <Animated.Text style={[styleguide.light_title2, {fontSize: this.state.pageTextSize}]}>
             Password Reset
             <Animated.Text style={[styleguide.light_title2_accent, {fontSize: this.state.pageTextSize}]}>.</Animated.Text>
           </Animated.Text>
           <Animated.Text
             style={[styleguide.light_subheader_secondary, {fontSize: this.state.pageDescriptionSize}]}>
             To reset your password, please enter the email address associated with your account.
           </Animated.Text>
           <InputField
             icon={Icons.inbox}
             label={"email"}
             labelColor={"rgba(37,50,55,0.5)"}
             inactiveColor={GLOBAL.COLOR.DARKGRAY}
             activeColor={GLOBAL.COLOR.GREEN}
             topMargin={this.state.topMargin}
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
            shadow={true}
            onPress={() => {this.passwordReset();}}/>
        </Animated.View>
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
    marginHorizontal: 32,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
