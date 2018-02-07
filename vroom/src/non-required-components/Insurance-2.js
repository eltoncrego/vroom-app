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
  KeyboardAvoidingView,
} from 'react-native';
import {Icons} from 'react-native-fontawesome';
import {InputField} from './../Custom/InputField'


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
  }

  componentDidMount() {
    console.log("Loading component mounted");
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
   * Method: render
   * Author: Alec Felt
   *
   * Purpose: Renders the loading page.
   *
   */
  render() {
    return (
      <SafeAreaView style={styles.screen_container}>
        <StatusBar
           barStyle="light-content"
        />
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView>
          <Text style={styleguide.dark_display2}>
            Insurance
            <Text style={styleguide.dark_display2_accent}>.</Text>
          </Text>
          <Text style={styleguide.dark_headline_secondary}>Let's try and save you some money</Text>
          <View style={styles.question_item}>
            <Text style={styleguide.dark_title2}>Do you finance your car?</Text>
            <View style={styles.toggle}>
              <View style={styles.toggle_flex}>
                <TouchableOpacity style={styles.yes_no_button}>
                  <Text style={styleguide.dark_subheader}>Yes</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.toggle_flex}>
                <TouchableOpacity style={styles.yes_no_button}>
                  <Text style={styleguide.dark_subheader}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.question_item}>
              <Text style={styleguide.dark_title2}>How much is your car worth?</Text>
              <InputField
                icon={Icons.barChart}
                label={"Net Worth in Dollars"}
                labelColor={"rgba(255,255,255,0.50)"}
                type={"numeric"}
                inactiveColor={GLOBAL.COLOR.WHITE}
                activeColor={GLOBAL.COLOR.GREEN}
                topMargin={32}
                autoCapitalize={"none"}/>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
      backgroundColor: GLOBAL.COLOR.DARKGRAY,
      justifyContent: 'flex-start',
    },
    container:{
      flex: 1,
      padding: 32,
      alignItems: 'flex-start',
    },
    question_item: {
      marginVertical: 32,
    },
    toggle:{
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center'
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
