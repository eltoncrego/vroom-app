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
  KeyboardAvoidingView
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

// Custom components
import GasList from '../Custom/GasList';
import {InputField} from './../Custom/InputField';
import {Button} from './../Custom/Button';

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

      // Values for the add-gas modal
      modalVisible: false,

      // Below are some dummy objects of stuff
      // we will sync with firebase
      // TODO: sync with firebase
      user_paid: 0,
      user_filled: 0,
      user_ODO: 0,
      updatedODO: 108562,
      averageMPG: 31.34, // update this calculation as user enters
      list_i: 10, // index should update with initial pull and increment
      textDataArr: [  // the data structure we will be using for gas
        // {
        //   list_i: 0,
        //   totalPrice: 32.50,
        //   date: 'February 8th, 2018',
        //   gallonsFilled: 8.01,
        //   odometer: 108562,
        //   distanceSinceLast: 251
        // },{
        //   list_i: 1,
        //   totalPrice: 32.50,
        //   date: 'February 8th, 2018',
        //   gallonsFilled: 8.01,
        //   odometer: 108562,
        //   distanceSinceLast: 251
        // },{
        //   list_i: 2,
        //   totalPrice: 32.50,
        //   date: 'February 8th, 2018',
        //   gallonsFilled: 8.01,
        //   odometer: 108562,
        //   distanceSinceLast: 251
        // },{
        //   list_i: 3,
        //   totalPrice: 32.50,
        //   date: 'February 8th, 2018',
        //   gallonsFilled: 8.01,
        //   odometer: 108562,
        //   distanceSinceLast: 251
        // },{
        //   list_i: 4,
        //   totalPrice: 32.50,
        //   date: 'February 8th, 2018',
        //   gallonsFilled: 8.01,
        //   odometer: 108562,
        //   distanceSinceLast: 251
        // },
        // {
        //   list_i: 5,
        //   totalPrice: 32.50,
        //   date: 'February 8th, 2018',
        //   gallonsFilled: 8.01,
        //   odometer: 108562,
        //   distanceSinceLast: 251
        // },
        // {
        //   list_i: 6,
        //   totalPrice: 32.50,
        //   date: 'February 8th, 2018',
        //   gallonsFilled: 8.01,
        //   odometer: 108562,
        //   distanceSinceLast: 251
        // },
        // {
        //   list_i: 7,
        //   totalPrice: 32.50,
        //   date: 'February 8th, 2018',
        //   gallonsFilled: 8.01,
        //   odometer: 108562,
        //   distanceSinceLast: 251
        // },
        // {
        //   list_i: 8,
        //   totalPrice: 32.50,
        //   date: 'February 8th, 2018',
        //   gallonsFilled: 8.01,
        //   odometer: 108562,
        //   distanceSinceLast: 251
        // },
        // {
        //   list_i: 9,
        //   totalPrice: 32.50,
        //   date: 'February 8th, 2018',
        //   gallonsFilled: 8.01,
        //   odometer: 108562,
        //   distanceSinceLast: 251
        // },
        // {
        //   list_i: 10,
        //   totalPrice: 32.50,
        //   date: 'February 8th, 2018',
        //   gallonsFilled: 8.01,
        //   odometer: 108562,
        //   distanceSinceLast: 251
        // },
      ],
    };
  }

 /*
  * Function: openModal()
  * Author: Elton C. Rego
  * Purpose: Opens the modal to add a gas item
  */
  openModal() {
    this.setState({modalVisible:true});
  }

 /*
  * Function: closeModal()
  * Author: Elton C. Rego
  * Purpose: Closes the modal to add a gas item
  */
  closeModal() {
    this.setState({modalVisible:false});
  }

 /*
  * Function: addItem()
  * Author: Elton C. Rego
  * Purpose: Adds an object to the GasList item used for gas
  *
  * //TODO actually calculate the math
  */
  addItem() {

    if(this.state.userODO == 0 || this.state.user_filled == 0 || this.state.user_paid == 0){
      alert("Please use a valid amount");
      return;
    } else if (this.state.userODO < this.state.updatedODO) {
      alert("Your odometer reading cannot go backwards!");
      return;
    }

    const userODO = this.state.userODO;
    const distance = userODO - this.state.updatedODO;
    const mpg = distance/this.state.user_filled;
    const average =
      ((this.state.averageMPG * (this.state.textDataArr.length))+mpg)
      /(this.state.textDataArr.length+1);

    this.closeModal();

    for (var i = 0; i < this.state.textDataArr.length; i++){
      this.state.textDataArr[i].list_i++;
    }

    this.setState({
      averageMPG: average,
      updatedODO: userODO,
      textDataArr:
      [
        {
          list_i: 0,
          totalPrice: parseFloat(this.state.user_paid),
          date: "February 8th, 2017",
          gallonsFilled: this.state.user_filled,
          odometer: userODO,
          distanceSinceLast: distance
        }, ...this.state.textDataArr
      ],
      user_paid: 0,
      user_filled: 0,
      userODO: 0,
      list_i: this.state.list_i + 1,
    });

    // TODO: Push to Firebase
  }

  removeItem(key){

    const mpgRemoved = this.state.textDataArr[key].distanceSinceLast
      /this.state.textDataArr[key].gallonsFilled;

    const averageMPG = this.state.textDataArr.length == 1 ? 0 :
      (this.state.averageMPG * this.state.textDataArr.length - mpgRemoved)
      /(this.state.textDataArr.length - 1);

    const ODO = this.state.textDataArr[this.state.textDataArr.length - 1].odometer;

    this.state.textDataArr.splice(key, 1);
    console.log(this.state.textDataArr);
    for (var i = key; i < this.state.textDataArr.length; i++){
      console.log(i);
      this.state.textDataArr[i].list_i -= 1;
    }
    console.log(this.state.textDataArr);
    this.setState({
      list_i: this.state.list_i - 1,
      averageMPG: averageMPG,
      updatedODO: ODO,
    });

    // TODO: Push to firebase
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
    var cardTranslation = this.state.translation.interpolate({
      inputRange: [0, 1],
      outputRange: [-250, 0]
    });

    // Calculate the x and y transform from the pan value
    var [translateY] = [cardTranslation];

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    var transformList = {transform: [{translateY}]};

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
        </View>

        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView behavior="padding">
              <View style={[styles.innerContainer]}>
                <Text style={[styleguide.light_title2, {width: '100%'}]}>Add Transaction
                  <Text style={styleguide.light_title2_accent}>.</Text>
                </Text>
                <InputField
                  autoFocus={true}
                  icon={Icons.dollar}
                  label={"amount paid in dollars"}
                  labelColor={"rgba(37,50,55,0.5)"}
                  inactiveColor={GLOBAL.COLOR.DARKGRAY}
                  activeColor={GLOBAL.COLOR.GREEN}
                  autoCapitalize={"none"}
                  type={"numeric"}
                  topMargin={24}
                  onChangeText={(text) => {this.setState({user_paid: text})}}
                />
                <InputField
                  icon={Icons.tint}
                  label={"gallons filled"}
                  labelColor={"rgba(37,50,55,0.5)"}
                  inactiveColor={GLOBAL.COLOR.DARKGRAY}
                  activeColor={GLOBAL.COLOR.GREEN}
                  autoCapitalize={"none"}
                  type={"numeric"}
                  topMargin={24}
                  onChangeText={(text) => {this.setState({user_filled: text})}}
                />
                <InputField
                  icon={Icons.automobile}
                  label={"odometer reading in miles"}
                  labelColor={"rgba(37,50,55,0.5)"}
                  inactiveColor={GLOBAL.COLOR.DARKGRAY}
                  activeColor={GLOBAL.COLOR.GREEN}
                  autoCapitalize={"none"}
                  type={"numeric"}
                  topMargin={24}
                  onChangeText={(text) => {this.setState({userODO: text})}}
                />
                <Button
                  backgroundColor={GLOBAL.COLOR.GREEN}
                  label={"Add Item"}
                  height={64}
                  marginTop={64}
                  shadowColor={GLOBAL.COLOR.GREEN}
                  width={"100%"}
                  onPress={() => this.addItem()}
                >
                </Button>
                <Button
                  backgroundColor={GLOBAL.COLOR.GRAY}
                  label={"Cancel"}
                  height={64}
                  marginTop={24}
                  shadowColor={'rgba(0,0,0,0)'}
                  width={"100%"}
                  onPress={() => this.closeModal()}
                  title="Close modal"
                >
                </Button>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>

        <View style={styles.content}>
          <View style={styles.graph}>
          </View>
          {/* Uncomment inside and move to within animated.view to enable swipable*/}
          {/*...this._panResponder.panHandlers*/}
          <Animated.View
            style={[
              styles.card,
              transformList,]
            }>
            <View style={styles.mpg_statistics}>
              <Text style={styleguide.light_subheader2}>{this.state.averageMPG.toFixed(2)}mpg</Text>
              <Text style={styleguide.light_body_secondary}>Average Efficiency</Text>
            </View>
            <GasList
              onRef={ref => (this.gaslist = ref)}
              enable={this.state.scrollEnable}
              data={this.state.textDataArr}
              average={this.state.averageMPG.toFixed(2)}
              removeItem={key => this.removeItem(key)}/>
          </Animated.View>
        </View>


        <TouchableOpacity style={
            {
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: GLOBAL.COLOR.GREEN,
              shadowColor: GLOBAL.COLOR.DARKGRAY,
              shadowOpacity: 0.3,
              shadowOffset: {x: 0, y: 0},
              shadowRadius: 30,

              position: 'absolute',
              zIndex: 2,
              bottom: 32,
              right: 32,
            }
          } onPress={() => this.openModal()}>
          <View style={styles.floating_button}>
              <Text style={styleguide.dark_title2}>
                <FontAwesome>{Icons.plus}</FontAwesome>
              </Text>
          </View>
        </TouchableOpacity>
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
  floating_button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
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
    maxHeight: 578,
    backgroundColor: GLOBAL.COLOR.WHITE,
    zIndex: 1,
  },
  ico: {
    fontSize: 24,
    color: GLOBAL.COLOR.WHITE,
  },
  mpg_statistics: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(37,50,55,0.50)',
  },


  // FOR PROTOTYPING
  modalContainer: {
    flex: 1,
    justifyContent: 'center',

    padding: 16,
    backgroundColor: 'rgba(37,50,55,0.90)'
  },
  innerContainer: {
    alignItems: 'center',
    padding: 32,
    borderRadius: 16,
    backgroundColor: GLOBAL.COLOR.WHITE,
  },

});
