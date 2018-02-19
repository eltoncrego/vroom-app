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
} from 'react-native';
import {Icons} from 'react-native-fontawesome';
import {InputField} from './../Custom/InputField'
import {Button} from './../Custom/Button';

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
   * Method: render
   * Author: Elton C. Rego
   *
   * Purpose: Renders the onboarding page.
   *  There are three current cards with information about how
   *  to name your car
   *
   */
  render() {

    var keyboardBehavior = Platform.OS === 'ios' ? "padding" : null;

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
          <Text style={styleguide.light_headline_secondary}>To get started, let us know how many miles are on your car.</Text>
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
            onChangeText={(text) => {}}
            onSubmitEditing={ () => {}}
          />
          <Button
           backgroundColor={GLOBAL.COLOR.GREEN}
           label={"Lets Go!"}
           height={64}
           marginTop={40}
           shadowColor={GLOBAL.COLOR.GREEN}
           onPress={()=>{}}
         />
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
