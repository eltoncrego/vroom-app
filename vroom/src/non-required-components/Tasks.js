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
import {pushTask} from "../Database/Database";
import {goTo, clearNavStack} from "../Navigation/Navigation";
import {Auth} from "../Login";

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
   */
   addTasks() {
     // Test Code
     for(var i = 10; i < 16; i++){
        pushTask("cars/2000/Mazda/Miata/task_types/Check Brake Fluid", "2017-12-" + i);
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
        <TouchableOpacity onPress={() => { Auth.logOut(); }}>
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
        <Text style={styles.text}>Clicking the button will add some cars to the database.</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={ () => this.addTasks() }>
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
   * Style: Button
   * Author: Elton C. Rego
   * Purpose: This styles the Next button
   */
  buttonContainer: {
    backgroundColor: GLOBAL.COLOR.GREEN,
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    margin: 32,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Nunito',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
    fontSize: 20,
    fontWeight: '600',
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
      color: GLOBAL.COLOR.BLUE,
    },
    sub_title: {
      fontFamily: 'Nunito',
      fontSize: 20,
      fontWeight: '900',
      color: GLOBAL.COLOR.WHITE,
    },
    text: {
      fontFamily: 'Nunito',
      fontSize: 15,
      fontWeight: '200',
      color: GLOBAL.COLOR.WHITE,
    },

});
