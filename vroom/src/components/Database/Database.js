import React from 'react';
import {firebaseRef} from '../../../index';
import {goTo} from '../Navigation/Navigation';

/*
* Database function: databaseLogin()
* Author: Alec Felt
*
* Purpose: login the user
*
* @param: (e) = email
*         (p) = password
* @return: boolean
*/
  export function databaseLogin(e, p) {
    var authResult = firebaseRef.auth().signInWithEmailAndPassword(e, p).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
      alert("Login error");
      return false;
      // ...
    });
    return true;
  }

  /*
  * Database function: databaseSignup
  * Author: Alec Felt
  *
  * Purpose: signup a user with email/password
  *
  * @param: (e) = email
  *         (p) = password
  * @return: boolean
  */
  export function databaseSignup(e, p) {
    var result;
    result = firebaseRef.auth().createUserWithEmailAndPassword(e, p).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
      return false;
      // ...
    });
    if(result != null) { return true; } else { return false; }
  }

  /*
  * Database function
  * Author: Alec Felt
  *
  * Purpose: set an onChange listener to the global firebase auth object
  *
  * @param: void
  * @return: boolean
  */
  export function authListener() {
    return firebaseRef.auth().onAuthStateChanged(function(user) {
      user = firebaseRef.auth().currentUser;
      if (user != null) {
        // User is signed in.
        return true;
        // ...
      } else {
        return false;
        // User is signed out.
        // ...
      }
    });
  }

  /*
  * Database function: logOut()
  * Author: Alec Felt
  *
  * Purpose: log the current user out
  *
  * @param: void
  * @return: boolean
  */
  export function logOut() {
    firebaseRef.auth().signOut().then(function() {
      // Sign-out successful.
      return true;
    }).catch(function(error) {
      // An error happened.
      alert("Error logging out");
      return false;
    });
  }

  /*
  * Database function: updateUserProfile
  * Author: Alec Felt
  *
  * Purpose: updates built-in user profile info
  *
  * @param: (jsonObj) = JSON object with profile info
  * @return: boolean
  */
  export function updateUserProfile (jsonObj) {
    var user = firebaseRef.auth().currentUser;

    if(user != undefined && user != null) {
      user.updateProfile(jsonObj).then(function() {
        // Update successful.
        alert("success!");
        return true;
      }).catch(function(error) {
        // An error happened.
        alert("Error updating user profile info");
      });
    }
    return false;
  }
