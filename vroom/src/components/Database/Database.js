import React from 'react';
import {goTo, clearNavStack} from '../Navigation/Navigation';
import * as firebase from 'firebase';
import Auth from '../Authentication/Auth';

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
    //console.log("Pushing 2006 Honda Accord Task Types");
    //var path = "cars/2006/honda/accord";
    //var taskTypesOb = require('../Database/Maintenance_Schedules/2006_honda_accord.json');
    //pushJSONTask(path, taskTypesOb);
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
    if(Auth.checkAuth()) {
      var taskObject = {
          ttRef: ttr,
          date: d,
          uid: Auth.getAuth().uid,
      };
      firebaseRef.database().ref('tasks').push(taskObject);
    }
  }

  /*
   * Database function: queryCars()
   * Author: Alec Felt
   *
   * Purpose: gets the years, makes, or models object
   *
   * @param: (path) = string: path to query in database
   *
   * @return: a promise which resolves to an array
   * TODO: none
   */
  export function queryCars(path){
      return new Promise((resolve, reject) => {
          firebaseRef.database().ref(path).once("value")
          .then(function(snapshot){
              var arr = [];
              snapshot.forEach(function(snap){
                  arr[arr.length] = snap.key;
              });
              resolve(arr);
          }).catch( (error) => {
              console.log("queryCars(): Firebase query error: "+error.message);
              reject(error);
          });
      });
  }

 /*
  * Database function: writeToPath()
  * Author: Will Coates and Payam Katoozian
  *
  * Purpose: write a JSON to a specified path in the database
  *
  * @param: (path) = string: path to location in database
  *         (ob)   = JSON object to be pushed
  * @return: void
  * TODO create error message, update task object fields, add notifications?
  */
  export function pushJSONTask(path, ob) {
    console.log("writing to path = " + path);
    console.log("JSON: ");
    console.log(ob);
    firebaseRef.database().ref(path).set(ob);

  }

  /*
  * Database function: readFromPath()
  * Author: Will Coates
  *
  * Purpose: When supplied with a path (string),
  *          read the database at that location
  *          and return a JSON with the stored information
  * @param: (path) = string: path to database location
  * @return: JSON containing requested information
  * TODO: catch invalid path exception
  *
  */
  export function readFromPath(path){
  console.log("path = " + path);
  var query = firebaseRef.database().ref(path);

  query.once('value')
    .then(function(snapshot){
    var help = snapshot.exists();
    console.log("Does the snapshot exist? " + help);
  });

  return query.once('value').then(function(snapshot){
    console.log("snapshotting");
    return snapshot.val();
  });
  }
