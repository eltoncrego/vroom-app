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
  PanResponder
} from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';

const {width} = Dimensions.get('window');

export default class Gas extends PureComponent {

  constructor(props) {
    super(props);

    this.gestureDelay = -35;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + this.gestureDelay;
          position.setValue({x: newX, y: 0});
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < 150) {
          Animated.timing(this.state.position, {
            toValue: {x: 0, y: 0},
            duration: 150,
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(this.state.position, {
            toValue: {x: width, y: 0},
            duration: 300,
          }).start(() => {
            this.props.success(this.props.index);
            Animated.timing(this.state._animated, {
              toValue: 0,
              duration: 250,
            }).start(() => {
              position.setValue({x: 0, y: 0});
              this.setScrollViewEnabled(true);
            });
          });
        }
      },
    });

    this.panResponder = panResponder;
    this.state = {
      position,
      _animated: new Animated.Value(0),
      bgAnimated: new Animated.Value(0),
    };
  }

  setScrollViewEnabled(enabled) {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }

  componentWillMount() {
    var mpg = (this.props.distanceSinceLast/this.props.gallonsFilled).toFixed(2);
    if (mpg == this.props.average){
      this.setState({
        icon: Icons.minus,
        color: GLOBAL.COLOR.YELLOW,
      });
    } else if (mpg < this.props.average){
      this.setState({
        icon: Icons.chevronDown,
        color: GLOBAL.COLOR.RED,
      });
    } else {
      this.setState({
        icon: Icons.chevronUp,
        color: GLOBAL.COLOR.GREEN,
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
      Animated.timing(this.state.bgAnimated, {
        toValue: 1,
        duration: 500,
      }),
    ]).start();
  }

  render() {

    var shift = this.state._animated.interpolate({
      inputRange: [0, 1],
      outputRange: [315, 0],
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
        <View style={styles.absoluteCell}>
          <Animated.Text style={[styleguide.dark_body, {opacity: this.state.bgAnimated}]}>DELETE</Animated.Text>
        </View>
        <View style={styles.innerCell}>
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
              {this.props.date}
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
        </View>
      </Animated.View>
    </Animated.View>
    );
  }
}

const styles = StyleSheet.create({

  innerCell: {
    width: width,
    marginLeft: 116,
    backgroundColor: GLOBAL.COLOR.WHITE,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  listItem: {
    marginLeft: -132,
    paddingHorizontal: 16,
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

  gasItem: {
    flexDirection: 'column',
    marginHorizontal: 8,
  },

  absoluteCell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

});
