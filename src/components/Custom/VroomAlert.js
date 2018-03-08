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


/*
* Class: VroomAlert
* Author: Elton C. Rego
* Purspoe: Creates and styles a custom alert for our app that fits the
*   feel of the rest of the app
*
* Props:
*
*/
export default class VroomAlert extends Component {

 /*
  * Author: Elton C. Rego
  * Purpose: Set up state for this specific component
  */
  constructor(props) {
    super(props);
    this.state = {
      translation: new Animated.Value(0),
      alertColor: GLOBAL.COLOR.RED,
      alertTitle: "Alert",
      alertText: "Something is wrong",
      buttonText: "OK",
    };
  }

  /*
  * Function: showAlert()
  * Author: Elton C. Rego
  * Purpose: Shows the custom alert at zIndex of 50 when called by a
  *   specific reference
  *
  * @param alertTitle["Alert"] sets the desired title of the alert
  * @param alertText["Something is wrong"] sets the desired body of the alert
  * @param buttonText["OK"] sets the text of the dismiss button
  * @param alertColor[GLOBAL.COLOR.RED] sets the desired color of the alert
  * @param timeoutValue[indefinite] sets the amount of time nesessary for
  *   the alert to automatically dismiss itself
  */
  showAlert(alertTitle, alertText, buttonText, alertColor, timeoutValue){
    this.setState({
      alertTitle: alertTitle,
      alertText: alertText,
      buttonText: buttonText,
      alertColor: alertColor == null ? GLOBAL.COLOR.RED : alertColor,
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

  /*
  * Function: dismissAlert()
  * Author: Elton C. Rego
  * Purpose: Hides the alert. Can be called internally or externally.
  */
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
          backgroundColor: this.state.alertColor,
          shadowColor: this.state.alertColor,
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
    zIndex: 500,
    padding: 16,
    paddingTop: 48+32,
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
