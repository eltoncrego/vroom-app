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
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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
    this.onDayPress = this.onDayPress.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.state = {
      text: 'My Car',
      button: 'View Calendar'
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

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }

  flipCard(){
    if(this.state.flip){
      this.setState({
        flip: false,
        button: 'View Calendar',
      });
    } else {
      this.setState({
        flip: true,
        button: 'View Your Car',
      });
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

    var d = new Date();

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
            flip={this.state.flip}
            clickable={false}
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
                speed={0.75}
                source={revi_sad}
              />
            </View>
            <Text style={styles.card_text}>{"but I could be better"}</Text>
            </View>
            {/* Back Side */}
            <View style={styles.back}>
              <Calendar
                // Pulls from style sheet
                style={styles.calendar}

                theme={{
                  selectedDayBackgroundColor: GLOBAL.COLOR.DARKBLUE,
                  selectedDayTextColor: GLOBAL.COLOR.GRAY,
                  todayTextColor: GLOBAL.COLOR.YELLOW,
                  dayTextColor: GLOBAL.COLOR.DARKGRAY,
                  textDisabledColor: GLOBAL.COLOR.DARKBLUE,
                  dotColor: GLOBAL.COLOR.GREEN,
                  selectedDotColor: GLOBAL.COLOR.GREEN,
                  arrowColor: GLOBAL.COLOR.DARKBLUE,
                  monthTextColor: GLOBAL.COLOR.DARKGRAY,
                  textDayFontFamily: 'Nunito',
                  textMonthFontFamily: 'Nunito',
                  textDayHeaderFontFamily: 'Nunito',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,
                }}

                // Initially visible month. Default = Date()
                current={d}

                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => {this.onDayPress(day)}}

                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MMMM yyyy'}

                // Do not show days of other months in month page. Default = false
                hideExtraDays={true}

                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}

                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}

                // Hide day names. Default = false
                hideDayNames={true}

                markedDates={{[this.state.selected]: {selected: true}}}
              />
            </View>
          </FlipCard>

          <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.8}
              onPress={
                () => this.flipCard()
            }>
              <Text style={styles.buttonText}>{this.state.button}</Text>
          </TouchableOpacity>
          <View style={styles.dayly}>
            <Text style={styles.day_title}>Take 5</Text>
            <Text style={styles.day_caption}>Before you drive today, take five minutes to check</Text>

            <Text style={styles.task_title}>Tire Pressure</Text>
            <Text style={styles.task_caption}>Grab your tire pressure pen and quickly make sure all of your tires match up with 50psi</Text>

            <Text style={styles.task_title}>Tread Depth</Text>
            <Text style={styles.task_caption}>Got a penny? Grab it and stick it in a crevice of your tire. If you can see old abe's hat, you should definitely get some new rubbers.</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  /*
   * Style: Button
   * Author: Tianyi Zhang
   * Purpose: This styles the Next button
   */

  buttonContainer: {
    backgroundColor: GLOBAL.COLOR.YELLOW,
    padding: 8,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 20,
    alignSelf: 'center',
  },

  buttonText: {
    textAlign: 'center',
    fontFamily: 'Nunito',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
    fontSize: 15,
    fontWeight: '600',
  },

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
   * Style: Calendar
   * Author: Elton C. Rego
   * Purpose: Styles the calendar element on the back of the card
   *
   */
   calendar: {
      margin: 32,
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
    dayly: {
      padding: 32,
    },

    day_title: {
      fontFamily: 'Nunito',
      fontSize: 40,
      fontWeight: '900',
      color: GLOBAL.COLOR.YELLOW,
    },
    day_caption: {
      fontFamily: 'Nunito',
      fontSize: 20,
      fontWeight: '400',
      color: GLOBAL.COLOR.WHITE,
      marginBottom: 32,
    },
    task_title: {
      fontFamily: 'Nunito',
      fontSize: 20,
      fontWeight: '900',
      color: GLOBAL.COLOR.WHITE,
    },
    task_caption: {
      fontFamily: 'Nunito',
      fontSize: 15,
      fontWeight: '200',
      color: GLOBAL.COLOR.WHITE,
      marginBottom: 32,
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
    // height: 344,
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: 32,
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
