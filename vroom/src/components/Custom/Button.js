/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

// Components
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import Animation from 'lottie-react-native';

export default class Button extends Component {
  render({onPress, backgroundColor, label, width, height, marginTop} = this.props) {
  return (
    <TouchableOpacity style={
      [
        STYLE.button_container,
        {
          backgroundColor: backgroundColor,
          width: width,
          height: height,
          marginTop: marginTop,
        },
      ]}
      onPress={onPress}>
      <Text style={STYLE.green_button_text}>{label}</Text>
    </TouchableOpacity>
  );
  }
}