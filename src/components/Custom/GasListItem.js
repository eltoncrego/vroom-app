/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { PureComponent } from 'react';
GLOBAL = require('../../Globals');
styleguide = require('../../global-styles');

// External Components
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';

// Defining the width macro
const {width} = Dimensions.get('window');

/*
* Class: Gas
* Author: Elton C. Rego
* Purpose: Renders a singular gas fill-up item with the given properties
*
* Props:
* allowDeleteOn(index): allows the deletion of only an item with the given index
* index: the index of the currently rendered item
* deleted(index): the callback function that is called when an item needs
*   to be deleted
* setScrollEnabled: the callback function for whether or not the swiping of
*   this specific element needs to stop scrolling in the main list component
* distanceSinceLast: the distance since the last fillup in the fill-up data
* gallonsFilled: the gallons filled for this item of fill-up data
* average: the average MPG for this user
* totalPrice: the total price paid for this fill-up
* date: the date, as an array, of when this fillup took place
* odometer: the odometer reading of the car at the time of this fill-up
*/
export default class Gas extends PureComponent {

  /*
  * Function: constructor
  * Author: Elton C. Rego
  * Purpose: Sets up the gesture delay, pan responder, and state variables
  *   for this specific gas list itme. Allowing us to enable swipe functions.
  *
  * @param props: the prop variables passed from the calling component
  */
  constructor(props) {
    super(props);

    this.gestureDelay = 35;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if(this.props.allowDeleteOn == this.props.index){
          if (gestureState.dx < -35) {
            this.setScrollViewEnabled(false);
            let newX = gestureState.dx + this.gestureDelay;
            position.setValue({x: newX, y: 0});
          }
          if (gestureState.dx < -150) {
            Animated.sequence([
              Animated.timing(this.state.bgAnimated, {
                toValue: 1,
                duration: 25,
              }),
            ]).start();
          } else {
            Animated.timing(this.state.bgAnimated, {
              toValue: 0,
              duration: 25,
            }).start();
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if(this.props.allowDeleteOn == this.props.index){
          if (gestureState.dx > -150) {
            Animated.timing(this.state.position, {
              toValue: {x: 0, y: 0},
              duration: 150,
            }).start(() => {
              this.setScrollViewEnabled(true);
            });
          } else {
            Animated.timing(this.state.position, {
              toValue: {x: -width, y: 0},
              duration: 300,
            }).start(() => {
              this.props.deleted(this.props.index);
              position.setValue({x: 0, y: 0});
              this.setScrollViewEnabled(true);
            });
          }
        }
      },
    });

