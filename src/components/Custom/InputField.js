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
  Text,
  Image,
  TextInput,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export class InputField extends Component {

 /*
  * Author: Elton C. Rego
  * Purpose: Set up state for this specific component
  */
  constructor() {
    super();
    this.borderColor = new Animated.Value(0);
  }

  /*
  * Author: Elton C. Rego
  * Purpose: When called, shakes the button
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
          returnKeyType={ this.props.returnKeyType }
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          autoCorrect={this.props.autoCorrect}
          value={this.props.value}
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
