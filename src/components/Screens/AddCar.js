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
  SafeAreaView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
  Animated,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

// Our Components
import Auth from '../Authentication/Auth';
import {InputField} from './../Custom/InputField'
import {Button} from './../Custom/Button';
import { goTo, goBack } from '../Navigation/Navigation';
import VroomAlert from './../Custom/VroomAlert';

import { initUser, addCar } from '../Database/Database.js';

/*
 * Class: Onboarding
 * Author: Elton C.  Rego
 *
 * Purpose: Walks the user through naming their car and then
 *   takes in the make, model, and year of their vehicle.
 *
 */

export default class AddCar extends Component {

  /*
   * Method: Constructor
   * Author: Elton C. Rego
   *
   * Purpose: Constructs the class with given props
   *
   * @param: properties
   */
  constructor(props) {
    super(props);
    this.state = {
      userODO: null,
      keyboardHeight: new Animated.Value(0),
      pageTextSize: new Animated.Value(25),
      pageDescriptionSize: new Animated.Value(20),
      topMargin: new Animated.Value(24),
    };
  }

  /*
  * Function: componentDidMount()
  * Author: Elton C. Rego
  * Purpose: nothing right now
  */
  componentDidMount() {
  }

 /*
  * Function: componentWillMount
  * Author: Elton C. Rego
  * Purpose: sets event listeners for the keyboard
  */
  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', this.keyboardWillHide);
  }

  /*
  * Function: componentWillUnmount
  * Author: Elton C. Rego
  * Purpose: sets event listeners for the keyboard
  */
  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  /*
  * Event Listener: keyboardWillShow
  * Author: Elton C. Rego
  * Purpose: called when the keyboard shows and scales the elements on
  *   the page in order to account for the new keyboard
  */
  keyboardWillShow = (event) => {
     if(Platform.OS === 'ios'){
       var end = (event.endCoordinates.height-128)/2;
       Animated.parallel([
         Animated.timing(this.state.keyboardHeight, {
           duration: event.duration,
           toValue: end,
         }),
         Animated.timing(this.state.pageTextSize, {
           duration: event.duration,
           toValue: 20,
         }),
         Animated.timing(this.state.pageDescriptionSize, {
           duration: event.duration,
           toValue: 15,
         }),
         Animated.timing(this.state.topMargin, {
           duration: 200,
           toValue: 8,
         }),
       ]).start();
     } else {
       var end = (event.endCoordinates.height-128)/2;
       Animated.parallel([
         Animated.timing(this.state.keyboardHeight, {
           duration: 200,
           toValue: end,
         }),
         Animated.timing(this.state.pageTextSize, {
           duration: 200,
           toValue: 20,
         }),
         Animated.timing(this.state.pageDescriptionSize, {
           duration: 200,
           toValue: 15,
         }),
         Animated.timing(this.state.topMargin, {
           duration: 200,
           toValue: 8,
         }),
       ]).start();
     }
  };

  /*
  * Event Listener: keyboardWillHide
  * Author: Elton C. Rego
  * Purpose: called when the keyboard hides and scales the elements on
  *   the page in order to account for the lack of keyboard
  */
  keyboardWillHide = (event) => {
     if(Platform.OS === 'ios'){
       Animated.parallel([
         Animated.timing(this.state.keyboardHeight, {
           duration: event.duration,
           toValue: 0,
         }),
         Animated.timing(this.state.pageTextSize, {
           duration: event.duration,
           toValue: 25,
         }),
         Animated.timing(this.state.pageDescriptionSize, {
           duration: event.duration,
           toValue: 20,
         }),
         Animated.timing(this.state.topMargin, {
           duration: 200,
           toValue: 24,
         }),
       ]).start();
     } else {
       Animated.parallel([
         Animated.timing(this.state.keyboardHeight, {
           duration: 200,
           toValue: 0,
         }),
         Animated.timing(this.state.pageTextSize, {
           duration: 200,
           toValue: 25,
         }),
         Animated.timing(this.state.pageDescriptionSize, {
           duration: 200,
           toValue: 20,
         }),
         Animated.timing(this.state.topMargin, {
           duration: 200,
           toValue: 24,
         }),
       ]).start();
     }
  };

   /*
    * Method: submitOnboardingODO
    * Author: Elton C. Rego
    *
    * Purpose: take the number from the InputField and pushes it to
    *   firebase after a series of input checks
    */
   submitOnboardingODO(){
     if(this.state.userODO != null || !isNaN(this.state.user_ODO)){
       var finalODOInput = this.state.userODO;
       finalODOInput = finalODOInput.replace(/\,/g,'');
       finalODOInput = parseFloat(finalODOInput, 10);
       addCar(finalODOInput);
       goBack(this.props.navigation);
     } else if (this.state.userODO < 0){
       this.refs.submitButton.indicateError();
       this.refs.vroomAlert.showAlert('Where did you get your car?',
       'An odometer cannot read negative miles unless it is damaged.',
       'Ok');
     } else {
       this.refs.submitButton.indicateError();
       this.refs.vroomAlert.showAlert('Hold up!',
       'You didn\'t enter anything!',
       'Let me try again');
     }
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
  render() {

    var keyboardBehavior = Platform.OS === 'ios' ? "position" : null;

    return(
      <SafeAreaView style={[
        styleguide.container,
        styles.container,
      ]}>
      <VroomAlert ref="vroomAlert"/>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => {goBack(this.props.navigation);}}>
          <Animated.View>
              <Text style={styleguide.light_subheader}>
                <FontAwesome>{Icons.times}</FontAwesome> Cancel
              </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Animated.View style={[styles.onboarding_form, {paddingBottom: this.state.keyboardHeight}]}>
          <Animated.Text style={[styleguide.light_headline2, {fontSize: this.state.pageTextSize}]}>
            Add a new car
            <Animated.Text style={[styleguide.light_headline2_accent, {fontSize: this.state.pageTextSize}]}>.</Animated.Text>
          </Animated.Text>
          <Animated.Text
            style={[styleguide.light_title_secondary, {fontSize: this.state.pageDescriptionSize}]}>We just need to know the mileage.</Animated.Text>
          <InputField
            icon={Icons.mapO}
            label={"Odometer Reading"}
            labelColor={"rgba(37,50,55,0.5)"}
            inactiveColor={GLOBAL.COLOR.DARKGRAY}
            activeColor={GLOBAL.COLOR.GREEN}
            topMargin={this.state.topMargin}
            autoCapitalize={"none"}
            type={"numeric"}
            secureTextEntry={false}
            autoCorrect={false}
            returnKeyType={'done'}
            onChangeText={(text) => {this.setState({
              userODO: text,
            })}}
          />
          <Button
             ref="submitButton"
             backgroundColor={GLOBAL.COLOR.GREEN}
             label={"lets go!"}
             height={64}
             marginTop={40}
             shadow={true}
             onPress={() => {this.submitOnboardingODO()}}/>
         </Animated.View>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: GLOBAL.COLOR.WHITE,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  navbar: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  content: {
    flex: 10,
    marginHorizontal: 32,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

});
