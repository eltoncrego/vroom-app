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
  View,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing
} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {InputField} from './../Custom/InputField'
import SwipeableList from "./../Custom/SwipeableList";


/*
 * Class: Loading
 * Author: Elton C.  Rego
 *
 * Purpose: A screen to be displayed while the app is loading
 */
export default class Loading extends Component {

  /*
   * Method: constructor(props)
   * Author: Elton C. Rego
   */
  constructor(props) {
    super(props);
   this.state = {
      planSelected: 0,
    }; 
    this.color1 = new Animated.Value(0);
    this.color2 = new Animated.Value(0);
    this.color3 = new Animated.Value(0);
  }

  componentDidMount() {
    console.log("Insurance Recommendations component mounted");
    // fetch data from the database

    // set state variables (which plans are recommended, which plan is selected, etc.)


  }

  /*
   * Static: navigationOptions
   * Author: Elton C. Rego, Alec Felt
   *
   * Purpose: To set the navigation bar options for this page
   */
  static navigationOptions = ({navigation, screenProps}) => ({

      /*
       * navigationOptions: headerStyle, headerRight
       * Author: Elton C. Rego, Alec Felt
       *
       * Purpose: Add color/font to navbar
       *          Add button on headerRight for navigation
       *          options in the future
       */
      header: null,
  });

/*
 * Method: selectThis()
 * Author: Will Coates (with guidance from Elton Rego)
 * 
 * Purpose: When a plan is selected, change its styling and
 *          record that it has been (temporarily) selected
 * @param: planNum: the number in the list that has been selected
 */
 selectThis(planNum){
  //change styling to accent, and the other two to non-accent
  if(planNum == 1){
    this.setActive(1);
    this.setInactive(2);
    this.setInactive(3);
  }
  else if(planNum == 2){
    this.setActive(2);
    this.setInactive(1);
    this.setInactive(3);
  }
  else if(planNum == 3){
    this.setActive(3);
    this.setInactive(1);
    this.setInactive(2);
  }

  //update selection variable (set planSelected to planNum)
  this.state.planSelected = planNum;
  console.log("planSelected: " + this.state.planSelected);
 }

/*
 * Method: accented
 * Author: Will Coates
 * Purpose: determines if style of list header is accented or
 *          not, depending on the plan selected
 * @param: confirm (boolean): if true, then return accented
                              if false, then return unaccented
 */
accented(confirm){
  if(confirm){
    console.log("set plan to accented");
    return styleguide.light_title2_accent;
  }
  else{
    return styleguide.light_title2;
  }
}
/*
 * Method: confirmedSelection()
 * Author: Will Coates (with guidance from Elton Rego)
 *
 * Purpose: When the user wants to confirm their selected plan,
 *          push that to Firebase
 */
 confirmedSelection(planNum){
  console.log("Plan " + planNum + " selection confirmed");
  //push record of selected plan to database
 }

  /*
  * Author: Elton C. Rego
  * Purpose: When called, shakes the button
  */
setActive(i){
      if(i == 1){
        Animated.timing(
          this.color1,
          {
          toValue: 1,
          duration: 1300,
          easing: Easing.inout
          }
        ).start();
    }
    else if(i == 2){
        Animated.timing(
          this.color2,
          {
          toValue: 1,
          duration: 1300,
          easing: Easing.inout
          }
        ).start();
    }
    else if (i == 3){
        Animated.timing(
          this.color3,
          {
            toValue: 1,
            duration: 1300,
            easing: Easing.inout
          }
        ).start();
  }
}

  setInactive(i){
    if(i == 1){
      Animated.timing(
        this.color1,
        {
          toValue: 0,
          duration: 1300,
          easing: Easing.inout
        }
      ).start();
    }
    else if(i == 2){
      Animated.timing(
        this.color2,
        {
          toValue: 0,
          duration: 1300,
          easing: Easing.inout
        }
      ).start();
    }
    else if(i == 3){
      Animated.timing(
        this.color3,
        {
          toValue: 0,
          duration: 1300,
          easing: Easing.inout
        }
      ).start();
    }
  }

  /*
   * Method: render
   * Author: Alec Felt (modified by Elton Rego and Will Coates)
   *
   * Purpose: Renders the insurance recommendations page.
   *
   */
  render() {
    var styling1 = this.color1.interpolate({
      inputRange: [0, 1],
      outputRange: [GLOBAL.COLOR.DARKGRAY, GLOBAL.COLOR.GREEN]
    });

    var styling2 = this.color2.interpolate({
      inputRange: [0, 1],
      outputRange: [GLOBAL.COLOR.DARKGRAY, GLOBAL.COLOR.GREEN]
    });
    var styling3 = this.color3.interpolate({
      inputRange: [0, 1],
      outputRange: [GLOBAL.COLOR.DARKGRAY, GLOBAL.COLOR.GREEN]
    });
    
    return (
      <SafeAreaView style={styles.screen_container}>
        <StatusBar
           barStyle="light-content"
        />
      <View style={styles.container}>
          <Animated.Text style={[styles.ico, {color: GLOBAL.COLOR.GREEN}]}><FontAwesome>{Icons.checkSquare}</FontAwesome></Animated.Text>
          <Text style={styleguide.light_display2}>
            Insurance
            <Text style={styleguide.light_display2_accent}>.</Text>
          </Text>

          <Text style={styleguide.light_headline_secondary}>Select one of the options below to log it to this car.</Text>

        <ScrollView>

          <TouchableOpacity onPress={() => { this.selectThis(1); }}>
            <View>
              <Animated.Text style={[styleguide.light_title2, {color: styling1}]}>1. [Company Name]</Animated.Text>
              <Text style={styleguide.light_subheader2_secondary}>At [Company Name], you will pay [price] for your coverage.</Text>

              <Text style={styleguide.light_subheader2}>[Reason for recommending in this slot].</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.selectThis(2); }}>
            <View>
              <Animated.Text style={[styleguide.light_title2, {color: styling2}]}>2. [Company Name]</Animated.Text>
              <Text style={styleguide.light_subheader2_secondary}>At [Company Name], you will pay [price] for your coverage.</Text>
              
              <Text style={styleguide.light_subheader2}>[Reason for recommending in this slot].</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.selectThis(3); }}>
            <View>
              <Animated.Text style={[styleguide.light_title2, {color: styling3}]}>3. [Company Name]</Animated.Text>
              <Text style={styleguide.light_subheader2_secondary}>At [Company Name], you will pay [price] for your coverage.</Text>
              
              <Text style={styleguide.light_subheader2}>[Reason for recommending in this slot].</Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  /*
    * Style: Button Header
    * Author: Elton C. Rego
    * Purpose: Add style to the navbar button
    *          to stay consistent with project theme
    */
    screen_container: {
      flex: 1,
      backgroundColor: GLOBAL.COLOR.WHITE,
      justifyContent: 'flex-start',
    },
    container:{
      flex: 1,
      padding: 32,
      alignItems: 'flex-start',
    },
    ico: {
      fontSize: 24,
    },
    list_header: {
      alignItems: 'flex-start',
      marginVertical: 32,
    },
    question_item: {
      marginVertical: 32,
    },
    toggles:{
      width: 297,
      flex: 1,
      flexDirection: 'row',
    },
    toggle_flex: {
      flex: 1,
    },
    yes_no_button: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: GLOBAL.COLOR.WHITE,
      borderRadius: 4,
      padding: 16,
      margin: 8,
    }

});
