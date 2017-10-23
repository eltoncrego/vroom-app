import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';

GLOBAL = require('./Globals');

export default class Revi extends Component{

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
      is_exlaiming: false,
    };
  }

  /*
   * Method: render
   * Author: Elton C. Rego 
   *
   * Purpose: Renders the Revi object.
   * 
   */
  render() {

    var exclaim = this.state.is_exlaiming ? 
      <View style={styles.exclaims}>
        <View style={styles.left_exclaim}></View>
        <View style={styles.mid_exclaim}></View>
        <View style={styles.right_exclaim}></View>
      </View>
      : null;

    return (
      <View style={styles.revi}>
        {exclaim}
        <View style={styles.torso}>
          <View style={styles.glass}>
            <View style={styles.glass_inside}>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.face}>
              <View style={styles.eyes}>
                <View style={styles.eye}>
                </View>
                <View style={styles.mouth}>
                </View>
                <View style={styles.eye}>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.wheels}>
          <View style={styles.wheel}>
          </View>
          <View style={styles.wheel}>
          </View>
        </View>
      </View>
    );
  }
}

/*
 * Styles for this Component
 * Author: Elton C. Rego
 */
const styles = StyleSheet.create({
  /*
   * Style: Revi
   * Author: Elton C. Rego
   * Purpose: This styles the revi on each card
   */
  revi: {
    marginTop: 100,
  },
  /*
   * Style: Glass
   * Author: Elton C. Rego
   * Purpose: This styles the glass on each Revi
   */
  glass_inside: {
    alignSelf: 'center',
    height: 106,
    width: 212,
    borderTopLeftRadius: 116,
    borderTopRightRadius:116,
    backgroundColor: GLOBAL.COLOR.BLUE,
    zIndex: 1,
    marginTop: 10,
  },
  /*
   * Style: Glass Border
   * Author: Elton C. Rego
   * Purpose: This styles the glass on each Revi
   */
  glass: {
    alignSelf: 'center',
    height: 116,
    width: 232,
    borderTopLeftRadius: 116,
    borderTopRightRadius:116,
    backgroundColor: GLOBAL.COLOR.DARKBLUE,
    zIndex: 1,
  },
  /*
   * Style: Wheels
   * Author: Elton C. Rego
   * Purpose: This styles the wheels on each card
   */
  wheels: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    zIndex: 1,
    width: 547/2,
    marginTop: -88,
  },
  /*
   * Style: Wheel
   * Author: Elton C. Rego
   * Purpose: This styles the wheels individually
   */
  wheel: {
    height: 96,
    width: 60,
    borderRadius: 20,
    borderWidth: 10,
    borderColor: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: GLOBAL.COLOR.GRAY,
    margin: 4,
  },
  /*
   * Style: Body
   * Author: Elton C. Rego
   * Purpose: This styles the body on each card
   */
  body: {
    alignSelf: 'center',
    width: 547/2,
    height: 210/2,
    backgroundColor: GLOBAL.COLOR.GREEN,
    borderRadius: 37/2,
    margin: 32,
    zIndex: 2,
    marginTop: -36,
  },
  /*
   * Style: Face
   * Author: Elton C. Rego
   * Purpose: This styles the body on each card
   */
  face: {
    alignSelf: 'center',
    width: 206,
  },
  /*
   * Style: Eyes
   * Author: Elton C. Rego
   * Purpose: This styles the body on each card
   */
  eyes: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 32,
  },
  /*
   * Style: Eye
   * Author: Elton C. Rego
   * Purpose: This styles the body on each card
   */
  eye: {
    width: 40,
    height: 40,
    borderRadius: 70,
    backgroundColor: GLOBAL.COLOR.BLUE,
    borderColor: GLOBAL.COLOR.GRAY,
    borderWidth: 10,
  },
  /*
   * Style: Mouth
   * Author: Elton C. Rego
   * Purpose: This styles the body on each card
   */
  mouth: {
    width: 94,
    height: 35,
    borderRadius: 70,
    borderColor: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: GLOBAL.COLOR.GRAY,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderWidth: 10,
    marginTop: 16,
  },
  /*
   * Style: Torso
   * Author: Elton C. Rego
   * Purpose: This styles the body on each card
   */
  torso: {
    zIndex: 3
  },

  exclaims:{
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 240,
    marginBottom: 0,
    zIndex: 2,
  },
  left_exclaim: {
    width: 18,
    height: 36,
    backgroundColor: GLOBAL.COLOR.GREEN,
    borderRadius: 100,
    transform:[{rotate: '-45 deg'}],
    marginTop: 40,
  },
  mid_exclaim: {
    width: 18,
    height: 36,
    backgroundColor: GLOBAL.COLOR.GREEN,
    borderRadius: 100,
  },
  right_exclaim: {
    width: 18,
    height: 36,
    backgroundColor: GLOBAL.COLOR.GREEN,
    borderRadius: 100,
    transform:[{rotate: '45 deg'}],
    marginTop: 40,
  },

});