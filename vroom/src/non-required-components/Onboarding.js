/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

// Components
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Animation from 'lottie-react-native';
import {firebaseRef, queryCars} from '../Database/Database';
import {Auth} from '../Login';
import { goTo, clearNavStack } from '../Navigation/Navigation';
// import { Dropdown } from 'react-native-material-dropdown';
// import { TextField } from 'react-native-material-textfield';

// Files Needed
import revi from '../../../assets/animations/revi-hi.json';
import revi_on from '../../../assets/animations/revi-on.json';
import revi_super_happy from '../../../assets/animations/revi-super-happy.json';
import Button from './../Custom/Button';

/*
 * Class: Onboarding
 * Author: Elton C.  Rego
 *
 * Purpose: Walks the user through naming their car and then
 *   takes in the make, model, and year of their vehicle.
 *
 * TODO: Create a Revi object
 * TODO: Animate a Revi object
 * TODO: Take in make, model, and year and end this screen
 */

export default class Onboarding extends Component {

  /*
   * Static: navigationOptions
   * Author: Elton C. Rego
   *
   * Purpose: To set the navigation bar options for this page
   */
  static navigationOptions = {
    title: 'Welcome',
    header: null,
    lockMode: 'locked-closed',
  };

  /*
   * Method: componentDidMount()
   * Author: Elton C. Rego
   *
   * Purpose: When a component specified sucessfully is rendered,
   *   it runs the action
   */
  componentDidMount() {
    console.log("Onboarding component mounted");
    this.getDropdowns(null);
    setTimeout(() => {
      if(this.scrollView != null){
        this.scrollView.scrollTo({x: -16})
      }
    }, 1);
    this.animation.play();
    this.animation2.play();
  }

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
      text: 'My Car',
      show_last_card: false,
      scroll_enabled: true,
      text_button: 'Next',
      button_switch: false,
      // user: firebaseRef.database().ref("users/"+firebaseRef.auth().currentUser.uid),
      scroll_pos: 0,
      make: "Choose year first!",
      model: "Choose make/year first!",
      year: "Getting years...",
      empty_make: "Choose year first!",
      empty_model: "Choose make/year first!",
      empty_year: "Getting years...",
      models: [],
      makes: [],
      years: [],
      dropdownsComplete: false,
      choices: null,
      array: null,
      active1: GLOBAL.COLOR.DARKGRAY,
      active2: GLOBAL.COLOR.LIGHTGRAY,
      active3: GLOBAL.COLOR.LIGHTGRAY,
    };
  }

  /*
   * Method: nameEntered()
   * Author: Elton C. Rego, Alec Felt
   *
   * Purpose: On invocation, check dropdown input,
   *          update user's database entry, show the last card,
   *          and scroll to it
   */
  nameEntered() {
    // Checks the state variables associated with the make,year,model dropdowns
    if(!(this.state.make==null) && !(this.state.model==null) && !(this.state.year==null)) {
      this.setState({show_last_card: true});
      this.scrollView.scrollTo({x: this.state.scroll_pos + 344, y:0, animated: true});
      this.setState({
        scroll_enabled: false,
        text_button: `Continue to ${this.state.text}`,
      });
      this.animation3.play();
      // populates user's Firebase entry
      firebaseRef.database().ref("users").child(Auth.getAuth().uid).child('vehicles').push({
        nickname: this.state.text,
        path: "cars/" + this.state.year + "/" + this.state.make + "/" + this.state.model,
        choices: this.state.choices,
      });
    // make,year,model dropdowns haven't been properly set
    } else {
      alert("Error: please set Make, Year, and Model dropdowns");
    }
  }

  /*
   * Method: goToScrollView()
   * Author: Teeny
   *
   * Purpose: On invocation scrolls to the next page
   *   in the onboarding
   */
  goToScrollView() {
    if(this.state.button_switch){
      Keyboard.dismiss();
      this.nameEntered();
    } else {
      if(this.state.scroll_enabled && this.state.scroll_pos != 672){
        this.scrollView.scrollTo({x: this.state.scroll_pos + 344, y: 0, animated: true});
      }
    }
  }


  handleScroll(event){
    if(event.nativeEvent.contentOffset.x == 672){
      this.setState({
        scroll_pos: event.nativeEvent.contentOffset.x,
        button_switch: true,
        text_button: 'Submit',
      })
    } else {
      this.setState({scroll_pos: event.nativeEvent.contentOffset.x});
    }
  }

  /*
   * Method: goToDashboard()
   * Author: Elton C. Rego
   *
   * Purpose: On invocation, clears the stack and navigates
   *   to the dashboard.
   */
  goToDashboard() {
     goTo(this.props.navigation, 'Dashboard');
  }

  // who is the author of this function?
  // what does it do?
  // TODO: properly comment this function
  arrayToJSON(input){
    console.log("input array");
    console.log(input);
    console.log("array type is", typeof input);
    console.log("array length is", input.length);
    console.log("input['0'] =", input['0']);


    console.log("initial JSON object");
    var retObj = [{value: input[0]}];
    console.log(retObj);
    var newObj;
    for (i = 1; i < input.length; i++){
      newObj = [{value: input[i]}];
      retObj = retObj.concat(newObj);
      console.log("concatenated object");
      console.log(retObj);
    }
    console.log("finished object");
    console.log(retObj);
    return retObj;
  }

  /*
   * Method: goToDashboard()
   * Author: Alec Felt
   *
   * Purpose: fills 1 dropdown at a time,
   *          has the ability to fill years, makes, or models
   *
   * @param: (dropdown) = specifies which dropdown was just selected
   */
  getDropdowns(dropdown){
      var path="cars", state="years";
      if(dropdown == "year" && this.state.year != this.state.empty_year){
          state = "makes";
          path = "cars/"+this.state.year;
      }else if(dropdown == "make" && this.state.make != this.state.empty_make){
          state = "models";
          path = "cars/"+this.state.year+"/"+this.state.make;
      }
      console.log("queryCars(): path: "+path);
      queryCars(path).then((drops) => {
          console.log(drops);
          var arr = [];
          for(var i = 0; i < drops.length; i++){
              arr[i] = {value: drops[i]};
          }
          this.setState({[state]: arr});
      });
  }

  /*
   * Method: render
   * Author: Elton C. Rego
   *
   * Purpose: Renders the onboarding page.
   *  There are three current cards with information about how
   *  to name your car
   *
   */
  render() {
    console.log("Onboarding: rendering");
    /*
     * Variable: last_card
     * Author: Elton C. Rego
     *
     * Purpose: Sets the value of last_card based on the
     *   boolean value of show_last_card. If true, card
     *   is visible and animation is playable, if not vise
     *   versa.
     */
    var last_card = this.state.show_last_card ?
      <View style={styles.card}>
        <Text style={STYLE.title2_center}>{this.state.text}</Text>
          <View style={styles.revi_animations}>
              <Animation
                ref={animation => {this.animation3 = animation;}}
                style={{width: '100%', height: '100%',}}
                loop={false}
                source={revi_super_happy}
              />
          </View>
        <Text style={STYLE.subheader_center}>{"I love it!"}</Text>
      </View>
      :
      <View style={{display: 'none'}}>
        <Text style={STYLE.title2_center}>{this.state.text}</Text>
          <View style={styles.revi_animations}>
              <Animation
                ref={animation => {this.animation3 = animation;}}
                style={{width: '100%', height: '100%',}}
                loop={false}
                source={revi_super_happy}
              />
          </View>
        <Text style={STYLE.subheader_center}>{"I love it!"}</Text>
      </View>;

    /*
     * Variable: next_button
     * Author: Elton C. Rego
     *
     * Purpose: Sets the value of next_button based on the
     *   boolean value of scroll_enabled. If scrolling is
     *   possible, allow button to be show, if not do not show
     *   button.
     */
    var next_button = this.state.scroll_enabled ?
      <Button
        backgroundColor={GLOBAL.COLOR.GREEN}
        label={this.state.text_button}
        width='65%'
        onPress={
            () => {
              this.goToScrollView();
            }
        }/>
      : <Button
        backgroundColor={GLOBAL.COLOR.GREEN}
        label={this.state.text_button}
        width='65%'
        onPress={
            () => {
              this.goToDashboard();
            }
        }/>;

    /*
     * Variable: year-make-model
     * Author: Tianyi Zhang
     *
     * Purpose: Data for the dropdown picker
     */
    let choices = [{
      value: 'Yes',
    }, {
      value: 'No',
    }];

    return (
      <KeyboardAvoidingView
        style={[
          STYLE.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
          }
        ]}
        behavior="padding"
      >
        <StatusBar
         barStyle="light-content"
       />
        <View style={styles.cards_container}>
        <ScrollView
          ref={(scrollView) => { this.scrollView = scrollView; }}
          style={styles.scroll}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={312+32}
          snapToAlignment={"center"}
          showsHorizontalScrollIndicator={false}
          contentInset={{
            top: 0,
            left: 16,
            bottom: 0,
            right: 16,
          }}
          scrollEnabled={this.state.scroll_enabled}
          onScroll={(event) => {this.handleScroll(event);}}
        >
          {/* Card 1 */}
          <View style={styles.card}>
            <Text style={STYLE.title2_center}>{"Hello!"}</Text>
            <View style={styles.revi_animations}>
              <Animation
                ref={animation => {this.animation = animation;}}
                style={{width: '100%', height: '100%',}}
                loop={false}
                source={revi}
              />
            </View>
            <Text style={STYLE.subheader_center}>{"I'm your car!"}</Text>
          </View>

          {/* Card 2 */}
          <View style={styles.card}>
            <Text style={STYLE.title2_center}>{"I am a:"}</Text>
            <View style={{
              backgroundColor: 'white',
              alignSelf: 'stretch',
            }}>
              <Dropdown
                label='Year'
                data={this.state.years}
                baseColor={this.state.active1}
                onChangeText={(value,index,data) => {
                  this.setState({
                    year: value,
                    dropdownsComplete: false,
                    active1: GLOBAL.COLOR.GREEN,
                    active2: GLOBAL.COLOR.DARKGRAY,
                  });
                  this.getDropdowns("year");
                }}
                itemTextStyle={{
                  fontFamily: 'Nunito',
                  fontSize: 20,
                }}
                labelStyle={{
                  fontFamily: 'Nunito',
                }}
              />
              <Dropdown
                label='Make'
                data={this.state.makes}
                baseColor={this.state.active2}
                onChangeText={(value,index,data) => {
                  this.setState({
                    make: value,
                    dropdownsComplete: false,
                    active2: GLOBAL.COLOR.GREEN,
                    active3: GLOBAL.COLOR.DARKGRAY,
                  });
                  this.getDropdowns("make");
                }}
              />
              <Dropdown
                label='Model'
                data={this.state.models}
                baseColor={this.state.active3}
                onChangeText={(value,index,data) => {
                  this.setState({
                    model: value,
                    dropdownsComplete: true,
                    active3: GLOBAL.COLOR.GREEN,
                  });
                }}
              />
            </View>
            <Text style={STYLE.subheader_center}></Text>
          </View>

          {/* Card 3 */}
          <View style={styles.card}>
            <Text style={STYLE.title2_center}>{"My name is..."}</Text>
             <View style={styles.revi_animations}>
              <Animation
                ref={animation => {this.animation2 = animation;}}
                style={{width: '100%', height: '100%',}}
                loop={true}
                source={revi_on}
              />
            </View>
            <TextInput
              style={STYLE.light_input_active}
              placeholder="Type in my name!"
              onChangeText={(text) => {this.setState({text});}}
              underlineColorAndroid={'#ffffff'}
              onSubmitEditing={ () => {
                this.nameEntered();
              }}
            />
          </View>

          {/* Card 4: Hide if no name*/}
          {last_card}
        </ScrollView>
        </View>
        {next_button}
      </KeyboardAvoidingView>
    );
  }
}

/*
 * Styles for this Page
 * Author: Elton C. Rego
 */
const styles = StyleSheet.create({

  /*
   * Style: scroll
   * Author: Elton C. Rego
   * Purpose: This styles the sizing of the cards
   *   within the scrollview
   */
  cards_container: {
    alignItems: 'center',
    height: '70%',
    width: '100%',
  },

   /*
   * Style: Card
   * Author: Elton C. Rego
   * Purpose: This styles the card view within this page
   */
  card: {
    justifyContent: 'space-between',
    height: '90%',
    width: 312,
    alignItems: 'center',
    margin: 16,
    backgroundColor: GLOBAL.COLOR.WHITE,
    borderRadius: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowRadius: 2,
    zIndex: 1,
    padding: 32,
    paddingTop: 32+16,
  },

   /*
   * Style: Revi
   * Author: Elton C. Rego
   * Purpose: This styles the Revis on each card
   */
  revi: {
    resizeMode: 'contain',
    height: 120,
    width: 120,
  },

   /*
   * Style: Revi Animations
   * Author: Elton C. Rego
   * Purpose: This styles the Revis on each card
   */
  revi_animations: {
    alignSelf: 'center',
    height: 256,
    width: 256,
    zIndex:2,
    marginTop: -32,
  },
});
