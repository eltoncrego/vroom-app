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
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

/*
 * Class: Loading
 * Author: Elton C.  Rego
 *
 * Purpose: A screen to be displayed while the app is loading
 */
export default class Events extends Component {

  /*
   * Method: constructor(props)
   * Author: Elton C. Rego
   */
  constructor(props) {
    super(props);
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
   * Purpose: Renders the Events page.
   *  As of now this just contains a header,
   *  but we can add event creation and notifiction
   *  functionality later on
   *
   */
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
           barStyle="light-content"
         />
        <Text style={styles.loading}>
          loading...
        </Text>
      </View>
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
    container: {
      flex: 1,
      backgroundColor: GLOBAL.COLOR.DARKGRAY,
      padding: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loading: {
      fontFamily: 'Nunito',
      fontSize: 20,
      fontWeight: '900',
      color: GLOBAL.COLOR.GREEN,
      alignSelf: 'center',
    }

});
