/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, {Component} from 'react';
GLOBAL = require('../../Globals');

// Components
import { 
  SignedOut,
  SignedIn,
} from "../Navigation/Router";
import {
  AppRegistry,
} from 'react-native';
import {firebaseRef} from '../Database/Database';


export default class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
     var that = this;
     firebaseRef.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        that.setState({signedIn: true, checkedSignIn: true});
      } else {
        // No user is signed in.
        that.setState({signedIn: false, checkedSignIn: true});
      }
    });
  }

  render() {
    if (!this.state.checkedSignIn) {
      return null;
    }
    if (this.state.signedIn) {
      return <SignedIn/>;
    } else {
      return <SignedOut/>;
    }
  }
}

