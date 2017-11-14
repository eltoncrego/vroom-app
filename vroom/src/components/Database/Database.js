import React from 'react';
import {firebaseRef} from '../../../index';
import {goTo, clearNavStack} from '../Navigation/Navigation';

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
  export function databaseLogin(e, p, n) {
    firebaseRef.auth().signInWithEmailAndPassword(e, p).then((user) => {
      if(user){
        goTo(n, 'Dashboard');
      }
    }, error => {
      alert(error.message);
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
  export function databaseSignup(e, p, n) {
    firebaseRef.auth().createUserWithEmailAndPassword(e, p)
      .then((user) => {
        if(user){
          goTo(n, 'Onboarding');
        }
      }, error => {
        alert(error.message);
      });
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
  * Author: Alec Felt and Connick Shields
  *
  * Purpose: log the current user out
  *
  * @param: void
  * @return: boolean
  */
  export function logOut(n) {
    firebaseRef.auth().signOut().then((vo) => {
      if(!vo){
        clearNavStack(n, 'EmailPasswordLogin');
      }
    }, error => {
      alert(error.message);
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
