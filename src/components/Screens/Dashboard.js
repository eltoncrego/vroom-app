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
  getCurCar,
  pushFillup,
  removeFillup,
  pullFillups,
  updateMPG,
  pullAverageMPG,
  updateODO,
  pullODOReading,
  pullUserPermissions,
  pullOGODOReading,
  pullNickname,
  pullCars,
} from '../Database/Database.js';
import dateFns from 'date-fns';

// Custom components
import GasList from '../Custom/GasList';
import {InputField} from './../Custom/InputField';
import {Button} from './../Custom/Button';
import VroomAlert from './../Custom/VroomAlert';
import Notifications from './../Custom/Notifications';
import Settings from '../Screens/Settings';
import {goTo} from '../Navigation/Navigation';


// Graph components
import MPGGraph from '../GasGraph/MPGGraph';

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
      translation: new Animated.Value(0),
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
      graphShown: false,
      graphToggleable: true,

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

      // static text
      header_text: "Dashboard",
    };
    // event listener to detect orientation changes
    Dimensions.addEventListener('change', () => {
      let value = this.isLandscape();
      this.setState({
        landscape: value,
      });
        console.log("Is the phone now landscape? " + this.state.landscape);
    });
  }

 /*
  * Function: openTransaction()
  * Author: Elton C. Rego
  * Purpose: Opens the transaction panel to add a gas item
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
  * Function: closeTransaction()
  * Author: Elton C. Rego
  * Purpose: Closes the transaction panel to add a gas item
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
    this.setState({
      modalVisible:false,
    });
    this.refs.paid.clear();
    this.refs.gas.clear();
    this.refs.odo.clear();
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
  * Function: componentWillMount
  * Author: Elton C. Rego
  * Purpose: sets event listeners for the keyboard
  */
  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', this.keyboardWillHide);
  }

  /*
  * Function: componentWillUnmount
  * Author: Elton C. Rego
  * Purpose: sets event listeners for the keyboard
  */
  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  /*
  * Event Listener: keyboardWillShow
  * Author: Elton C. Rego
  * Purpose: called when the keyboard shows and scales the elements on
  *   the page in order to account for the new keyboard
  */
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

  /*
  * Event Listener: keyboardWillHide
  * Author: Elton C. Rego
  * Purpose: called when the keyboard hides and scales the elements on
  *   the page in order to account for the lack of keyboard
  */
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

    this.setState({
      user_paid: parseFloat(this.state.user_paid),
      user_filled: parseFloat(this.state.user_filled),
      user_ODO: parseFloat(this.state.user_ODO),
    });

    if (isNaN(this.state.user_paid) || this.state.user_paid == ""){
      this.refs.submitButton.indicateError();
      this.refs.vroomAlert.showAlert('Somethings not right...',
      'Please enter a valid total dollar amount!',
      'Ok');
      return;
    }
    if (isNaN(this.state.user_filled) || this.state.user_filled == ""){
      this.refs.submitButton.indicateError();
      this.refs.vroomAlert.showAlert('Somethings not right...',
      'Please enter a valid gallon amount!',
      'Ok');
      return;
    }
    if (isNaN(this.state.user_ODO) || this.state.user_ODO == ""){
      this.refs.submitButton.indicateError();
      this.refs.vroomAlert.showAlert('Somethings not right...',
      'Please enter a valid odometer reading!',
      'Ok');
      return;
    }

    // throw alert if user leaves any fields blank
    if (this.state.user_ODO <= this.state.updatedODO) {
      this.refs.submitButton.indicateError();
      this.refs.vroomAlert.showAlert('Somethings not right...',
      'Your odometer reading cannot go backwards or stay constant between fillups!'
      +"\nPlease verify it is correct.",
      'Ok');
      return;
    }
    else if (this.state.user_filled >= (this.state.user_ODO - this.state.updatedODO)){
      this.refs.submitButton.indicateError();
      this.refs.vroomAlert.showAlert('Somethings not right...',
      'You shouldn\'t be getting under 1 mile per gallon!'
      +"\nPlease verify your input (or buy different gas).",
      'Ok');
      return;
    }

    const distance = parseFloat(this.state.user_ODO) - this.state.updatedODO;
    const mpg = distance/parseFloat(this.state.user_filled);
    const average =
      ((this.state.averageMPG * (this.state.textDataArr.length))+mpg)/(this.state.textDataArr.length+1);
    const averageDistance =
      ((this.state.averageDistanceBtwnFillups * (this.state.textDataArr.length))+distance)/(this.state.textDataArr.length+1);
    const averageCost =
      ((this.state.averageFillupCost * (this.state.textDataArr.length))+this.state.user_paid)/(this.state.textDataArr.length+1);
    const creationDate = moment().toArray();

    this.closeTransaction();


    var newFillup = {
      list_i: this.state.list_i + 1,
      totalPrice: parseFloat(this.state.user_paid),
      date: creationDate,
      gallonsFilled: parseFloat(this.state.user_filled),
      odometer: parseFloat(this.state.user_ODO),
      distanceSinceLast: distance,
    };

    this.refs.paid.clear();
    this.refs.gas.clear();
    this.refs.odo.clear();

    Animated.timing(
      this.state.placeholderVisible,
      {
        toValue: 0,
        duration: 250,
      }
    ).start(() => {
      this.setState({
        averageMPG: average,
        averageDistanceBtwnFillups: averageDistance,
        averageFillupCost: averageCost,
        updatedODO: this.state.user_ODO,
        textDataArr: [newFillup, ...this.state.textDataArr],
        user_paid: "",
        user_filled: "",
        user_ODO: "",
        list_i: this.state.list_i + 1,
        graphToggleable: this.state.list_i + 1 >= 5 ? true : false,
      });
    });

    // Push to Firebase

    pushFillup(newFillup);
    updateMPG(average);
    updateODO(parseFloat(this.state.user_ODO));

    // redraw the graph

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

    // const distanceRemoved = itemToRemove.

    const averageMPG = this.state.textDataArr.length == 1 ? 0 :
      (this.state.averageMPG * this.state.textDataArr.length - mpgRemoved)
      /(this.state.textDataArr.length - 1);

    // const averageDistance =
    //   ((this.state.averageDistanceBtwnFillups * (this.state.textDataArr.length))+distance)/(this.state.textDataArr.length+1);
    // const averageDistance = this.state.textDataArr.length == 1 ? 0 :
    //   (this.state.averageDistanceBtwnFillups - this.state.textDataArr.length - distanceRemoved)
    //   /(this.state.textDataArr.length - 1);

    // const averageCost =
    //   ((this.state.averageFillupCost * (this.state.textDataArr.length))+totalPrice)/(this.state.textDataArr.length+1);


    const ODO = this.state.textDataArr.length == 1 ?  this.state.originalODO :
      this.state.textDataArr[1].odometer;

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
      graphToggleable: this.state.list_i - 1 >= 5 ? true : false,
      averageMPG: averageMPG,
      updatedODO: ODO,
    });
    if(key == 5){
      Animated.timing(
        this.state.translation,
        {
          toValue: 0,
          duration: 200,
        }
      ).start();
    }
    // redraw the graph

  }

  /*
   * Function: refreshData()
   * Author: Elton C. Rego & Connick Shields
   * Purpose: loads all data from Firebase
   *
   */

  refreshData(){
    var that = this;
    that.setState({
      averageMPG: 0,
    });
    getCurCar().then(function(){
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

      pullNickname().then(function(fData){
        that.setState({
          nickname: fData,
        });
        that.setState({
          header_text: that.state.nickname,
        });
      }).catch(function(error) {
        console.log('Failed to load nickname data into state:', error);
      });

      pullFillups().then(function(fData){
        if(fData){
          that.setState({
            textDataArr: fData,
            list_i: fData.length,
            graphToggleable: fData.length >= 5 ? true : false,
          });
        }

        if(that.state.textDataArr.length == 0){
          Animated.timing(
            that.state.placeholderVisible,
            {
              toValue: 1,
              duration: 250,
            }
          ).start();
        } else {
          Animated.timing(
            that.state.placeholderVisible,
            {
              toValue: 0,
              duration: 250,
            }
          ).start();
        }

        // Use this line in release
        const notif = new Notifications();
        notif.requestPermission();

        if (fData.length <= 1){
          notif.scheduleLocalNotification(604800000, 'Running a little dry?', 'Dont forget to add your latest fillup!', 'sub text', 'weekreminder-scheduled');
        } else {
          notif.scheduleAveragedNotification(fData);
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
        console.log('Failed to load user permission data into state:', error);
      });
    }).catch(function(error) {
      console.log('Failed to load user permission data into state:', error);
    });
  }

  /*
   * Function: componentDidMount()
   * Author: Elton C. Rego
   * Purpose: calls refreshData()
   *
   */
  componentDidMount() {
    this.refreshData();
  }

  /*
  * Function: toggleGraph()
  * Author: Elton C. Rego
  * Purpose: animates a shift of the gas items up and down
  */
  toggleGraph(){
    const that = this;
    if (this.state.graphShown){
      this.setState({
        graphToggleable: false,
      });
      Animated.timing(
        this.state.translation,
        {
          toValue: 0,
          duration: 200,
        }
      ).start(() => {
        that.setState({
          graphToggleable: true,
          graphShown: false,
        });
      });
    } else {
      this.setState({
        graphToggleable: false,
      });
      Animated.timing(
        this.state.translation,
        {
          toValue: 1,
          duration: 200,
        }
      ).start(() => {
        that.setState({
          graphToggleable: true,
          graphShown: true,
        });
      });
    }
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
      "jan", "feb", "mar",
      "apr", "may", "jun", "jul",
      "aug", "sep", "oct",
      "nov", "dec"
    ];

    var day = date[2];
    var monthIndex = date[1];
    const returnValue = monthNames[monthIndex] + ' ' + day;
    return returnValue
  }

  /*
  * Function: createDateObject()
  * Author: Elton C. Rego
  * Purpose: Returns a date objecy based on the given date json
  *   in an array format
  *
  * @param: date - a date object formatted in array scope
  */
  createDateObject(date){
    var year = date[0];
    var month = date[1];
    var day = date[2];
    var hours = date[3];
    var mins = date[4];
    var seconds = date[5];
    const returnValue = dateFns.setHours(new Date(year, month, day), hours, mins, seconds);
    return returnValue;
  }

    /* Function: isLandscape
    *  Author: Will Coates
    *  Detects if the phone is oriented in landscape mode
    *  Borrowed from: https://shellmonger.com/2017/07/26/handling-orientation-changes-in-react-native/
    */
    isLandscape(){
        let dim = Dimensions.get('screen');
        let returnVal = (dim.width >= dim.height)
        //console.log((returnVal ? "phone is landscape" : "phone is portrait"));
        return returnVal;
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
      outputRange: [-200, 0]
    });

    var cardHeight = this.state.translation.interpolate({
      inputRange: [0,1],
      outputRange: ['100%', '65.5%'],
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
    var transformTransaction = {transform: [{translateY: transactionTranslation}]};

    const HorizontalLine = (({ y }) => (
      <Line
        key={this.state.averageMPG}
        x1={ '0%' }
        x2={ '100%' }
        y1={ y(50) }
        y2={ y(50) }
        stroke={GLOBAL.COLOR.LIGHTGRAY}
        strokeDasharray={ [ 4, 4 ] }
        strokeWidth={ 2 }
      />
    ))

    /* Average MPG Label to attach to horizontal line */

      const AverageLabel = (({ x, y }) => (
      <Text
        key={this.state.averageMPG}
        //x={x(200)}
        //y={y(50)}
        dx={90}
        dy={100}
        style={[styleguide.dark_body_secondary, {zIndex: 1}]}
        textAnchor={'middle'}
      >
        {"Average = " + Math.round(this.state.averageMPG) + " MPG"}
      </Text>
      ))

    // props to hand to MPG Graph
    const graphProps = {};
    graphProps.data = this.state.textDataArr;
    graphProps.xAccessor = (item) => this.createDateObject(item.date);
    graphProps.yAccessor = (item) => (item.distanceSinceLast / item.gallonsFilled);


  if(this.state.landscape){
    return(
      <View style={
        [styleguide.container,
        {
          backgroundColor: GLOBAL.COLOR.DARKGRAY,
        }]
      }>
        <Animated.View style={[styles.graph,{opacity: this.state.translation}]}>
          <MPGGraph ref="MPGGraph" {...graphProps} />
        </Animated.View>
      </View>
      );
  }

  else{

    return(

      <View style={
        [styleguide.container,
        {
          backgroundColor: GLOBAL.COLOR.DARKGRAY,
        }]
      }>
      <StatusBar barStyle="light-content"/>

        <VroomAlert ref="vroomAlert"/>
        <Animated.View style={[styles.settings, settingsList]}>
          <Settings
            closeCallBack={() => {
              this.closeSettings();
              this.refreshData();
            }}
            addCallBack={() => {
              goTo(this.props.navigation, 'AddCar');
            }}
            alert={this.refs.vroomAlert}/>
        </Animated.View>

        <View style={styles.navbar}>
          <Text style={styleguide.dark_title2}>
            {this.state.header_text}
            <Text style={styleguide.dark_title2_accent}>
              .
            </Text>
          </Text>
          <TouchableOpacity onPress={() => {this.openSettings();}} disabled={!this.state.settingAvailable}>
            <Animated.View style={{opacity: modalBG}}>
                <Text style={styleguide.dark_title}>
                  <FontAwesome>{Icons.bars}</FontAwesome>
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
          <Text style={[styleguide.dark_body_secondary, {textAlign: 'center'}]}>Looks like you haven't added any fill-ups yet. <Text style={{color: GLOBAL.COLOR.GREEN}}>Tap the green plus button</Text> to add your first!</Text>
          <Text></Text>
          <Text style={[styleguide.dark_body_secondary, {textAlign: 'center'}]}>Or you could <Text style={{color: GLOBAL.COLOR.GREEN}}>tap the green map button</Text> to plan a trip</Text>
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
          <Animated.View style={[styles.graph,{opacity: this.state.translation}]}>
              <MPGGraph {...graphProps} />
          </Animated.View>
            <Animated.View
              style={[
                styles.card,
                transformList,
                {
                  opacity: this.state.fadeIn,
                  maxHeight: cardHeight,
                }]
              }>
              <TouchableOpacity onPress={() => this.toggleGraph()} disabled={!this.state.graphToggleable}>
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
              </TouchableOpacity>
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
              right: 80,
            }
          } onPress={() => {goTo(this.props.navigation, 'MapScreen');}}>
          <View style={styles.floating_button}>
            <Text style={styleguide.dark_title}>
              <FontAwesome>{Icons.map}</FontAwesome>
            </Text>
          </View>
        </TouchableOpacity>

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
    /* try explicit width */
    //width: 100,
    height: 200,
    //flexDirection: 'row',
  },
  areaGraph: {
    height: 200,
    zIndex: -1,
    flexDirection: 'column',
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
