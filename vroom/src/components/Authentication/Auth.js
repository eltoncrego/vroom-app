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

// Necessary Files
import Loading from '../Screens/Loading.js';
import {firebaseRef, initUser} from '../Database/Database';
import * as firebase from 'firebase';

/*
 * Class: Auth
 * Author: Elton C. Rego
 *
 * Purpose: Checks whether the user is already logged in or not
 *   and routes them to the correct state of the applciation
 *   SignedIn if they are; SignedOut if they arent
 *
 * @return: View
 */
export default class Auth extends Component {

  /*
   * Static FirebaseAuth Variable: auth
   * Author: Alec Felt
   *
   * Purpose: Stores the current FirebaseAuth object for the users,
   *    acts as a global variable
   */
  static auth;

  /*
   * Static FirebaseAuth Access function: getAuth()
   * Author: Alec Felt
   *
   * Purpose: returns auth
   *
   * @return: FirebaseUser
   */
  static getAuth(){
    return Auth.auth;
  }

  /*
   * Static FirebaseAuth Access function: checkAuth()
   * Author: Alec Felt
   *
   * Purpose: checks Auth.auth
   *
   * @return: boolean
   */
  static checkAuth(){
    return (Auth.auth != null);
  }

  /*
   * Method: constructor(props)
   * Author: Elton C. Rego
   *
   * Purpose: Sets the state text for the card naming
   * @param props: the properties passed in from the super class (index.js)
   */
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false,
      authenticating: false,
    };
  }

  /*
  * Database function: databaseLogin()
  * Author: Alec Felt and Connick Shields
  *
  * Purpose: login the user
  *
  * @param: (e) = email
  *         (p) = password
  * @return: boolean
  */
  static firebaseLogin = (e, p) => {
    return firebase.auth().signInWithEmailAndPassword(e, p).then((user) => {
      if(user){
        console.log("signed user in");
      }
      return true;
    }).catch(function(error){
      setTimeout(() => {
        alert(error.message);
      }, 30);
      return false
    });
  }

 /*
  * Database function: databaseSignup
  * Author: Alec Felt and Connick Shields
  *
  * Purpose: signup a user with email/password
  *
  * @param: (e) = email
  *         (p) = password
  * @return: boolean
  */
  static firebaseSignup = (e, p) => {
    return firebase.auth().createUserWithEmailAndPassword(e, p)
      .then((user) => {
        if(user){
          console.log("signed up:");
        }
        return true;
      }, error => {
        console.log(error.message);
        setTimeout(() => {
          alert(error.message);
        }, 30);
        return false;
      });
  }

  /*
  * Database function: logOut()
  * Author: Alec Felt and Connick Shields
  *
  * Purpose: log the current user out
  *
  * @param: void
  * @return: boolean
  */
  static logOut = () => {
    // if signOut() returns void, then go back to login
    firebase.auth().signOut().then((vo) => {
      if(!vo){
        console.log("signed user out");
      }
    }, error => {
      console.log(error.message);
      alert(error.message);
    });
  }

  /*
  * Auth/Database function: deleteUser()
  * Author: Elton C. Rego and Connick Shields
  *
  * Purpose: Deletes the current user account
  */
  static deleteUser = () => {
      if (Auth.checkAuth()) {
        Auth.getAuth().delete().then(function() {
          firebaseRef.database().ref("users").child(Auth.getAuth().uid).remove()
          .then(function(){
            Auth.logOut();
            alert("Poof! You're gone.");
          }).catch(function(error){
            console.log("ERROR: serious logic bug in Auth: deleteUser()");
          })
        }).catch(function(error) {
          alert("Sorry, your account is unable to be deleted at this time. Please reauthenticate");
          console.log(error.message);
        });
      } else {
        alert("user is null");
      }
  }

  /*
  * Auth function: reAuth()
  * Author: Alec Felt
  *
  * Purpose: creates a new credential,
  *       attempts to reauthenticate user,
  *       deletes user from Auth and database
  *
  * @params: (e) = email user provides
  *          (p) = password user provides
  */
  static reAuth = (e, p) => {
      var credential = firebase.auth.EmailAuthProvider.credential(e, p);
      Auth.getAuth().reauthenticateWithCredential(credential)
      .then(() => {
        Auth.deleteUser();
      }).catch((error) => {
        alert("Incorrect credentials.");
      });
  }

  /*
   * Method: setListener
   * Author: Alec Felt
   *
   * Purpose: sets global Firebase Authentication listener,
   *    updates global FirebaseAuth variable auth
   */
  setAuthListener = () => {
    console.log("setListener()");
    var that = this;
    firebaseRef.auth().onAuthStateChanged(function(user) {
      console.log("onAuthStateChanged()");
       if (user) {
         Auth.auth = user;
         console.log("user is signed in");
         firebaseRef.database().ref("users").child(Auth.auth.uid).child("premiumUser").once('value').then(function(snapshot) {
           if(snapshot.val() !== null) {
             console.log("Database init for this user! going to Dashboard");
             that.setState({signedIn: true, checkedSignIn: true});
           } else {
             console.log("No database value for this user! going to Onboarding");
             initUser();
             that.setState({signedIn: true, checkedSignIn: true});
           }
         }).catch(function(error) {
           console.log("Error getting document:", error.message);
         });
     } else {
       // No user is signed in.
       Auth.auth = null;
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

    this.setAuthListener();

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
   *
   * @return: View
   */
  render() {

    if (!this.state.checkedSignIn) {
      return(<Loading label={"someone dropped screws in here"}/>);
    }

    if(this.state.signedIn){
       return(<SignedIn/>);
    } else {
       return(<SignedOut/>);
    }

  }
}
