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
      inputStyle: STYLE.input_inactive,
    };
  }

  componentDidMount() {
    console.log("r2Login component successfuly mounted.");
  }

  onFocus() {
    this.setState({
        inputStyle: STYLE.input_active,
    })
  }

 /*
  * Author: Elton C. Rego
  * Purpose: render the login component
  */
  render() {
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
              style={this.state.inputStyle} 
              placeholder="email"
              placeholderTextColor="rgba(255,255,255,0.6)"
              autoCapitalize="none"
            />
            <TextInput 
              style={this.state.inputStyle}
              placeholder="password"
              placeholderTextColor="rgba(255,255,255,0.6)"
              autoCapitalize="none"
              secureTextEntry={true}
            />
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