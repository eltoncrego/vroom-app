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
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';

// Files Needed
import {pushTask, logOut, deleteUser, firebaseRef} from "../Database/Database";
import {goTo, clearNavStack} from "../Navigation/Navigation";

/*
 * Class: Tasks
 * Author: Elton C.  Rego
 *
 * Purpose: Be the main area where users can customize their tasks
 */
export default class Tasks extends Component {

  /*
   * Method: constructor(props)
   * Author: Elton C. Rego
   *
   * Purpose: Sets the state text for the card naming
   * props: the properties passed in from the super class (index.js)
   */
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    }
  }

  /*
   * Method: componentDidMount()
   * Author: Elton C. Rego
   *
   * Purpose: When a component specified sucessfully is rendered,
   *   it runs the action
   */
  componentDidMount() {
    console.log("Tasks component mounted");
  }

  /*
   * Firebase Function: addTask()
   * Author: Alec Felt
   *
   * Purpose: Creates a new task,
   *          links task and user
   *
   * TODO: link this up with the UI
   */
   addTask() {
     // Checks state variables assoicated with the task's inputs
     // if(this.state.name!="" && this.state.year!="" && this.state.month!="" && this.state.day!="" && this.state.time!="") {
     //   pushTask(this.state.name, this.state.year, this.state.month, this.state.day, this.state.time);
     // } else {
     //   alert("Error: please set date/time of task");

     // Test Code
     for(var i = 1; i < 30; i++){
        console.log(i);
        pushTask("Test Ref", "2017-11-" + i);
     }
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
      headerStyle: {
        backgroundColor: GLOBAL.COLOR.DARKGRAY,
      },

      title: (<Text style={styles.header_middle}>Tasks</Text>),

      headerRight: (
        <TouchableOpacity onPress={() => { logOut(navigation); }}>
          <Text style={styles.button_header}>Sign Out</Text>
        </TouchableOpacity>
      ),
      headerLeft: (
          <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={styles.button}>
            <Text style={styles.menu}>Menu</Text>
          </TouchableOpacity>
      ),
  });


  /*
   * Method: render
   * Author: Alec Felt
   *
   * Purpose: Renders the tasks page.
   *  As of now this just contains a header,
   *  but we can add task creation and notifiction
   *  functionality later on
   *
   */
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
           barStyle="light-content"
         />
        <Text style={styles.header}>
          Tasks
        </Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={ () => this.addTask() }>
          <Text style={styles.buttonText}>
            Create Task
          </Text>
        </TouchableOpacity>
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
      backgroundColor: GLOBAL.COLOR.DARKGRAY,
      padding: 32,
    },

    /*
    * Style: Settings Header
    * Author: Elton C. Rego
    * Purpose: Styles the header of the settings page
    */
    header: {
      fontFamily: 'Nunito',
      fontWeight: '900',
      fontSize: 40,
      color: GLOBAL.COLOR.GRAY,
    },

    /*
   * Style: Button
   * Author: Elton C. Rego
   * Purpose: This styles the Next button
   */
  buttonContainer: {
    backgroundColor: GLOBAL.COLOR.RED,
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Nunito',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
    fontSize: 20,
    fontWeight: '600',
  },

});
