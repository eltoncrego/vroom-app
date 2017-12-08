// Global Requirements
import React, {Component,} from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

// React Components
import {
  View,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const bg = require('./../../../assets/img/login-bg.jpg')

export default class r2Login extends Component {

 /*
  * Author: Elton Rego
  * Purpose: Set up state for this specific component
  */
  constructor(props) {
    super(props);
    this.state = {
      input_style: STYLE.input_inactive,
      sign_up: false,
    };
  }

  componentDidMount() {
    console.log("r2Login component successfuly mounted.");
  }

  toggleSignUp(){
    this.setState({
      sign_up: !this.state.sign_up,
    });
  }

 /*
  * Author: Elton C. Rego
  * Purpose: render the login component
  */
  render() {

    var pw_confirm_field = this.state.sign_up ?
      <TextInput 
        style={this.state.input_style}
        placeholder="re-enter password"
        placeholderTextColor="rgba(255,255,255,0.6)"
        autoCapitalize="none"
        secureTextEntry={true}
      /> : null ;

    var signup_link_text = this.state.sign_up ?
      "Have an account with us? Sign in!" : "Don't have an account? Sign up!" ;

    return (
      <ImageBackground 
          style={[
            {
              width: '100%',
              height: '100%',
            }]
          }
      source={bg}>
      <View style={[
        STYLE.container,
        styles.scrim]}>
          <StatusBar barStyle="light-content"/>
          <View style={styles.logo_container}>
            <Text style={STYLE.display2_accent_center}>vroom</Text>
            <Text style={[STYLE.dark_subheader_center, styles.sub_title]}>keep your car happy!</Text>
          </View>
          <KeyboardAvoidingView 
            style={styles.form_container}
            behavior="padding">
            <TextInput 
              style={this.state.input_style} 
              placeholder="email"
              placeholderTextColor="rgba(255,255,255,0.6)"
              autoCapitalize="none"
            />
            <TextInput 
              style={this.state.input_style}
              placeholder="password"
              placeholderTextColor="rgba(255,255,255,0.6)"
              autoCapitalize="none"
              secureTextEntry={true}
            />
            {pw_confirm_field}
            <TouchableOpacity style={STYLE.green_button_container}>
              <Text style={STYLE.green_button_text}>sign in!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleSignUp()}>
              <Text style={STYLE.normal_link_text}>{signup_link_text}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
      </View>
      </ImageBackground>  
    );
  }

}

const styles = StyleSheet.create({
  logo_container:{
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  form_container:{
    padding: 32,
    marginBottom: 32,
  },
  scrim:{
    backgroundColor: "rgba(37,50,55,0.8)",
  },
  sub_title: {
    marginTop: -16,
  },
});