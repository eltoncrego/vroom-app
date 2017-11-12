/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');

// Components
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { goTo } from "../Navigation/Navigation";

// Files Needed
import FadeImage from 'react-native-fade-image';
import Onboarding from './Onboarding';
import EmailPasswordLogin from './EmailPasswordLogin';

/*
 * Class: FadeInView
 * Author: Elton C. Rego
 *
 * Purpose: Creates a special animateable object for Fading in
 */
export class FadeInView extends Component {

  /*
   * state:
   * Author: Elton C. Rego
   *
   * Purpose: Sets the initial opacity of a fade in component to 0
   */
  state = {
    fadeAnim: new Animated.Value(0),
  }

  /*
   * Method: componentDidMount()
   * Author: Elton C. Rego
   *
   * Purpose: Sets the current state to an opacity of 1 over
   *   a duration of 1000ms
   *
   * Warning: Do not change name!
   */
  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();
  }

  /*
   * Method: render
   * Author: Elton C. Rego
   *
   * Purpose: Creates the fade in animation on render
   *
   */
  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

/*
 * Class: Login
 * Author: Connick Shields and Elton C.  Rego
 *
 * Purpose: The Login class will render the application's
 *   Login screen.
 *
 * TODO: Impliment the next screen as being an actual log
 *   in with Google screen.
 */
export default class Login extends Component {

  /*
   * Static: navigationOptions
   * Author: Elton C. Rego
   *
   * Purpose: To set the navigation bar options for this page
   */
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

  /*
   * Method: render
   * Author: Connick Shields
   *
   * Purpose: Renders the Login Page.
   *  The login page has a Revi character, the text logo
   *  and a login with Google button.
   *
   */
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
         barStyle="light-content"
       />
        <FadeInView style={styles.header}>
          <Text style={styles.vroom}>vroom</Text>
          <Text style={styles.tag_line}>The app that keeps your car happy!</Text>
	      </FadeInView>
        <View style={styles.login}>
        <TouchableOpacity activeOpacity={0.8}
    	    onPress={
    		    () => { goTo(this.props.navigation, 'EmailPasswordLogin'); }
    	    }>
          <FadeImage
            source={require('../../../assets/img/google_signin.png')}
            resizeMode='contain'
            duration={1500}
          />
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/*
 * Styles for this Page
 * Author: Connick Shields
 *
 */
const styles = StyleSheet.create({

  /*
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the card titles on this page
   */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBAL.COLOR.DARKGRAY,
  },
  /*
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the header part of this page
   */
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  /*
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the title page of the app
   */
  vroom: {
    fontFamily: 'Nunito',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 80,
    color: GLOBAL.COLOR.GREEN,
    marginBottom: -20
  },
  /*
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the tagline of the application
   */
  tag_line: {
    fontFamily: 'Nunito',
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 20
  },
});
