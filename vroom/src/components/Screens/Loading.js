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
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Animation from 'lottie-react-native';
import loader_icon from '../../../assets/animations/loading.json';

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
    this.animation.play();
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
      <View style={styles.container}>
        <StatusBar
           barStyle="light-content"
         />
        <View style={styles.animations}>
          <Animation
            ref={
              animation => {
                this.animation = animation;
              }
            }
            style={{
              width: "100%", 
              height: "100%",
            }}
            loop={true}
            source={loader_icon}
          />
        </View>
        
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
    },
    /*
     * Style: Revi Animations
     * Author: Elton C. Rego
     * Purpose: This styles the Revis on each card
     */
    animations: {
      alignSelf: 'center',
      height: 128,
      width: 128,
    },

});
