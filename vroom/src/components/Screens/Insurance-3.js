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
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

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
        <View style={styles.container}>
          <Text style={STYLE.dark_display2}>Insurance</Text><Text style={STYLE.display2_accent}>.</Text>
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
      backgroundColor: GLOBAL.COLOR.RED,
      justifyContent: 'flex-start',
    },
    container:{
      flex: 1,
      padding: 32,
      alignItems: 'flex-start',
    }
});
