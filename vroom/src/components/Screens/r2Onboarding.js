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
    this.animation.play();
  }

  render() {
    return (
      <View style={[STYLE.container, styles.onboarding_container]}>
        <StatusBar barStyle="light-content"/>
        <View style={[STYLE.card_focused, styles.onboarding_card]}>
          <Text style={STYLE.light_title2_center}>Hello!</Text>
          <View style={styles.onboarding_animations}>
            <Animation
              ref={animation => {this.animation = animation;}}
              style={{width: '100%', height: '100%',}}
              loop={false}
              source={revi}
            />
          </View>
          <Text style={STYLE.light_subheader_center}>I'm your car</Text>
        </View>
        <TouchableOpacity style={[STYLE.button_container, 
          {
            backgroundColor: GLOBAL.COLOR.GREEN,
            width: 224,
            marginTop: 32,
          }
        ]}>
          <Text style={STYLE.green_button_text}>next</Text>
        </TouchableOpacity>
      </View>
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