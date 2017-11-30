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
  SignedUp,
} from "../Navigation/Router";

import Loading from '../Screens/Loading';
import {firebaseRef} from '../Database/Database';

/*
 * Class: Auth
 * Author: Elton C. Rego
 * Purpose: Checks whether the user is already logged in or not
 *   and routes them to the correct state of the applciation
 *   SignedIn if they are; SignedOut if they arent
 */
export default class Auth extends Component {

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
      signedIn: false,
      checkedSignIn: false,
      onboarding: true,
    };
  }

  /*
   * Method: componentWillMount()
   * Author: Elton C. Rego
   *
   * Purpose: Will reference the database to check if the user is
   *   logged in when this component is called to be mounted in the
   *   view. Sets the state variables with the appropriate values.
   */
  componentWillMount() {
     var that = this;
     firebaseRef.auth().onAuthStateChanged(function(user) {
      if (user) {
        var ref = firebaseRef.firestore().collection("users").doc(user.uid).collection("vehicles");
        ref.doc("1").get().then(function(doc) {
          if (doc.exists) {
            that.setState({onboarding: false, signedIn: true, checkedSignIn: true});
          } else {
            console.log("No such document!");
            that.setState({onboarding: true, signedIn: true, checkedSignIn: true});
          }
        }).catch(function(error) {
          console.log("Error getting document:", error.message);
        });
      } else {
        // No user is signed in.
        that.setState({signedIn: false, checkedSignIn: true});
      }
    });
  }

  componentDidMount() {
    console.log("Auth component mounted");
    this.render();
  }

  /*
   * Method: render()
   * Author: Elton C. Rego
   *
   * Purpose: References the state variables and loades the correct
   *   application view based on the status of the login
   */
  render() {

    if (!this.state.checkedSignIn) {
      // HERE WOULD BE A GOOD PLACE FOR A LOADING ANIMATION
      return <Loading/>;
    }

    if (this.state.signedIn) {
      if (this.state.onboarding){
        return <SignedUp/>;
      } else {
        return <SignedIn/>
      }
    } else {
      return <SignedOut/>;
    }

  }
}
