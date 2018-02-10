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
  Modal,
  Button,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

// Custom components
import GasList from '../Custom/GasList';

/*
 * Class: Dashboard
 * Author: Elton C.  Rego
 *
 * Purpose: Be the main screen on the application
 * TODO: Add items to list
 * TODO: Remove items from list properly
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

      // Ignore these, they're for trying out modals
      // modalVisible: false,

      // Below are some dummy objects of stuff
      // we will pull from firebase
      // TODO: Pull from firebase
      averageMPG: 31.34, // update this calculation as user enters
      list_i: 0, // index should update with initial pull and increment
      textDataArr: [  // the data structure we will be using for gas
        {
          list_i: 0,
          totalPrice: '$32.50',
          date: 'February 8th, 2018',
          gallonsFilled: 8.01,
          odometer: 108562,
          distanceSinceLast: 251
        }
      ],
    };
  }

 /*
  * Function: openModal()
  * Author: Elton C. Rego
  * Purpose: Opens the modal to add a gas item
  */
  // openModel() {
  //   this.setState({modalVisible:true});
  // }

 /*
  * Function: closeModal()
  * Author: Elton C. Rego
  * Purpose: Closes the modal to add a gas item
  */
  // closeModal() {
  //   this.setState({modalVisible:false});
  // }

 /*
  * Function: addItem()
  * Author: Elton C. Rego
  * Purpose: Adds an object to the GasList item used for gas
  *
  * //TODO actually calculate the math
  */
  addItem() {

    // REPLACE fixed amount with odo reading given by user
    const distance =
    108562 - this.state.textDataArr[this.state.list_i].odometer;

    // REPLACE fixed amount with gallons filled given by user
    const mpg = distance/8.01;

    // VERIFIED THIS MATH WORKS SO KEEP IT
    const average =
      ((this.state.averageMPG * (this.state.textDataArr.length))+mpg)
      /(this.state.textDataArr.length+1);

    //this.closeModal();
    this.setState({
      averageMPG: average,
      textDataArr:
      [...this.state.textDataArr,
        {
          list_i: this.state.list_i +1,
          totalPrice: '$32.50',
          date: "February 8th, 2017",
          gallonsFilled: 8.01,
          odometer: 108562,
          distanceSinceLast: distance
        }
      ],
      list_i: this.state.list_i + 1,
    });
    // TODO: Push to Firebase
  }

  removeItem(key){
    this.state.textDataArr.splice(key, 1);
    this.setState({
      list_i: this.state.list_i -1,
    });
  }

  /*
   * Function: componentWillMount()
   * Author: Elton C. Rego
   * Purpose: Called when the component is called from the stack
   *    - sets up the pan responder for the GasList transition
   */
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


  /*
   * Function: render()
   * Author: Elton C. Rego
   * Purpose: renders the component
   *
   * @return: Component Views
   */
  render(){

    console.log(this.state.textDataArr);

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
          <Text style={styleguide.dark_title2}>
            vroom
            <Text style={styleguide.dark_title2_accent}>
              .
            </Text>
          </Text>
          <TouchableOpacity onPress={() => this.addItem()}>
            <Text style={styleguide.dark_subheader2}>
              <FontAwesome>{Icons.plus}</FontAwesome>
            </Text>
          </TouchableOpacity>
        </View>

        {/*<Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text>This is content inside of modal component</Text>
              <Button
                  onPress={() => this.addItem()}
                  title="Add Item"
              >
              </Button>
              <Button
                  onPress={() => this.closeModal()}
                  title="Close modal"
              >
              </Button>
            </View>
          </View>
        </Modal>*/}

        <View style={styles.content}>
          <View style={styles.graph}>
          </View>
          {/*...this._panResponder.panHandlers*/}
          <Animated.View
            style={[
              styles.card,
              transformList,]
            }>
            <View style={styles.mpg_statistics}>
              <Text style={styleguide.light_subheader2}>{this.state.averageMPG.toFixed(2)}mpg</Text>
              <Text style={styleguide.light_body_secondary}>Average Lifetime Efficiency</Text>
            </View>
            <GasList
              onRef={ref => (this.gaslist = ref)}
              enable={this.state.scrollEnable}
              data={this.state.textDataArr}
              average={this.state.averageMPG}
              removeItem={key => this.removeItem(key)}/>
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
    paddingHorizontal: 24,
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
  mpg_statistics: {
    padding: 16,
    borderBottomWidth: 2,
  },


  // FOR PROTOTYPING
  modalContainer: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: 'rgba(37,50,55,0.80)'
  },
  innerContainer: {
    alignItems: 'center',

    padding: 32,
    backgroundColor: GLOBAL.COLOR.WHITE,
  },

});
