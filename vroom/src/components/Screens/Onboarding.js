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
  Keyboard,
  Animated,
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
       button_color: new Animated.Value(0),
       userODO: null,
       shake_animation: new Animated.Value(0),
     };
   }

   submitOnboardingODO(){

     if(this.state.userODO != null || !isNaN(this.state.user_ODO)){
       initUser(this.state.userODO);
       goTo(this.props.navigation, 'Dashboard');
     } else if (this.state.userODO < 0){
       this.shakeButton();
       Alert.alert(
         'Where did you get your car?',
         'I want a car that loses miles...',
         [
           {text: 'Let me try again', onPress: () => {
             Animated.timing(this.state.button_color, {
               toValue: 0,
               duration: 150,
             }).start();
           }},
         ],
       )
     } else {
       this.shakeButton();
       Alert.alert(
         'Hold up!',
         'You didn\'t enter anything!',
         [
           {text: 'Let me try again', onPress: () => {
             Animated.timing(this.state.button_color, {
               toValue: 0,
               duration: 150,
             }).start();
           }},
         ],
       )
     }
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
      ]).start();
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

    var buttonColor = this.state.button_color.interpolate({
      inputRange: [0, 1],
      outputRange: [GLOBAL.COLOR.GREEN, GLOBAL.COLOR.RED]
    });

    return(
      <SafeAreaView style={[
        styleguide.container,
        styles.container,
      ]}>
        <KeyboardAvoidingView
          style={styles.onboarding_form}
          behavior={keyboardBehavior}
        >
          <Text style={styleguide.light_headline2}>
            Welcome
            <Text style={styleguide.light_headline2_accent}>.</Text>
          </Text>
          <Text
            style={styleguide.light_title_secondary}>To get started, let us know how many miles are on your car.</Text>
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
          />
          <Animated.View
            style={
            {
              transform: [{translateX: this.state.shake_animation}]
            }}>
            <Button
               backgroundColor={buttonColor}
               label={"lets go!"}
               height={64}
               marginTop={40}
               shadowColor={buttonColor}
               onPress={() => {this.submitOnboardingODO()}}/>
          </Animated.View>
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
    alignItems: 'flex-start',
  },
  onboarding_form: {
    margin: 32,
  },
});
