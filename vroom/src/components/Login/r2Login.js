// Global Requirements
import React, {Component,} from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

// React Components
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

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
      <View style={STYLE.container}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.logo_container}>
          <Text style={STYLE.display2_accent_center}>vroom</Text>
          <Text style={[STYLE.dark_subheader_center, styles.sub_title]}>keep your car happy!</Text>
        </View>
        <View style={styles.form_container}>
          <TextInput 
            style={this.state.inputStyle} 
            placeholder="email"
            placeholderTextColor="rgba(255,255,255,0.6)"
          />
          <TextInput 
            style={this.state.inputStyle}
            placeholder="password"
            placeholderTextColor="rgba(255,255,255,0.6)"
          />
        </View>
      </View>  
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
  },
  sub_title: {
    marginTop: -16,
  },
});