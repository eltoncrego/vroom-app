/* Import all the necessary components for this page. Please delete components that aren't used. */

// Global Requirements
import React, {Component} from 'react';
GLOBAL = require('../../Globals');
styleguide = require('../../global-styles');

// Dependency Components
import {TouchableOpacity, View, StyleSheet, Text, Animated} from 'react-native';

/* * Class: Button
* Author: Elton C. Rego
* Purpose: Renders a styled button with the given properties
*
* @param: onPress, the callback function for when the button is tapped
* @param: backgroundColor, the backgroundColor of the button (and shadow)
* @param: label, the text displayed on the button
* @param: width, the inherent width of the button
* @param: height, the inherent height of the button
* @param: marginTop, the margin along the top of the button
*
* @function indicateError(): shakes the button and turns it red
*
* @return Button - the TouchableOpacity component itself */
export class Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      button_color: new Animated.Value(0),
      shake_animation: new Animated.Value(0)
    }
  }

  /*
   * Author: Elton C. Rego
   * Purpose: When called, shakes the button and turns it red
   */
  indicateError() {
    Animated.sequence([
      Animated.timing(this.state.button_color, {
        toValue: 1,
        duration: 150
      }),
      Animated.timing(this.state.shake_animation, {
        toValue: -8,
        duration: 50
      }),
      Animated.timing(this.state.shake_animation, {
        toValue: 8,
        duration: 50
      }),
      Animated.timing(this.state.shake_animation, {
        toValue: -8,
        duration: 50
      }),
      Animated.timing(this.state.shake_animation, {
        toValue: 8,
        duration: 50
      }),
      Animated.timing(this.state.shake_animation, {
        toValue: 0,
        duration: 50
      }),
      Animated.timing(this.state.button_color, {
        toValue: 0,
        duration: 150
      })
    ]).start();
  }

  render({
    onPress,
    backgroundColor,
    label,
    width,
    height,
    marginTop,
    shadow
  } = this.props) {

    var buttonColor = this.state.button_color.interpolate({
      inputRange: [
        0, 1
      ],
      outputRange: [backgroundColor, GLOBAL.COLOR.RED]
    });

    return (<Animated.View style={{
        transform: [
          {
            translateX: this.state.shake_animation
          }
        ],
        width: width,
        height: height,
        marginTop: marginTop
      }}>
      <TouchableOpacity style={styleguide.button_container} onPress={onPress}>
        <Animated.View style={[{
              width: '100%',
              height: '100%',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: buttonColor,
              shadowColor: shadow
                ? buttonColor
                : 'rgba(0,0,0,0)',
              shadowOpacity: 0.5,
              shadowOffset: {
                width: 4,
                height: 4
              },
              shadowRadius: 30
            }
          ]}>
          <Text style={stylesheet.dark_subheader2}>{label}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>);
  }
}
