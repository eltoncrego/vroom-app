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
  StatusBar,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import Animation from 'lottie-react-native';

// Files Needed
import Swiper from './../Custom/Swiper';
import revi_hi from '../../../assets/animations/revi-hi.json';
import revi_on from '../../../assets/animations/revi-on.json';
import revi_super_happy from '../../../assets/animations/revi-super-happy.json';

/*
 * Class: Onboarding
 * Author: Elton C.  Rego
 *
 * Purpose: Walks the user through naming their car and then
 *   takes in the make, model, and year of their vehicle.
 *
 * TODO: Create a Revi object
 * TODO: Animate a Revi object
 * TODO: Take in make, model, and year and end this screen
 */

export default class Onboarding extends Component {

  /*
   * Method: componentDidMount()
   * Author: Elton C. Rego
   *
   * Purpose: When a component specified sucessfully is rendered,
   *   it runs the action
   */
  componentDidMount() {
    console.log("Onboarding component mounted");
    this.animation_hi.play();
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
  render(){
    return (
      <Swiper>

       {/* First screen */}
        <View style={styles.slide}>
          <StatusBar
            barStyle="light-content"
          />
          <View style={[STYLE.card_focused, {height: '50%', width: '80%', justifyContent: 'space-between'}]}>
            <Text style={STYLE.title2_center}>Hello!</Text>
            <View style={STYLE.revi_animations}>
              <Animation
                ref={animation => {this.animation_hi = animation;}}
                style={{width: '100%', height: '100%',}}
                loop={false}
                source={revi_hi}
              />
            </View>
            <Text style={STYLE.subheader_center}>I'm your car!</Text>
          </View>
        </View>

      {/* Second screen */}
        <View style={styles.slide}>
          <StatusBar
            barStyle="light-content"
          />
          <View style={[STYLE.card_focused, {height: '50%', width: '80%', justifyContent: 'space-between'}]}>
            <Text style={STYLE.title2_center}>Hello!</Text>
            <View style={STYLE.revi_animations}>
              <Animation
                ref={animation => {this.animation_hi = animation;}}
                style={{width: '100%', height: '100%',}}
                loop={false}
                source={revi_hi}
              />
            </View>
            <Text style={STYLE.subheader_center}>I'm your car!</Text>
          </View>
        </View>

      </Swiper>
    );
  }
}

/*
 * Styles for this Page
 * Author: Elton C. Rego
 */
const styles = StyleSheet.create({

  /*
  * Author: Elton C. Rego
  * Styles the slides for onboarding
  */
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBAL.COLOR.DARKGRAY,
  },
});