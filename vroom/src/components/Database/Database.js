import React from 'react';
import {goTo, clearNavStack} from '../Navigation/Navigation';
import * as firebase from 'firebase';
import "firebase/firestore";

  /*
   * Congfiguration: firebase.initializeApp
   * Author: Alec Felt
   *   Purpose: Attach our app to our database
   */
   // Initialize Firebase
  const config = {
     apiKey: "AIzaSyAmJxDUilgKOlQDyji9qmMNh2Bb73WcP7U",
     authDomain: "vroom-d5c0e.firebaseapp.com",
     databaseURL: "https://vroom-d5c0e.firebaseio.com",
     projectId: "vroom-d5c0e",
     storageBucket: "vroom-d5c0e.appspot.com",
     messagingSenderId: "52629805323"
  };

  export const firebaseRef = firebase.initializeApp(config);



  /*
   * Firebase Function: pushToDatabase()
   * Author: Will Coates
   *
   * Purpose: A generic function for pushing to our Realtime Database,
   *          can fill in with whatever is needed and call where convenient
   *          (currently pushes Task Types for demo cars, called when pressing
   *           Create Task button in Tasks.js)
   *
   */
   export function pushToDatabase(){
    // 2006 Honda Accord
    console.log("Pushing 2030 Honda Accord Task Types");
    var path = "cars/2030/honda/accord";
    var taskTypesOb = require('../Database/Maintenance_Schedules/2006_honda_accord.json');
    pushJSONTask(path, taskTypesOb);
   }

  /*
  * Database function: pushTask()
  * Author: Alec Felt and Connick Shields
  *
  * Purpose: push Task object to database,
  *          link user with task
  *
  * @param: (ttr) = task type reference
  *         (d) = date string (yyyy-mm-dd)
  * @return: void
  * TODO create error message, update task object fields, add notifications?
  */
  export function pushTask(ttr, d) {
    var u = firebaseRef.auth().currentUser.uid;
    if(u != null) {
      var taskObject = {
          ttRef: ttr,
          date: d,
          uid: u,
      };
    }
    firebaseRef.database().ref('tasks/').push(taskObject);
  }

 /*
  * Database function: pushTaskTypes()
  * Author: Payam Katoozian and Will Coates
  *
  * Purpose: push a JSON file with the maintenance task types
             to the database
  *
  * @param: (path) = string: path to place in database
  *         (ob)   = JSON object to be pushed
  * @return: void
  * TODO create error message, update task object fields, add notifications?
  */
  export function pushJSONTask(path, ob) {
    firebaseRef.database().ref(path).set(ob);
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
  export function databaseLogin(e, p) {
    firebaseRef.auth().signInWithEmailAndPassword(e, p).then((user) => {
      if(user){
        console.log("signed user in");
      }
    }, error => {
      console.log(error.message);
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
        console.log(error.message);
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
      console.log(error.message);
      alert(error.message);
    });
  }

  /*
  * Database function: deleteUser()
  * Author: Elton C. Rego
  *
  * Purpose: Deletes the current user account
  */
  export function deleteUser(){
    var user = firebaseRef.auth().currentUser;
      if (user) {
        user.delete().then(function() {
          logOut();
          firebaseRef.database().ref(user.uid).remove();
        }).catch(function(error) {
          alert("Sorry, your account is unable to be deleted at this time.")
          console.log(error.message);
        });
      } else {
        alert("user is null");
      }
  }
