/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from '../Navigation/Menu';
import {logOut} from "../Database/Database";
import {clearNavStack} from "../Navigation/Navigation";

/*
 * Class: Dashboard
 * Author: Elton C.  Rego
 *
 * Purpose: Be the main screen on the application
 */
export default class Dashboard extends Component {

  /*
<<<<<<< HEAD
=======
   * Static: navigationOptions
   * Author: Elton C. Rego, Alec Felt
   *
   * Purpose: To set the navigation bar options for this page
   */
  static navigationOptions = ({navigation, screenProps}) => ({

      /*
       * navigationOptions: title
       * Author: Alec Felt
       *
       * Purpose: Add logo to navbar
       */
      title: <Image style={styles.icon_header} source={require('../../../assets/img/ios.png')}/>,

      /*
       * navigationOptions: headerStyle, headerRight
       * Author: Elton C. Rego, Alec Felt
       *
       * Purpose: Add color/font to navbar
       *          Add button on headerRight for navigation
       *          options in the future
       *
       * TODO: style Back button on the navbar
       * TODO: add navigation functionaility to Next button
       * TODO: get Next/Back button styled with Nunito fontFamily
       *       (for some reason I couldn't figure out how to)
       */
      headerStyle: {
        backgroundColor: GLOBAL.COLOR.DARKGRAY,
      },
      headerRight: (
        // example navigation:
        //  onPress={() => {navigation.navigate('Login');}}
        <TouchableOpacity onPress={() => { logOut(); clearNavStack(navigation, 'EmailPasswordLogin'); } }>
          <Text style={styles.button_header}>Log Out</Text>
        </TouchableOpacity>
      )
  });

  /*
>>>>>>> 9f563b25d398d49bb3768f115b26523f2a9bb680
   * Method: constructor(props)
   * Author: Elton C. Rego
   *
   * Purpose: Sets the state text for the card naming
   * props: the properties passed in from the super class (index.js)
   */
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      text: 'My Car',
    };
  }

  /*
   * Method: updateMenuState, onMenuItemSelected, toggle
   * Author: Tianyi Zhang
   *
   * Purpose: Functions for SideMenu
   * props:
   */

  toggle() {
    this.setState({
      isOpen:!this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  /*
   * Static: navigationOptions
   * Author: Elton C. Rego, Alec Felt
   *
   * Purpose: To set the navigation bar options for this page
   */
  static navigationOptions = ({navigation, screenProps}) => ({

      /*
       * navigationOptions: title
       * Author: Alec Felt
       *
       * Purpose: Add logo to navbar
       */
      title: (<Text style={styles.header_middle}>Dashboard</Text>),

      /*
       * navigationOptions: headerStyle, headerRight
       * Author: Elton C. Rego, Alec Felt
       *
       * Purpose: Add color/font to navbar
       *          Add button on headerRight for navigation
       *          options in the future
       *
       * TODO: style Back button on the navbar
       * TODO: add navigation functionaility to Next button
       * TODO: get Next/Back button styled with Nunito fontFamily
       *       (for some reason I couldn't figure out how to)
       */
      headerStyle: {
        backgroundColor: GLOBAL.COLOR.DARKGRAY,
      },
      headerRight: (
        // example navigation:
        //  onPress={() => {navigation.navigate('Login');}}
        <TouchableOpacity onPress={() => { logOut(); clearNavStack(navigation, 'EmailPasswordLogin'); } }>
          <Text style={styles.button_header}>Logout</Text>
        </TouchableOpacity>
      ),
      headerLeft: (
        <TouchableOpacity onPress={this.toggle} style={styles.button}>
          <Text style={styles.menu}>Menu</Text>
        </TouchableOpacity>
      ),
  });

  render() {

    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
     <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
        </KeyboardAvoidingView>
      </SideMenu>
    );
  }
}


const styles = StyleSheet.create({
  /*
   * Style: Icon Header
   * Author: Alec Felt
   * Purpose: Add style to the navbar icon
   *          to stay consistent with project theme
   */
   icon_header: {
     height: 35,
     width: 35,
     marginTop: 7
   },

   /*
    * Style: Button Header
    * Author: Alec Felt
    * Purpose: Add style to the navbar button
    *          to stay consistent with project theme
    */
    button_header: {
      fontFamily: 'Nunito',
      color: GLOBAL.COLOR.BLUE,
      margin: 20,
    },
    header_middle: {
      color: GLOBAL.COLOR.BLUE,
      fontFamily: 'Nunito',
      margin: 20,
    },
    menu: {
      fontFamily: 'Nunito',
      color: GLOBAL.COLOR.BLUE,
      margin: 20,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: GLOBAL.COLOR.DARKGRAY,
    },
    button: {

    },
});
