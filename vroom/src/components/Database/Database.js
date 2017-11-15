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
  export function databaseLogin(e, p) {
    firebaseRef.auth().signInWithEmailAndPassword(e, p).then((user) => {
      if(user){
        console.log("signed user in");
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
  export function databaseSignup(e, p) {
    firebaseRef.auth().createUserWithEmailAndPassword(e, p)
      .then((user) => {
        if(user){
          console.log("signed user up");
        }
      }, error => {
        if(error.code == "auth/email-already-in-use"){
          alert("Your email is already registered. Attemping to sign you in automatically.")
          databaseLogin(e, p);
          return;
        }
        alert(error.message);
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
  export function logOut() {
    // if signOut() returns void, then go back to login
    firebaseRef.auth().signOut().then((vo) => {
      if(!vo){
        console.log("signed user out");
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

  TODO rewrite
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
