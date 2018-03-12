/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
stylesheet = require('../../global-styles');

// Components
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

/*
* Class: InputField
* Author: Elton C. Rego
* Purpose: Creates and styles an input field that we can use throughout
*   the rest of our application.
*
* Props:
* autoFocus, a boolean value of whether or not the keyboard should open
*   on this field by default
* icon, the Icon from react-native-fontawesome that we'd like to show in
*   the left side of this input field
* label, the text that we'd like to show as a label for the input
* labelColor, the color of the label
* activeColor, the color that the field will turn when in focus
* inactiveColor, the color that the field will turn when blurred
* topMargin, the margin that separates this field from the items above
* autoCapitalize, wether or not the keyboard should autoCapitalize
* secureTextEntry, wether or not the phone should obscure the text inputted
* onChangeText, calls when the text value changes
* onSubmitEditing, calls when the user submits the text via the keyboard
* type, sets the keyboardType
* returnKeyType, sets the behaviour of the done button on the keyboard
* autoCorrect, whether or not the device should autocorrect the input
* value, what the value of the inputted text is
*/
export class InputField extends Component {

 /*
  * function: Constructor
  * Author: Elton C. Rego
  * Purpose: Set up state for this specific component
  */
  constructor() {
    super();
    this.borderColor = new Animated.Value(0);
  }

  /*
  * function: setActive()
  * Author: Elton C. Rego
  * Purpose: When called, sets the current color of the input to the active
  * color described by the props
  */
  setActive(){
    Animated.timing(
      this.borderColor,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.inout
      }
    ).start();
  }

  /*
  * function: setInactive()
  * Author: Elton C. Rego
  * Purpose: When called, sets the current color of the input to the insactiveColor
  * color described by the props
  */
  setInactive(){
    Animated.timing(
      this.borderColor,
      {
        toValue: 0,
        duration: 300,
        easing: Easing.inout
      }
    ).start();
  }

  /*
  * function: focus()
  * Author: Elton C. Rego
  * Purpose: When called, sets the focus on the current field
  */
  focus(){
    this.refs.input.focus();
  }

  render({
    autoFocus,
    icon,
    label,
    labelColor,
    activeColor,
    inactiveColor,
    topMargin,
    autoCapitalize,
    secureTextEntry,
    onChangeText,
    onSubmitEditing,
    type,
    returnKeyType,
    autoCorrect,
    value,
  } = this.props) {
    var a_color = this.borderColor.interpolate({
      inputRange: [0, 1],
      outputRange: [inactiveColor, activeColor]
    });
    return (
      <Animated.View style={[
          styles.container,
          {
            borderColor: a_color,
            marginTop: topMargin,
          }
        ]}>
        <View style={styles.ico_c}>
         <Animated.Text style={[styles.ico, {color: a_color}]}><FontAwesome>{icon}</FontAwesome></Animated.Text>
        </View>
        <TextInput
          ref="input"
          autoFocus={autoFocus}
          style={[
            stylesheet.light_body,
            styles.input,
            {color: inactiveColor,}
          ]}
          placeholder={label}
          placeholderTextColor={labelColor}
          keyboardType={type}
          selectionColor={activeColor}
          onFocus={
            () => this.setActive()
          }
          onBlur={
            () => this.setInactive()
          }
          underlineColorAndroid={'transparent'}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          returnKeyType={returnKeyType}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          autoCorrect={autoCorrect}
          value={value}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({

 /*
  * Author: Elton C. Rego
  * Purpose: Styles the container for the login form
  */
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  ico_c:{
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ico: {
    fontSize: 24,
  },
  input:{
    height: 48,
    width: '80%',
    padding: 0,
  },

});
