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
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  Platform,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import moment from 'moment';
import {
  pushFillup,
  removeFillup,
  pullFillups,
  updateMPG,
  pullAverageMPG,
  updateODO,
  pullODOReading,
  pullUserPermissions,
  pullOGODOReading,
} from '../Database/Database.js';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import { AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

// Custom components
import GasList from '../Custom/GasList';
import {InputField} from './../Custom/InputField';
import {Button} from './../Custom/Button';
import VAlert from './../Custom/VAlert';
import Settings from '../Screens/Settings';

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
      // Animation Values
      translation: new Animated.Value(1),
      transactionShift: new Animated.Value(0),
      settingsShift: new Animated.Value(1),
      fadeIn: new Animated.Value(0),
      modalFade: new Animated.Value(0),
      keyboardHeight: new Animated.Value(32),
      pageTextSize: new Animated.Value(25),
      topMargin: new Animated.Value(24),
      placeholderVisible: new Animated.Value(0),

      // item toggles for expected behavior
      scrollEnable: true,
      settingAvailable: true,

      // Input state variables
      user_paid: 0,
      user_filled: 0,
      user_ODO: 0,

      // Vars that sync with firebase
      updatedODO: 0,
      originalODO: 0,
      averageMPG: 0,
      list_i: 0,
      textDataArr: [],
      isPremium: false,
    };
  }

 /*
  * Function: openModal()
  * Author: Elton C. Rego
  * Purpose: Opens the modal to add a gas item
  */
  openTransaction() {
    Animated.spring(
      this.state.transactionShift,
      {
        toValue: 1,
        friction: 8,
      }
    ).start();
    Animated.timing(
      this.state.modalFade,
      {
        toValue: 1,
        duration: 400,
      }
    ).start();
    Animated.timing(
      this.state.fadeIn,
      {
        toValue: 0.1,
        duration: 400,
      }
    ).start();
    this.setState({
      settingAvailable: false,
    });
  }

 /*
  * Function: closeModal()
  * Author: Elton C. Rego
  * Purpose: Closes the modal to add a gas item
  */
  closeTransaction() {
    this.setState({
      settingAvailable: true,
    });
    Animated.spring(
      this.state.transactionShift,
      {
        toValue: 0,
        friction: 8,
      }
    ).start();
    Animated.timing(
      this.state.modalFade,
      {
        toValue: 0,
        duration: 400,
      }
    ).start();
    Animated.timing(
      this.state.fadeIn,
      {
        toValue: 1,
        duration: 400,
      }
    ).start();
    this.setState({modalVisible:false});
  }

  /*
   * Function: openSettings()
   * Author: Elton C. Rego
   * Purpose: Opens the settings Panel
   *
   */
  openSettings(){
    Animated.timing(
      this.state.settingsShift,
      {
        toValue: 0,
        duration: 150,
      }
    ).start();
  }

  /*
   * Function: closeSettings()
   * Author: Elton C. Rego
   * Purpose: Closes the settings Panel
   *
   */
  closeSettings(){
    Animated.timing(
      this.state.settingsShift,
      {
        toValue: 1,
        duration: 150,
      }
    ).start();
  }

  /*
   * Author: Elton C. Rego
   * Purpose: sets event listeners for the keyboard
   */
   componentWillMount () {
     this.keyboardWillShowSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', this.keyboardWillShow);
     this.keyboardWillHideSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', this.keyboardWillHide);
   }

   componentWillUnmount() {
     this.keyboardWillShowSub.remove();
     this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    if(Platform.OS === 'ios'){
      var end = (event.endCoordinates.height-64)/2+32;
      Animated.parallel([
        Animated.timing(this.state.keyboardHeight, {
          duration: event.duration,
          toValue: end,
        }),
        Animated.timing(this.state.pageTextSize, {
          duration: event.duration,
          toValue: 20,
        }),
        Animated.timing(this.state.topMargin, {
          duration: 200,
          toValue: 8,
        }),
      ]).start();
    } else {
      var end = (event.endCoordinates.height-64)/2+32;
      Animated.parallel([
        Animated.timing(this.state.keyboardHeight, {
          duration: 200,
          toValue: end,
        }),
        Animated.timing(this.state.pageTextSize, {
          duration: 200,
          toValue: 20,
        }),
        Animated.timing(this.state.topMargin, {
          duration: 200,
          toValue: 8,
        }),
      ]).start();
    }
  };

  keyboardWillHide = (event) => {
    if(Platform.OS === 'ios'){
      Animated.parallel([
        Animated.timing(this.state.keyboardHeight, {
          duration: event.duration,
          toValue: 32,
        }),
        Animated.timing(this.state.pageTextSize, {
          duration: event.duration,
          toValue: 25,
        }),
        Animated.timing(this.state.topMargin, {
          duration: 200,
          toValue: 24,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(this.state.keyboardHeight, {
          duration: 200,
          toValue: 32,
        }),
        Animated.timing(this.state.pageTextSize, {
          duration: 200,
          toValue: 25,
        }),
        Animated.timing(this.state.topMargin, {
          duration: 200,
          toValue: 24,
        }),
      ]).start();
    }
  };

 /*
  * Function: addItem()
  * Author: Elton C. Rego
  * Purpose: Adds an object to the GasList item used for gas
  *
  */
  addItem() {

    if (isNaN(this.state.user_paid) || this.state.user_paid == ""){
      this.refs.submitButton.indicateError();
      this.refs.valert.showAlert('Somethings not right...',
      'Please enter a valid total dollar amount!',
      'Ok');
      return;
    }
    if (isNaN(this.state.user_filled) || this.state.user_filled == ""){
      this.refs.submitButton.indicateError();
      this.refs.valert.showAlert('Somethings not right...',
      'Please enter a valid gallon amount!',
      'Ok');
      return;
    }
    if (isNaN(this.state.user_ODO) || this.state.user_ODO == ""){
      this.refs.submitButton.indicateError();
      this.refs.valert.showAlert('Somethings not right...',
      'Please enter a valid odometer reading!',
      'Ok');
      return;
    }

    // throw alert if user leaves any fields blank
    if (this.state.user_ODO <= this.state.updatedODO) {
      this.refs.submitButton.indicateError();
      this.refs.valert.showAlert('Somethings not right...',
      'Your odometer reading cannot go backwards or stay constant between fillups!'
      +"\nPlease verify it is correct.",
      'Ok');
      return;
    }
    else if (this.state.user_filled >= (this.state.user_ODO - this.state.updatedODO)){
      this.refs.submitButton.indicateError();
      this.refs.valert.showAlert('Somethings not right...',
      'You shouldn\'t be getting under 1 mile per gallon!'
      +"\nPlease verify your input (or buy different gas).",
      'Ok');
      return;
    }

    const distance = this.state.user_ODO - this.state.updatedODO;
    const mpg = distance/this.state.user_filled;
    const average =
      ((this.state.averageMPG * (this.state.textDataArr.length))+mpg)/(this.state.textDataArr.length+1);
    const creationDate = moment().toArray();

    this.closeTransaction();


    var newFillup = {
      list_i: this.state.list_i + 1,
      totalPrice: parseFloat(this.state.user_paid),
      date: creationDate,
      gallonsFilled: this.state.user_filled,
      odometer: this.state.user_ODO,
      distanceSinceLast: distance,
      mpg: parseInt(distance / this.state.user_filled)
    };

    Animated.timing(
      this.state.placeholderVisible,
      {
        toValue: 0,
        duration: 250,
      }
    ).start(() => {
      this.setState({
        averageMPG: average,
        updatedODO: this.state.user_ODO,
        textDataArr: [newFillup, ...this.state.textDataArr],
        user_paid: "",
        user_filled: "",
        user_ODO: "",
        list_i: this.state.list_i + 1,
      });
    });

    // Push to Firebase

    pushFillup(newFillup);
    updateMPG(average);
    updateODO(this.state.user_ODO);
  }

  /*
   * Function: removeItem()
   * Author: Elton C. Rego
   * Purpose: Removes an object to the GasList item used for gas
   *
   */
  removeItem(key){

    // We want to delete a specific Fillup from the user, based
    // on these variables
    const itemToRemove =
    this.state.textDataArr.find(function (obj){
      return obj.list_i === key;
    });
    const indexOf = this.state.textDataArr.indexOf(itemToRemove);

    const mpgRemoved = itemToRemove.distanceSinceLast
      /itemToRemove.gallonsFilled;

    const averageMPG = this.state.textDataArr.length == 1 ? 0 :
      (this.state.averageMPG * this.state.textDataArr.length - mpgRemoved)
      /(this.state.textDataArr.length - 1);

    const ODO = this.state.textDataArr.length == 1 ?  this.state.originalODO :
      this.state.textDataArr[this.state.textDataArr.length - 1].odometer;

    removeFillup(key);
    updateMPG(averageMPG);
    updateODO(ODO);

    this.state.textDataArr.pop(itemToRemove);
    if(this.state.textDataArr.length == 0){
      Animated.timing(
        this.state.placeholderVisible,
        {
          toValue: 1,
          duration: 250,
        }
      ).start();
    }
    for (var i = indexOf; i < this.state.textDataArr.length; i++){
      this.state.textDataArr[i].list_i -= 1;
    }
    this.setState({
      list_i: this.state.list_i - 1,
      averageMPG: averageMPG,
      updatedODO: ODO,
    });

  }

  // Call this to test an immediate notification.
  showLocalNotification() {
    FCM.presentLocalNotification({
      id: 'testnotif',
      vibrate: 500,
      sound: "default",
      title: 'Hello',
      body: 'This is a test',
      sub_text: 'sub text',
      priority: "high",
      show_in_foreground: true,
      group: 'test',
    });
  }

  // Call this to test a scheduled notification
  scheduleLocalNotification() {
    FCM.scheduleLocalNotification({
      id: 'testnotif-scheduled',
      fire_date: new Date().getTime()+5000,
      vibrate: 500,
      sound: "default",
      title: 'Whats up?',
      body: 'Test Scheduled Notification',
      sub_text: 'sub text',
      priority: "high",
      show_in_foreground: true,
      wake_screen: true,
      group: 'test',
    });
  }

  /*
   * Function: componentDidMount()
   * Author: Elton C. Rego
   * Purpose: Pulls all the data from firebase and loads it into the view
   *
   */
  componentDidMount() {

    FCM.removeAllDeliveredNotifications();
    FCM.setBadgeNumber(0);
    // this.showLocalNotification(); DEBUG
    // this.scheduleLocalNotification(); DEBUG

    var that = this;
    pullAverageMPG().then(function(fData){
      if(fData){
        that.setState({
          averageMPG: fData,
        });
      }
    }).catch(function(error) {
      console.log('Failed to load average mpg data into state:', error);
    });


    pullOGODOReading().then(function(fData){
      that.setState({
        originalODO: fData,
      });
    }).catch(function(error) {
      console.log('Failed to load original odometer data into state:', error);
    });

    pullODOReading().then(function(fData){
      if(fData != null){
        that.setState({
          updatedODO: fData,
        });
      } else {
        that.setState({
          updatedODO: that.state.originalODO,
        });
      }
    }).catch(function(error) {
      console.log('Failed to load odometer data into state:', error);
    });

    pullFillups().then(function(fData){
      if(fData){
        that.setState({
          textDataArr: fData,
          list_i: fData.length,
        });
      }
    }).catch(function(error) {
      console.log('Failed to load fill up data into state:', error);
    });

    pullUserPermissions().then(function(fData){
      if(fData){
        that.setState({
          isPremium: fData,
        });
      }
      Animated.timing(
        that.state.fadeIn,
        {
          toValue: 1,
          duration: 250,
        }
      ).start(() => {
        if(that.state.textDataArr.length == 0){
          Animated.timing(
            that.state.placeholderVisible,
            {
              toValue: 1,
              duration: 250,
            }
          ).start();
        }
      });
    }).catch(function(error) {
      console.log('Failed to load user permiission data into state:', error);
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

    var {height, width} = Dimensions.get('window');


    var cardTranslation = this.state.translation.interpolate({
      inputRange: [0, 1],
      outputRange: [-250, 0]
    });

    var modalBG = this.state.modalFade.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.1],
    });

    var transactionTranslation = this.state.transactionShift.interpolate({
      inputRange: [0, 1],
      outputRange: [812, 0],
    });

    var settingsTranslation = this.state.settingsShift.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width],
    });

    // Calculate the x and y transform from the pan value
    var [translateY] = [cardTranslation];
    var [translateX] = [settingsTranslation];

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    var transformList = {transform: [{translateY}]};
    var settingsList = {transform: [{translateX}]};
    // var totalTransactionTransform = transactionTranslation - this.state.keyboardHeight;
    console.log(transactionTranslation);
    var transformTransaction = {transform: [{translateY: transactionTranslation}]};

    return(
      <View style={
        [styleguide.container,
        {
          backgroundColor: GLOBAL.COLOR.DARKGRAY,
        }]
      }>
      <StatusBar barStyle="light-content"/>

        <VAlert ref="valert"/>
        <Animated.View style={[styles.settings, settingsList]}>
          <Settings closeCallBack={() => this.closeSettings()} alert={this.refs.valert}/>
        </Animated.View>

        <View style={styles.navbar}>
          <Text style={styleguide.dark_title2}>
            dashboard
            <Text style={styleguide.dark_title2_accent}>
              .
            </Text>
          </Text>
          <TouchableOpacity onPress={() => {this.openSettings();}} disabled={!this.state.settingAvailable}>
            <Animated.View style={{opacity: modalBG}}>
                <Text style={styleguide.dark_title}>
                  <FontAwesome>{Icons.gear}</FontAwesome>
                </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.no_items, {opacity: this.state.placeholderVisible}]}>
          <Image
            style={styles.placeholder}
            resizeMethod="scale"
            source={require('../../../assets/images/placeholder.png')}
          />
        <Text style={styleguide.dark_title2_secondary}>hello there!</Text>
        <Text style={[styleguide.dark_body_secondary, {textAlign: 'center'}]}>Looks like you haven't added any fill-ups yet.<Text style={{color: GLOBAL.COLOR.GREEN}}>Tap the green plus button</Text> to add your first!</Text>
        </Animated.View>

        <Animated.View style={[styles.transaction, transformTransaction]}>
          <View style={styles.modalContainer}>
            <View style={[styles.innerContainer]}>
              <Animated.Text style={[styleguide.light_title2, {width: '100%', fontSize: this.state.pageTextSize}]}>Add Transaction
                <Animated.Text style={[styleguide.light_title2_accent, {fontSize: this.state.pageTextSize}]}>.</Animated.Text>
              </Animated.Text>
              <InputField
                ref="paid"
                icon={Icons.dollar}
                label={"total amount paid for fillup"}
                labelColor={"rgba(37,50,55,0.5)"}
                inactiveColor={GLOBAL.COLOR.DARKGRAY}
                activeColor={GLOBAL.COLOR.GREEN}
                autoCapitalize={"none"}
                type={"numeric"}
                topMargin={this.state.topMargin}
                returnKeyType={'done'}
                onChangeText={(text) => {this.setState({user_paid: text})}}
                onSubmitEditing={() => {this.refs.gas.focus();}}
                value={this.state.user_paid}
              />
              <InputField
                ref="gas"
                icon={Icons.tint}
                label={"gallons filled"}
                labelColor={"rgba(37,50,55,0.5)"}
                inactiveColor={GLOBAL.COLOR.DARKGRAY}
                activeColor={GLOBAL.COLOR.GREEN}
                autoCapitalize={"none"}
                type={"numeric"}
                topMargin={24}
                returnKeyType={'done'}
                onChangeText={(text) => {this.setState({user_filled: text})}}
                onSubmitEditing={() => {this.refs.odo.focus();}}
                value={this.state.user_filled}
              />
              <InputField
                ref="odo"
                icon={Icons.automobile}
                label={"odometer reading in miles"}
                labelColor={"rgba(37,50,55,0.5)"}
                inactiveColor={GLOBAL.COLOR.DARKGRAY}
                activeColor={GLOBAL.COLOR.GREEN}
                autoCapitalize={"none"}
                type={"numeric"}
                topMargin={24}
                returnKeyType={'done'}
                onChangeText={(text) => {this.setState({user_ODO: text})}}
                onSubmitEditing={() => {this.addItem()}}
                value={this.state.user_ODO}
              />
              <Button
                ref="submitButton"
                backgroundColor={GLOBAL.COLOR.GREEN}
                label={"add item"}
                height={64}
                width={"100%"}
                shadow={false}
                marginTop={this.state.keyboardHeight}
                onPress={() => this.addItem()}
              />
              <Button
                backgroundColor={GLOBAL.COLOR.DARKBLUE}
                label={"cancel"}
                height={64}
                marginTop={16}
                width={"100%"}
                onPress={() => {
                  this.closeTransaction();
                }}
                title="Close modal"
              />
            </View>
          </View>
        </Animated.View>

        <View style={styles.content}>
          <View style={styles.graph}>
            <AreaChart
              style={ styles.areaGraph}
              data={ this.state.textDataArr }
              curve={shape.curveNatural}
              contentInset={ { top: 8} }
              showGrid={ false }
              yAccessor={({ item }) => item.mpg}
              xAccessor={({ item }) => item.list_i}
              svg={{
                stroke: GLOBAL.COLOR.GREEN,
                strokeWidth: 4,
                fill: 'rgba(184, 233, 134, 0.1)',
              }}
            />
          </View>
          <Animated.View
            style={[
              styles.card,
              transformList,
              {opacity: this.state.fadeIn}]
            }>
            <View  style={styles.statistics}>
              <View>
                <Text style={styleguide.light_subheader2}>{this.state.averageMPG.toFixed(2)}mpg</Text>
                <Text style={styleguide.light_body_secondary}>Average Efficiency</Text>
              </View>
              <View style={{alignItems:'flex-end'}}>
                <Text style={styleguide.light_subheader2}>{this.state.updatedODO}mi</Text>
                <Text style={styleguide.light_body_secondary}>Odometer</Text>
              </View>
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
              width: 56,
              height: 56,
              borderRadius: 32,
              backgroundColor: GLOBAL.COLOR.GREEN,
              shadowColor: GLOBAL.COLOR.DARKGRAY,
              shadowOpacity: 0.3,
              shadowOffset: {x: 0, y: 0},
              shadowRadius: 30,

              position: 'absolute',
              zIndex: 1,
              bottom: 16,
              right: 16,
            }
          } onPress={() => this.openTransaction()}>
          <View style={styles.floating_button}>
              <Text style={styleguide.dark_title}>
                <FontAwesome>{Icons.plus}</FontAwesome>
              </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  transaction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
  },
  settings: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
  navbar: {
    paddingTop: 32,
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
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
  areaGraph: {
    height: 250,
  },
  no_items:{
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 32,
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    opacity: 1,
  },
  placeholder: {
    width: 100,
    height: 100,
  },
  card: {
    width: '100%',
    maxHeight: '100%',
    backgroundColor: GLOBAL.COLOR.WHITE,
    zIndex: 1,
  },
  ico: {
    fontSize: 24,
    color: GLOBAL.COLOR.WHITE,
  },
  ad: {
    borderBottomWidth: 1,
    borderColor: 'rgba(37,50,55,0.50)',
  },
  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(37,50,55,0.50)',
  },


  // FOR PROTOTYPING
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: GLOBAL.COLOR.WHITE,
    zIndex: 2,
    overflow: 'visible',
  },

});
