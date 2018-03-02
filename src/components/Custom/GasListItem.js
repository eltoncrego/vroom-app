/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { PureComponent } from 'react';
GLOBAL = require('../../Globals');
styleguide = require('../../global-styles');

// Components
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity
} from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';

const {width} = Dimensions.get('window');

export default class Gas extends PureComponent {

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
              this.props.success(this.props.index);
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
      expanded: true,
      animation: new Animated.Value(),
      expandedTitle: "Average Fillup"
    };
  }

  setScrollViewEnabled(enabled) {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }

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

  componentDidMount(){
    Animated.sequence([
      Animated.timing(this.state._animated, {
        toValue: 1,
        duration: 250 + 1/this.props.index * 250,
        friction: 6,
      }),
    ]).start();
  }

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

  _onPress(){
    console.log("pressed a GasListItem");
  }


  _setMaxHeight(event){
      this.setState({
          maxHeight   : event.nativeEvent.layout.height
      });
  }

  _setMinHeight(event){
      this.setState({
          minHeight   : event.nativeEvent.layout.height
      });
  }

  toggle(){
      //Step 1
      let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
          finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

      this.setState({
          expanded : !this.state.expanded  //Step 2
      });

      this.state.animation.setValue(initialValue);  //Step 3
      Animated.spring(     //Step 4
          this.state.animation,
          {
              toValue: finalValue
          }
      ).start();  //Step 5
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

       <TouchableOpacity onPress={this._onPress}>

        <View style={styles.innerCell}>
          <Animated.View style={styles.topCell} onLayout={this._setMinHeight.bind(this)}>
            <View style={styles.change}>
              <Animated.Text
                style={[styles.ico,{color: this.state.color,}]}>
                <FontAwesome>{this.state.icon}</FontAwesome>
              </Animated.Text>
            </View>
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
          <Animated.View style={styles.expandedCell} onLayout={this._setMaxHeight.bind(this)}>
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
                  Snapshot odometer
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
       </TouchableOpacity>
        <View style={styles.absoluteCell}>
          <Animated.Text style={[styleguide.dark_body, {
            opacity: this.state.bgAnimated, paddingLeft: 16,
          }]}>DELETE</Animated.Text>
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
    padding: 16,
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
    paddingTop: 16,
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
