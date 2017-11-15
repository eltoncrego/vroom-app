/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');

// Components
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Animation from 'lottie-react-native';
import FlipCard from 'react-native-flip-card'

// Files Needed
import {logOut} from "../Database/Database";
import {goTo, clearNavStack} from "../Navigation/Navigation";
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
    this.initAnimation = this.initAnimation.bind(this);
    this.state = {
      text: 'My Car',
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
    this.initAnimation();
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

      title: (<Text style={styles.header_middle}>Dashboard</Text>),

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
   * Author: Elton C. Rego
   *
   * Purpose: Renders the Dashboard page.
   *  As of now this just contains some dummy tasks that
   *  we can learn to populate later.
   *
   */
  render() {
    return (
      <View
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
         <StatusBar
           barStyle="light-content"
         />
          <FlipCard 
            style={styles.card}
            friction={10}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            onFlipEnd={(isFlipEnd) => {this.initAnimation()}}
          >
            {/* Face Side */}
            <View style={styles.face}>
              <Text style={styles.card_title}>{"I'm okay"}</Text>
            <View style={styles.revi_animations}>
              <Animation
                ref={animation => {this.animation = animation;}}
                style={{width: '100%', height: '100%',}}
                loop={false}
                speed={0.40}
                source={revi_sad}
              />
            </View>
            <Text style={styles.card_text}>{"but I could be better"}</Text>
            </View>
            {/* Back Side */}
            <View style={styles.back}>
              <Text>IT GON BE A CALENDAR</Text>
            </View>
          </FlipCard>

          <Text style={styles.day_title}>Take 5</Text>
          <Text style={styles.day_caption}>Before you drive today, take five minutes to check</Text>

          <Text style={styles.task_title}>Tire Pressure</Text>
          <Text style={styles.task_caption}>Grab your tire pressure pen and quickly make sure all of your tires match up with 50psi</Text>

          <Text style={styles.task_title}>Tread Depth</Text>
          <Text style={styles.task_caption}>Got a penny? Grab it and stick it in a crevice of your tire. If you can see old abe's hat, you should definitely get some new rubbers.</Text>
        </ScrollView>
      </View>
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

    /*
     * Day to day stylings
     * Author: Elton C. Rego
     * Purpose: To style the tasks that might come up on a day to day
     */
    day_title: {
      fontFamily: 'Nunito',
      fontSize: 40,
      fontWeight: '900',
      color: GLOBAL.COLOR.YELLOW,
      margin: 20,
    },
    day_caption: {
      fontFamily: 'Nunito',
      fontSize: 20,
      fontWeight: '400',
      color: GLOBAL.COLOR.WHITE,
      margin: 20,
      marginTop: -20,
    },
    task_title: {
      fontFamily: 'Nunito',
      fontSize: 20,
      fontWeight: '900',
      color: GLOBAL.COLOR.WHITE,
      margin: 20,
      marginTop: 8,
    },
    task_caption: {
      fontFamily: 'Nunito',
      fontSize: 15,
      fontWeight: '200',
      color: GLOBAL.COLOR.WHITE,
      margin: 20,
      marginTop: -20,
    },

    /*
   * Style: Card
   * Author: Elton C. Rego
   * Purpose: This styles the card view within this page
   */
  card: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    width: 312,
    height: 344,
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    margin: 16,
  },

   /*
   * Style: Card Title
   * Author: Elton C. Rego
   * Purpose: This styles the card titles on this page
   */
  card_title: {
    fontFamily: 'Nunito',
    fontWeight: '900',
    color: GLOBAL.COLOR.DARKGRAY,
    textAlign: 'center',
    fontSize: 40,
    marginTop: 32,
  },

   /*
   * Style: Card Text
   * Author: Elton C. Rego
   * Purpose: This styles the card descriptions
   */
  card_text: {
    fontFamily: 'Nunito',
    textAlign: 'center',
    color: GLOBAL.COLOR.DARKGRAY,
    fontSize: 20,
    marginBottom: 32,
  },

  /*
   * Style: Revi Animations
   * Author: Elton C. Rego
   * Purpose: This styles the Revis on each card
   */
  revi_animations: {
    alignSelf: 'center',
    height: 240,
    width: 240,
    zIndex:2,
    marginTop: -32,
  },

});
