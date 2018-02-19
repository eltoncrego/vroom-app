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
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Animated,
} from 'react-native';
import Animation from 'lottie-react-native';

export class Button extends Component {
  render({
    onPress,
    backgroundColor,
    label,
    width,
    height,
    marginTop,
    shadowColor,
  } = this.props) {
  return (
    <TouchableOpacity 
      style={[
      styleguide.button_container,
      {
        width: width,
        height: height,
        marginTop: marginTop,
      }]}
    onPress={onPress}>
      <Animated.View style={
        [
          {
            width: '100%',
            height: '100%',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backgroundColor,
            shadowColor: shadowColor,
            shadowOpacity: 0.5,
            shadowOffset: {width: 4, height: 4},
            shadowRadius: 30,
          },
        ]}>
      <Text style={stylesheet.dark_subheader2}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
  }
}
