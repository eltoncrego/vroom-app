/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
stylesheet = require('../../global-styles');

// Components
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class VAlert extends Component {
 /*
  * Author: Elton C. Rego
  * Purpose: Set up state for this specific component
  */
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      alertTitle: "Alert!",
      alertBody: "",
      buttonText: "OK",
    };
  }

  fireVAlert(alertBody, alertTitle, buttonText) {
    this.setState({
      modalVisible: true,
      alertBody: alertBody,
      alertTitle: alertTitle,
      buttonText: buttonText,
    });
  }

  disableVAlert(){
    this.setState({
      modalVisible: false,
    });
  }

  render({
    alertText,
  } = this.props){

    var body_section = (this.state.alertBody == "") ? null :
    <View style={styles.alert_body_container}>
      <Text style={styleguide.light_body}>{this.state.alertBody}</Text>
    </View>;

    return (
      <Modal
        visible={this.state.modalVisible}
        animationType={'fade'}
        transparent={true}>
        <View style={styles.main_container}>
          <View style={styles.alert_header_container}>
            <Text style={styleguide.dark_subheader2}>{this.state.alertTitle}</Text>
          </View>
          {body_section}
          <TouchableOpacity style={styles.confirm_button} onPress={() => {this.disableVAlert()}}>
            <Text style={styleguide.light_body2}>{this.state.buttonText}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(37,50,55,0.90)',
  },
  alert_header_container: {
    backgroundColor: GLOBAL.COLOR.RED,
    width: '75%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert_body_container: {
    backgroundColor: GLOBAL.COLOR.WHITE,
    width: '75%',
    paddingHorizontal: 32,
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirm_button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 2,
    borderColor: GLOBAL.COLOR.RED,
    backgroundColor: GLOBAL.COLOR.WHITE,
    paddingVertical: 16,
    opacity: 0.9,
  }
});
