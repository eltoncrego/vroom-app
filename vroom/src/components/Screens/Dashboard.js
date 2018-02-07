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
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import Animation from 'lottie-react-native';

// Files Needed
import {Auth} from "../Login";
import {goTo, clearNavStack} from "../Navigation/Navigation";
import SignedOut from '../Navigation/Router';
import {firebaseRef} from '../Database/Database';
import SwipeableList from "./../Custom/SwipeableList";

// Animations
import revi_worried from '../../../assets/animations/revi-to-worried.json';
import revi_sad from '../../../assets/animations/revi-to-sad-immediately.json';
import revi_happy from '../../../assets/animations/revi-hi.json';
import revi_super_happy from '../../../assets/animations/revi-super-happy.json';


// Detect screen width and height
const { width, height } = Dimensions.get('window');

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
      // Backend interfact state variables
      button: 'View Calendar',
      car_name: "My Car",
      textTaskArr: [
        {key: '1. Sample Task'},
        {key: '2. Sample Task'},
        {key: '3. Sample Task'},
        {key: '4. Sample Task'},
        {key: '5. Sample Task'},
        {key: '6. Sample Task'},
        {key: '7. Sample Task'},
        {key: '8. Sample Task'},
        {key: '9. Sample Task'},
        {key: '10. Sample Task'},
        {key: '11. Sample Task'},
        {key: '12. Sample Task'},
        // {key: '13. Sample Task'},
      ],
      completed_tasks: 12,
      tot_tasks: 13,

      // Stylistic State Stuff
      fill: 80,
      ring_color: GLOBAL.COLOR.GREEN,
      ring_back_color: GLOBAL.COLOR.GREENSCRIM,
      revi_animation: revi_happy,
      main_prompt: "is good to go!",
      additional_prompt: "",
      fade_animation: new Animated.Value(0),
    };
  }



  /*
   * Method: componentDidMount()
   * Author: Elton C. Rego
   *
   * Purpose: When a component specified sucessfully is rendered,
   *   it runs the action
   */
  componentWillMount(){
    var that = this;
    console.log("Dashboard: querying car_name");
    firebaseRef.database().ref("users/"+Auth.getAuth().uid+"/vehicles/").once("value").then(function(snapshot) {
      console.log("query successful");
      if(snapshot.exists()) {
        snapshot.forEach(function(child){
          console.log("exists");
          that.setState({
            car_name: child.val().nickname
          });
        });
      } else {
        console.log("user hasn't gone through onboarding");
      }
    }).catch(function(error){
      console.log(error.message);
    });
  }

  componentDidMount() {

    console.log("Dashboard has successfuly mounted");

    var task_ratio = (this.state.completed_tasks) / (this.state.tot_tasks);

    if (task_ratio == 1){
      this.setState({
        fill: task_ratio * 100,
        ring_color: GLOBAL.COLOR.GREEN,
        ring_back_color: GLOBAL.COLOR.GREENSCRIM,
        revi_animation: revi_super_happy,
        main_prompt: "is in tip top shape!",
        additional_prompt: "Congrats!\n",
      });
    } else if (task_ratio > .74){
      this.setState({
        fill: task_ratio * 100,
        ring_color: GLOBAL.COLOR.GREEN,
        ring_back_color: GLOBAL.COLOR.GREENSCRIM,
        revi_animation: revi_happy,
        main_prompt: "is good to go!",
        additional_prompt: "Only ",
      });
    } else if (task_ratio > .45) {
      this.setState({
        fill: task_ratio * 100,
        ring_color: GLOBAL.COLOR.YELLOW,
        ring_back_color: GLOBAL.COLOR.YELLOWSCRIM,
        revi_animation: revi_worried,
        main_prompt: "needs a bit of work...",
      });
    } else {
      this.setState({
        fill: task_ratio * 100,
        ring_color: GLOBAL.COLOR.RED,
        ring_back_color: GLOBAL.COLOR.REDSCRIM,
        revi_animation: revi_sad,
        main_prompt: "needs attention!",
      });
    }

    var that = this;
    setTimeout(function(){
      that.animation.play();
      Animated.timing(
        that.state.fade_animation,
        {
          toValue: 1,
          duration: 1000,
        }
      ).start();
    }, 100);
  }


  /*
   * Method: initAnimation()
   * Author: Elton C. Rego
   *
   * Purpose: Verifies if animation is accessible
   *   if so, triggers it's start
   */
  initAnimation(){
    if (!this.animation){
      setTimeout(() => {
        this.initAnimation();
      }, 100);
    } else {
        this.animation.play();
    }
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
      <View style={[
          STYLE.container,
          {
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: GLOBAL.COLOR.DARKGRAY,
          }
        ]
      }>
        <StatusBar barStyle="light-content" />
        <ScrollView>
          <View style={[
            styles.scroll,
            {
              paddingVertical: 16,
            }
          ]}>
            <View style={[
              styleguide.card_focused,
              {
                alignItems: 'center',
                justifyContent: 'center',
                padding: 32,
                width: width-32,
                height: width-32,
              }
            ]}>
              <View style={[STYLE.revi_animations, {width: width-128, height: width-128,}]}>
                <Animation
                  ref={animation => {this.animation = animation;}}
                  style={{width: '100%', height: '100%',}}
                  loop={false}
                  speed={1}
                  source={this.state.revi_animation}
                />
              </View>
            </View>

            <Animated.View
              style={{
                width: width,
                borderTopColor: this.state.ring_color,
                borderTopWidth: 4,
                borderBottomColor: this.state.ring_color,
                borderBottomWidth: 4,
                marginVertical: 32,
                paddingVertical: 24,
                paddingHorizontal: 16,

                opacity: this.state.fade_animation,
              }}
            >
              <Text style={[
                styleguide.light_title2,
                {
                  color: this.state.ring_color,
                }
              ]}>
                {this.state.car_name} {this.state.main_prompt}
              </Text>
              <Text style={[
                styleguide.dark_subheader2,
                {
                  width: width - 32,
                  color: GLOBAL.COLOR.WHITE,
                }
              ]}>
                {this.state.additional_prompt}{this.state.tot_tasks - this.state.completed_tasks} Remaining
              </Text>
            </Animated.View>

            {/* Additional Cards can be placed here */}
            <Animated.View
              style={{
                opacity: this.state.fade_animation,
              }}
            >
              <SwipeableList
                borderColor={this.state.ring_color}
                data={this.state.textTaskArr}
                style={
                  {
                    borderBottomColor: this.state.ring_color,
                    borderBottomWidth: 4,
                  }
                }
              />
            </Animated.View>
          </View>
        </ScrollView>
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

  /* Style: Scroll
   * Author: Elton C. Rego
   * Purpose: Styles the scrollview that houses all the tasks
   */
   scroll: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
   }

});
