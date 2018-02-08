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
  ScrollView,
  TouchableOpacity,
  ListView,
  PanResponder,
  Animated
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

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
      translation: new Animated.Value(1),
      cardState: 1,
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderMove: (e, {dy}) => {
        // put animation code here
        if((dy < 30) && this.state.cardState == 1){
          Animated.spring(
            this.state.translation,
            { toValue: 0, friction: 6}
          ).start();
          this.setState({cardState: 0});
        } else if ((dy >= 30) && this.state.cardState == 0) {
          Animated.spring(
            this.state.translation,
            { toValue: 1, friction: 6}
          ).start();
          this.setState({cardState: 1});
        }
      }
    });
  }

  render(){

    var cardTranslation = this.state.translation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 250]
    });

   // Calculate the x and y transform from the pan value
   let [translateY] = [cardTranslation];

   // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
   let transformList = {transform: [{translateY}]};

    return(
      <View style={
        [styleguide.container,
        {
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: GLOBAL.COLOR.DARKGRAY,
        }]
      }>
      <StatusBar barStyle="light-content"/>
        <View style={styles.navbar}>
          <Text style={styleguide.dark_title2}>vroom<Text style={styleguide.dark_title2_accent}>.</Text></Text>
          <TouchableOpacity><Text style={styleguide.dark_subheader2}><FontAwesome>{Icons.plus}</FontAwesome></Text></TouchableOpacity>
        </View>
        <View style={styles.content}>
            <Animated.View {...this._panResponder.panHandlers} style={[
                styles.card,
                transformList,]}>
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
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 10,
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scroll: {
    flex: 1,

  },
  card: {
    height: 812,
    width: 375,
    backgroundColor: GLOBAL.COLOR.WHITE,
  },
  ico: {
    fontSize: 24,
    color: GLOBAL.COLOR.WHITE,
  },

});
