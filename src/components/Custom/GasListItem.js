/* Import all the necessary components for this page. Please delete components that aren't used. */

// Global Requirements
import React, {PureComponent} from 'react';
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

import FontAwesome, {Icons} from 'react-native-fontawesome';

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
        if (this.props.allowDeleteOn == this.props.index) {
          if (gestureState.dx < -35) {
            this.setScrollViewEnabled(false);
            let newX = gestureState.dx + this.gestureDelay;
            position.setValue({x: newX, y: 0});
          }
          if (gestureState.dx < -150) {
            Animated.sequence([Animated.timing(this.state.bgAnimated, {
                toValue: 1,
                duration: 25
              })]).start();
          } else {
            Animated.timing(this.state.bgAnimated, {
              toValue: 0,
              duration: 25
            }).start();
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this.props.allowDeleteOn == this.props.index) {
          if (gestureState.dx > -150) {
            Animated.timing(this.state.position, {
              toValue: {
                x: 0,
                y: 0
              },
              duration: 150
            }).start(() => {
              this.setScrollViewEnabled(true);
            });
          } else {
            Animated.timing(this.state.position, {
              toValue: {
                x: -width,
                y: 0
              },
              duration: 300
            }).start(() => {
              this.props.success(this.props.index);
              position.setValue({x: 0, y: 0});
              this.setScrollViewEnabled(true);
            });
          }
        }
      }
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
      expansionDisplay: 'none'
    };
  }

  setScrollViewEnabled(enabled) {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }

  componentWillMount() {
    var mpg = parseFloat((this.props.distanceSinceLast / this.props.gallonsFilled).toFixed(2));
    this.setState({
      diff: mpg - this.props.average
    });

    if (mpg == this.props.average) {
      console.log("EQUAL " + mpg + " vs " + this.props.average);
      this.setState({icon: Icons.minus, color: GLOBAL.COLOR.YELLOW});
    } else if (mpg < this.props.average) {
      console.log("LESS THAN " + mpg + " vs " + this.props.average);
      this.setState({icon: Icons.chevronDown, color: GLOBAL.COLOR.RED, expandedTitle: "Below Average Fillup"});
    } else {
      console.log("MORE THAN " + mpg + " vs " + this.props.average);
      this.setState({icon: Icons.chevronUp, color: GLOBAL.COLOR.GREEN, expandedTitle: "Above Average Fillup"});
    }
  }

  componentDidMount() {
    Animated.sequence([Animated.timing(this.state._animated, {
        toValue: 1,
        duration: 250 + 1 / this.props.index * 250
      })]).start();
  }

  formatDate(date) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var day = date[2];
    var monthIndex = date[1];
    var year = date[0];

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
  }

  _setMaxHeight(event) {
    this.setState({maxHeight: event.nativeEvent.layout.height});
  }

  _setMinHeight(event) {
    this.setState({minHeight: event.nativeEvent.layout.height});
  }

  toggle() {
    this.setState({pressable: false})
    const that = this;
    if (this.state.expanded) {
      Animated.parallel([
        Animated.timing(that.state.expansion, {
          toValue: 0,
          duration: 300
        }),
        Animated.spring(that.state._spin, {
          toValue: 0,
          duration: 300
        })
      ]).start();
      setTimeout(function() {
        that.setState({expanded: false, expansionDisplay: 'none', pressable: true});
      }, 300);
    } else {
      that.setState({expansionDisplay: 'flex'})
      Animated.parallel([
        Animated.timing(that.state.expansion, {
          toValue: 1,
          duration: 300
        }),
        Animated.spring(that.state._spin, {
          toValue: 1,
          duration: 300
        })
      ]).start(function() {
        that.setState({expanded: true, pressable: true});
      });
    }
  }

  render() {

    var shift = this.state._animated.interpolate({
      inputRange: [
        0, 1
      ],
      outputRange: [width, 0]
    });

    var colorShift = this.state.bgAnimated.interpolate({
      inputRange: [
        0, 1
      ],
      outputRange: [GLOBAL.COLOR.DARKGRAY, GLOBAL.COLOR.RED]
    });

    var expand = this.state.expansion.interpolate({
      inputRange: [
        0, 1
      ],
      outputRange: [0, 400]
    });

    var _spinRotation = this.state._spin.interpolate({
      inputRange: [
        0, 1
      ],
      outputRange: ['0deg', '360deg']
    });

    return (<Animated.View style={[
        ,
        styles.listItem, {
          backgroundColor: colorShift
        }
      ]}>
      <Animated.View style={[
          this.state.position.getLayout(), {
            transform: [
              {
                translateX: shift
              }
            ]
          }
        ]} {...this.panResponder.panHandlers}>
        <View style={styles.innerCell}>
          <TouchableOpacity onPress={() => this.toggle()} disabled={!this.state.pressable}>
            <Animated.View style={styles.topCell} onLayout={this._setMinHeight.bind(this)}>
              <Animated.View style={[
                  styles.change, {
                    transform: [
                      {
                        rotateZ: _spinRotation
                      }
                    ]
                  }
                ]}>
                <Animated.Text style={[
                    styles.ico, {
                      color: this.state.color
                    }
                  ]}>
                  <FontAwesome>{this.state.icon}</FontAwesome>
                </Animated.Text>
              </Animated.View>
              <View style={[
                  styles.gasItem, {
                    flex: 1
                  }
                ]}>
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
                  {(this.props.distanceSinceLast / this.props.gallonsFilled).toFixed(2)}mpg
                </Text>
                <Text style={styleguide.light_caption_secondary}>
                  Efficiency
                </Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
          <Animated.View style={[
              styles.expandedCell, {
                maxHeight: expand,
                opacity: this.state.expansion,
                display: this.state.expansionDisplay
              }
            ]} onLayout={this._setMaxHeight.bind(this)}>
            <Text style={[styleguide.light_subheader2]}>
              {this.state.expandedTitle}<Text style={{
        color: this.state.color
      }}>.</Text>
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
          <Animated.Text style={[
              styleguide.dark_title, {
                opacity: this.state.bgAnimated,
                paddingLeft: 16
              }
            ]}>
            <FontAwesome>{Icons.trash}</FontAwesome>
          </Animated.Text>
        </View>
      </Animated.View>
    </Animated.View>);
  }
}

const styles = StyleSheet.create({

  innerCell: {
    width: width,
    marginRight: 100,
    backgroundColor: GLOBAL.COLOR.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 8
  },

  topCell: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  expandedCell: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: GLOBAL.COLOR.LIGHTGRAY
  },

  gasItem: {
    flexDirection: 'column'
  },

  expandedItems: {
    width: '100%',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  listItem: {
    marginRight: -100,
    justifyContent: 'center'
  },

  change: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },

  gasItem: {
    flexDirection: 'column',
    margin: 8
  },

  ico: {
    fontSize: 16
  },
  absoluteCell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
