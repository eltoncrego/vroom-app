/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
styleguide = require('../../global-styles');

// Components
import {
  SafeAreaView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
  Keyboard
} from 'react-native';
import {Icons} from 'react-native-fontawesome';
import {InputField} from './../Custom/InputField'
import {Button} from './../Custom/Button';
import { goTo, clearNavStack } from '../Navigation/Navigation';

import {
  initUser,
} from '../Database/Database.js';

/*
 * Class: Onboarding
 * Author: Elton C.  Rego
 *
 * Purpose: Walks the user through naming their car and then
 *   takes in the make, model, and year of their vehicle.
 *
 */

export default class Onboarding extends Component {

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
       userODO: null,
     };
   }

   submitOnboardingODO(){
     
     if(this.state.userODO != null || !isNaN(this.state.user_ODO)){
       initUser(this.state.userODO);
       goTo(this.props.navigation, 'Dashboard');
     } else if (this.state.userODO < 0){
       Alert.alert(
         'Where did you get your car?',
         'I want a car that loses miles...',
         [
           {text: 'Let me try again'},
         ],
       )
     } else {
       Alert.alert(
         'Hold up!',
         'You didn\'t enter anything!',
         [
           {text: 'Let me try again'},
         ],
       )
     }
   }



  /*
   * Method: render
   * Author: Elton C. Rego
   *
   * Purpose: Renders the onboarding page.
   *  There are three current cards with information about how
   *  to name your car
   *
   */
  render() {

    var keyboardBehavior = Platform.OS === 'ios' ? "position" : null;

    return(
      <SafeAreaView style={[
        styleguide.container,
        styles.container,
      ]}>
        <KeyboardAvoidingView
          style={styles.sign_in_form}
          behavior={keyboardBehavior}
        >
          <Text style={styleguide.light_display2}>
            Welcome
            <Text style={styleguide.light_display2_accent}>.</Text>
          </Text>
          <Text
            style={styleguide.light_headline_secondary}>To get started, let us know how many miles are on your car.</Text>
          <InputField
            icon={Icons.mapO}
            label={"Odometer Reading"}
            labelColor={"rgba(37,50,55,0.5)"}
            inactiveColor={GLOBAL.COLOR.DARKGRAY}
            activeColor={GLOBAL.COLOR.GREEN}
            topMargin={24}
            autoCapitalize={"none"}
            type={"numeric"}
            secureTextEntry={false}
            autoCorrect={false}
            returnKeyType={'done'}
            onChangeText={(text) => {this.setState({
              userODO: text,
            })}}
            onSubmitEditing={() => {this.submitOnboardingODO()}}
          />
          <Button
             backgroundColor={GLOBAL.COLOR.GREEN}
             label={"Lets Go!"}
             height={64}
             marginTop={40}
             shadowColor={GLOBAL.COLOR.GREEN}
             onPress={() => {this.submitOnboardingODO()}}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GLOBAL.COLOR.WHITE,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sign_in_form: {
    margin: 32,
  },
});
