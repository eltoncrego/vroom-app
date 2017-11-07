import React from 'react';
import * as firebase from 'firebase';

  export function databaseLogin(e, p) {
    firebase.auth().signInWithEmailAndPassword(e, p).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
      return errorMessage;
      // ...
    });
    return "";
  }

  export function databaseSignup(e, p) {
    firebase.auth().createUserWithEmailAndPassword(e, p).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
      // ...
    });
  }
