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
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Animation from 'lottie-react-native';

// Files Needed
import {Auth} from "../Login";
import {goTo, clearNavStack} from "../Navigation/Navigation";
import SignedOut from '../Navigation/Router';
import {firebaseRef} from '../Database/Database';
import {getTaskDates, getTaskByDate} from '../Database/Calendar';

// Animations
import revi_sad from '../../../assets/animations/revi-to-worried.json';

/*
 * Class: Dashboard
 * Author: Elton C.  Rego
 *
 * Purpose: Be the main screen on the application
 */
export default class Dashboard extends Component {

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
      button: 'View Calendar',
      car_name: "My Car",
      selected: "",
      taskDates: {},
      textTaskArr: [],
      fill: 50,
      ring_color: GLOBAL.COLOR.GREEN
    };
  }

  /*
   * Method: componentDidMount()
   * Author: Elton C. Rego
   *
   * Purpose: When a component specified sucessfully is rendered,
   *   it runs the action
   */
  componentDidMount() {
    this.animation.play();
    if (this.state.fill > 75){
      this.setState({
        ring_color: GLOBAL.COLOR.GREEN,
      });
    } else if (this.state.fill > 45) {
      this.setState({
        ring_color: GLOBAL.COLOR.YELLOW,
      });
    } else {
      this.setState({
        ring_color: GLOBAL.COLOR.RED,
      });
    }

    // var that = this;
    // console.log("Dashboard: querying car_name");
    // firebaseRef.database().ref("users/"+Auth.getAuth().uid+"/vehicles/").once("value").then(function(snapshot) {
    //   console.log("query successful");
    //   if(snapshot.exists()) {
    //     snapshot.forEach(function(child){
    //       console.log("exists");
    //       that.setState({
    //         car_name: child.val().nickname
    //       });
    //     });
    //   } else {
    //     console.log("user hasn't gone through onboarding");
    //   }
    // }).catch(function(error){
    //   console.log(error.message);
    // });
  }

  /*
   * Static: navigationOptions
   * Author: Elton C. Rego, Alec Felt
   *
   * Purpose: To set the navigation bar options for this page
   */
  static navigationOptions = ({navigation, screenProps}) => {

      return{
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

        title: (<Text ref={"headerTitle"} style={styles.header_middle}>Dashboard</Text>),

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
      }

  }


  render(){
    return(
      <View style={[STYLE.container]}>
        <StatusBar barStyle="light-content" />
        <AnimatedCircularProgress
          size={240}
          width={16}
          fill={this.state.fill}
          rotation={0}
          tintColor={this.state.ring_color}
          backgroundWidth={0}
          linecap="round">
        {
          (fill) => (
            <View style={[STYLE.revi_animations, {width: 192, height: 192,}]}>
              <Animation
                ref={animation => {this.animation = animation;}}
                style={{width: '100%', height: '100%',}}
                loop={false}
                speed={0.75}
                source={revi_sad}
              />
            </View>
          )
        }
        </AnimatedCircularProgress>
      </View>
    );
  }

}

const styles = StyleSheet.create({
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
});