    this.panResponder = panResponder;
    this.state = {
      position,
      _animated: new Animated.Value(0),
      bgAnimated: new Animated.Value(0),
      expandedTitle: "Average Fillup",

      // Expansion items
      expanded: false,
      expansion: new Animated.Value(0),
      _spin: new Animated.Value(0),
      pressable: true,
      expansionDisplay: 'none',
    };
  }

  /*
  * Function: setScrollViewEnabled
  * Author: Elton C. Rego
  * Purpose: sets the availability of the scroll functionality in the overall
  *   gas list based on whether or not the item in question is being swiped
  *
  * @param: enabled: a boolean value of what the property should be for the list
  */
  setScrollViewEnabled(enabled) {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }

  /*
  * Function: componentWillMount()
  * Author: Elton C. Rego
  * Purpose: sets the state variables and does the nesessary calculations
  *   gas item before rendering the component
  */
  componentWillMount() {
    var mpg = parseFloat((this.props.distanceSinceLast/this.props.gallonsFilled).toFixed(2));
    this.setState({
      diff: mpg - this.props.average,
    });

    if (mpg == this.props.average){
      console.log("EQUAL " + mpg + " vs " + this.props.average);
      this.setState({
        icon: Icons.minus,
        color: GLOBAL.COLOR.YELLOW,
      });
    } else if (mpg < this.props.average){
      console.log("LESS THAN " + mpg + " vs " + this.props.average);
      this.setState({
        icon: Icons.chevronDown,
        color: GLOBAL.COLOR.RED,
        expandedTitle: "Below Average Fillup",
      });
    } else {
      console.log("MORE THAN " + mpg + " vs " + this.props.average);
      this.setState({
        icon: Icons.chevronUp,
        color: GLOBAL.COLOR.GREEN,
        expandedTitle: "Above Average Fillup",
      });
    }
  }

  /*
  * Function: componentDidMount
  * Author: Elton C. Rego
  * Purpose: starts the animation for this element when it's mounted on
  *   the DOM
  */
  componentDidMount(){
    Animated.sequence([
      Animated.timing(this.state._animated, {
        toValue: 1,
        duration: 250 + 1/this.props.index * 250,
      }),
    ]).start();
  }

  /*
  * Function: formatDate()
  * Author: Elton C. Rego
  * Purpose: Returns a formatted date based on the given date object
  *   in an array format
  *
  * @param: date - a date object formatted in array scope
  */
  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date[2];
    var monthIndex = date[1];
    var year = date[0];

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
  }

  /*
  * Function: toggleExpandedView()
  * Author: Elton C. Rego
  * Purpose: toggles the display of the expanded view of this gas list
  *   item
  *
  * @param: date - a date object formatted in array scope
  */
  toggleExpandedView(){
    this.setState({
      pressable: false,
    })
    const that = this;
    if(this.state.expanded){
      Animated.parallel([
        Animated.timing(
        that.state.expansion,
        {
          toValue: 0,
          duration: 300,
        }),
        Animated.spring(
        that.state._spin,
        {
          toValue: 0,
          duration: 300,
        })
      ]).start();
      setTimeout(function() {
        that.setState({
          expanded: false,
          expansionDisplay: 'none',
          pressable: true,
        });
      }, 300);
    } else {
      that.setState({
        expansionDisplay: 'flex',
      })
      Animated.parallel([
        Animated.timing(
        that.state.expansion, {
          toValue: 1,
          duration: 300,
        }),
        Animated.spring(
        that.state._spin, {
          toValue: 1,
          duration: 300,
        }),
      ]).start(function() {
        that.setState({
          expanded: true,
          pressable: true,
        });
      });
    }
  }

  render() {

    var shift = this.state._animated.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 0],
    });

    var colorShift = this.state.bgAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [GLOBAL.COLOR.DARKGRAY, GLOBAL.COLOR.RED],
    });

    var expand = this.state.expansion.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 400],
    });

    var _spinRotation = this.state._spin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.View style={[,
        styles.listItem,
        {
          backgroundColor: colorShift,
        }
      ]}>
      <Animated.View
        style={[
          this.state.position.getLayout(),
          {
            transform: [
              { translateX: shift },
            ],
          },
        ]}
        {...this.panResponder.panHandlers}
      >
        <View style={styles.innerCell}>
          <TouchableWithoutFeedback onPress={() => this.toggleExpandedView()} disabled={!this.state.pressable}>
          <Animated.View style={styles.topCell}>
            <Animated.View style={[styles.change, {transform: [{rotateZ: _spinRotation}]}]}>
              <Animated.Text
                style={[styles.ico,{color: this.state.color,}]}>
                <FontAwesome>{this.state.icon}</FontAwesome>
              </Animated.Text>
            </Animated.View>
            <View style={[styles.gasItem, {flex: 1}]}>
              <Text style={styleguide.light_body2}>
                ${this.props.totalPrice.toFixed(2)}
              </Text>
              <Text style={styleguide.light_caption_secondary}>
                {this.formatDate(this.props.date)}
              </Text>
            </View>
            <View style={styles.gasItem}>
              <Text style={styleguide.light_body2}>
                {this.props.gallonsFilled}gal
              </Text>
              <Text style={styleguide.light_caption_secondary}>
                Amount Filled
              </Text>
            </View>
            <View style={styles.gasItem}>
              <Text style={styleguide.light_body2}>
                {(this.props.distanceSinceLast/this.props.gallonsFilled).toFixed(2)}mpg
              </Text>
              <Text style={styleguide.light_caption_secondary}>
                Efficiency
              </Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
         <Animated.View style={[styles.expandedCell, {maxHeight: expand, opacity: this.state.expansion, display: this.state.expansionDisplay}]}>
           <Text style={[styleguide.light_subheader2]}>
             {this.state.expandedTitle}<Text style={{color: this.state.color}}>.</Text>
           </Text>
           <View style={styles.expandedItems}>
             <View style={styles.gasItem}>
               <Text style={styleguide.light_body2}>
                 {this.state.diff.toFixed(2)}mpg
               </Text>
               <Text style={styleguide.light_caption_secondary}>
                 Difference From Average
               </Text>
             </View>
             <View style={styles.gasItem}>
               <Text style={styleguide.light_body2}>
                 {this.props.distanceSinceLast}mi
               </Text>
               <Text style={styleguide.light_caption_secondary}>
                 Distance Since Last
               </Text>
             </View>
             <View style={styles.gasItem}>
               <Text style={styleguide.light_body2}>
                 {this.props.odometer}mi
               </Text>
               <Text style={styleguide.light_caption_secondary}>
                 Snapshot Odometer
               </Text>
             </View>
           </View>
         </Animated.View>
        </View>

        <View style={styles.absoluteCell}>
          <Animated.Text style={[styleguide.dark_title, {
            opacity: this.state.bgAnimated, paddingLeft: 16,
          }]}><FontAwesome>{Icons.trash}</FontAwesome></Animated.Text>
        </View>
      </Animated.View>
    </Animated.View>
    );
  }
}

const styles = StyleSheet.create({

  innerCell: {
    width: width,
    marginRight: 100,
    backgroundColor: GLOBAL.COLOR.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  topCell: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  expandedCell: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: GLOBAL.COLOR.LIGHTGRAY,
  },

  gasItem: {
    flexDirection: 'column',
  },

  expandedItems: {
    width: '100%',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  listItem: {
    marginRight: -100,
    justifyContent: 'center',
  },

  change: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  gasItem:{
    flexDirection: 'column',
    margin: 8,
  },

  ico: {
    fontSize: 16,
  },
  absoluteCell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

});
