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
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  PanResponder,
  Animated,
  ScrollView,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

// Custom components
import GasList from '../Custom/GasList';

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
      translation: new Animated.Value(0),
      cardState: 1,
      scrollEnable: true,
      textDataArr: [
        {
          totalPrice: '$32.50',
          date: 'February 8th, 2018',
          gallonsFilled: 8.01,
          odometer: 108562,
          distanceSinceLast: 251
        },
      ],
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderMove: (e, {dy}) => {
        // put animation code here
        this.setState({scrollEnable: false});
        if((dy < -16) && this.state.cardState == 1){
          Animated.spring(
            this.state.translation,
            { toValue: 0, friction: 6}
          ).start();
        } else if ((dy >= 16) && this.state.cardState == 0) {
          Animated.spring(
            this.state.translation,
            { toValue: 1, friction: 6}
          ).start();

        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        this.setState({
          cardState: !this.state.cardState,
          scrollEnable: !this.state.scrollEnable,
        });
      },
    });
  }

  render(){

    var cardTranslation = this.state.translation.interpolate({
      inputRange: [0, 1],
      outputRange: [-250, 0]
    });

   // Calculate the x and y transform from the pan value
   let [translateY] = [cardTranslation];

   // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
   let transformList = {transform: [{translateY}]};

    return(
      <View style={
        [styleguide.container,
        {
          backgroundColor: GLOBAL.COLOR.DARKGRAY,
        }]
      }>
      <StatusBar barStyle="light-content"/>
        <View style={styles.navbar}>
          <Text style={styleguide.dark_title2}>vroom<Text style={styleguide.dark_title2_accent}>.</Text></Text>
          <TouchableOpacity><Text style={styleguide.dark_subheader2}><FontAwesome>{Icons.plus}</FontAwesome></Text></TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.graph}>
          </View>
          {/*...this._panResponder.panHandlers*/}
          <Animated.View
            style={[
              styles.card,
              transformList,]
            }>
            <GasList
              enable={this.state.scrollEnable}
              data={this.state.textDataArr}/>
          </Animated.View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  navbar: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 32,
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  graph:{
    zIndex: 0,
    width: '100%',
    height: 250,
  },
  card: {
    width: '100%',
    backgroundColor: GLOBAL.COLOR.WHITE,
    zIndex: 1,
  },
  ico: {
    fontSize: 24,
    color: GLOBAL.COLOR.WHITE,
  },

});
