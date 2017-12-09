// Global Requirements
import React, {Component,} from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

// React and External Components
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Animation from 'lottie-react-native';

// Files Needed
import revi from '../../../assets/animations/revi-hi.json';
import revi_on from '../../../assets/animations/revi-on.json';
import revi_super_happy from '../../../assets/animations/revi-super-happy.json';

import Swiper from '../Navigation/Swiper';

class Screens extends Component {

  /*
   * Method: componentDidMount()
   * Author: Elton C. Rego
   *
   * Purpose: When a component specified sucessfully is rendered,
   *   it runs the action
   */
  componentDidMount() {
    console.log("Onboarding screens component mounted");
    //this.animation.play();
  }

  render() {
    return (
      <Swiper>
        {/* First screen */}
        <View style={[styles.slide, { backgroundColor: '#C04DEE' }]}>
          <Text style={STYLE.light_title2_center}>EAT</Text>
          <Text style={STYLE.light_subheader_center}>Good nutrition is an important part of leading a healthy lifestyle</Text>
        </View>
        {/* Second screen */}
        <View style={[styles.slide, { backgroundColor: '#4AAFEE' }]}>
          <Text style={STYLE.light_title2_center}>PRAY</Text>
          <Text style={STYLE.light_subheader_center}>Prayer is one of the most important things a Christian can do</Text>
        </View>
        {/* Third screen */}
        <View style={[styles.slide, { backgroundColor: '#FC515B' }]}>
          <Text style={STYLE.light_title2_center}>LOVE</Text>
          <Text style={STYLE.light_subheader_center}>Where there is love there is life</Text>
        </View>
      </Swiper>
    );
  }
}

/*
 * Class: Onboarding
 * Author: Elton C.  Rego
 *
 * Purpose: Welcome users to the application
 */
export default class Onboarding extends Component{

 /*
  * Static: navigationOptions
  * Author: Elton C. Rego
  *
  * Purpose: To set the navigation bar options for this page
  */
  static navigationOptions = {
    title: 'Welcome',
    header: null,
    lockMode: 'locked-closed',
  };
 
 /*
  * Author: Elton C. Rego
  * Purpose: render the onboarding component
  */
  render() {
    return (
      <Screens/>
    );
  }

}

/*
 * Styles for this Page
 * Author: Elton C. Rego
 */
const styles = StyleSheet.create({

 /*
  * Style: Button
  * Author: Elton C. Rego
  * Purpose: This styles the onboarding_container on top of default
  */
  onboarding_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  onboarding_card: {
    height: 440,
    width: 288,
    padding: 32,
    justifyContent: 'space-between',
  },

 /*
  * Style: Onboarding Animations
  * Author: Elton C. Rego
  * Purpose: This styles the Revis on each card
  */
  onboarding_animations: {
    alignSelf: 'center',
    height: 256,
    width: 256,
    margin: -32,
  },

});