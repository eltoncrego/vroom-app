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
  Text,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export class VAlert extends Component {
 /*
  * Author: Elton C. Rego
  * Purpose: Set up state for this specific component
  */
  constructor() {
    super();
    this.state = {
      modal_visible: false,
    };
  }

  render({
    alertText,
  } = this.props){
    return (
      <Modal
        visible={this.state.modal_visible}
        animationType={'slide'}
        transparent={true}>
        <Text>Hello</Text>
      </Modal>
    );
  }
}
