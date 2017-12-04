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

// Necessary Files
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
   * Method: setListener
   * Author: Alec Felt
   *
   * Purpose: sets global Firebase Authentication listener
   */
  setListener = () => {
    console.log("setListener()");
    var that = this;
    firebaseRef.auth().onAuthStateChanged(function(user) {
      console.log("onAuthStateChanged()");
       if (user) {
         console.log("user is signed in");
         firebaseRef.database().ref("users").child(user.uid).child("vehicles").once('value').then(function(snapshot) {
           if(snapshot.val() != null) {
             console.log("car object for this user! going to Dashboard");
             that.setState({onboarding: false, signedIn: true, checkedSignIn: true});
           } else {
             console.log("no car object for this user! going to Onboarding");
             that.setState({onboarding: true, signedIn: true, checkedSignIn: true});
           }
         }).catch(function(error) {
           console.log("Error getting document:", error.message);
         });
     } else {
       // No user is signed in.
       console.log("user is signed out");
       that.setState({signedIn: false, checkedSignIn: true});
     }
   });
  }

  /*
   * Method: componentDidMount()
   * Author: Elton C. Rego
   *
   * Purpose: Will reference the database to check if the user is
   *   logged in when this component is called to be mounted in the
   *   view. Sets the state variables with the appropriate values.
   */
  componentDidMount() {
    console.log("Auth component mounted");

    this.setListener();

    // this.render();
  }

  /*
   * Method: render()
   * Author: Elton C. Rego
   *
   * Purpose: References the state variables and loades the correct
   *   application view based on the status of the login
   *   if the state hasn't been checked, we return the loading screen
   *   if the state has been checked then load the proper
   */
  render() {
    if (!this.state.checkedSignIn) {
      return <Loading/>;
    }

    if(this.state.signedIn){
       if(this.state.onboarding){
         return <SignedUp/>;
       } else return <SignedIn/>;
    } else {
       return <SignedOut/>;
    }
  }
}
