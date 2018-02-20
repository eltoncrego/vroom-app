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
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class VAlert extends Component {
 /*
  * Author: Elton C. Rego
  * Purpose: Set up state for this specific component
  */
  constructor(props) {
    super(props);
    this.state = {
      translation: new Animated.Value(0),
      alertTitle: "Alert",
      alertText: "Something is wrong",
      buttonText: "Ok",
    };
  }

  showAlert(alertTitle, alertText, buttonText, timeoutValue){
    this.setState({
      alertTitle: alertTitle,
      alertText: alertText,
      buttonText: buttonText,
    });
    Animated.spring(
      this.state.translation,
      {
        toValue: 1,
        friction: 6,
      }
    ).start();
    if (timeoutValue != null){
      var that = this;
      setTimeout(function(){ that.dismissAlert(); }, timeoutValue);
    }
  }

  dismissAlert(){
    Animated.spring(
      this.state.translation,
      {
        toValue: 0,
        friction: 3,
      }
    ).start();
  }

  render(){

    var alertShift = this.state.translation.interpolate({
      inputRange: [0, 1],
      outputRange: [-350, -32]
    });

    return (
      <Animated.View style={[styles.main_container,
        {
          transform: [{translateY: alertShift}]
        }]}>
        <Text style={styleguide.dark_subheader2}>{this.state.alertTitle}</Text>
        <Text style={styleguide.dark_body}>{this.state.alertText}</Text>
        <TouchableOpacity onPress={() => this.dismissAlert()}>
          <View style={styles.button}>
            <Text style={styleguide.dark_body2}>{this.state.buttonText}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 50,
    padding: 16,
    paddingTop: 48+32,
    backgroundColor: GLOBAL.COLOR.RED,
    shadowColor: GLOBAL.COLOR.RED,
    shadowOpacity: 0.5,
    shadowOffset: {width: 4, height: 4},
    shadowRadius: 30,
  },
  button: {
    width: '100%',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: 'rgba(37,50,55,0.20)'
  }
});
