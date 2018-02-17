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
* Database function: pushFillup()
* Author: Will Coates
*
* Purpose: push a fillup to a user in the database
*
* @param: (fillupData) = the newest fillup (textDataArr[0])
* @return: void
* TODO create error message, update task object fields, add notifications?
*/
export function pushFillup(fillupData) {
  console.log("pushFillup");
  console.log("Here's fillupData:");
  console.log(fillupData);

  if(Auth.checkAuth()) {
    var user = Auth.getAuth().uid;
    firebaseRef.database().ref("users").child(user).child("fillups").push(fillupData);
  }
}

export function updateMPG(average) {
  console.log("updateMPG");
  if(Auth.checkAuth()) {
    var user = Auth.getAuth().uid;
    firebaseRef.database().ref("users").child(user).child("average").set(average);
  }
}

export function updateODO(newODO) {
  console.log("updateODO");
  if(Auth.checkAuth()) {
    var user = Auth.getAuth().uid;
    firebaseRef.database().ref("users").child(user).child("odometer").set(newODO);
  }
}

/*
* Database function: pullFillups()
*/
export function pullFillups() {
  console.log("pullFillups");

  const user = Auth.getAuth().uid;
  const query = firebaseRef.database().ref("users").child(user).child("fillups");

  return query.once('value').then(function(snapshot){
    var returnArr = [];
    snapshot.forEach(function(listItem){
      var item = listItem.val();
      console.log(item);
      returnArr.unshift(item);
    });
    return returnArr;
  }).catch(function(error) {
    console.log('Failed to pull fill up data from firebase:', error);
  });

}

/*
* Database function: pullFillups()
*/
export function pullAverageMPG() {
  console.log("pullAverageMPG");

  const user = Auth.getAuth().uid;
  const query = firebaseRef.database().ref("users").child(user).child("average");

  return query.once('value').then(function(snapshot){
    return snapshot.val();
  }).catch(function(error) {
    console.log('Failed to pull average MPG data from firebase:', error);
  });

}

/*
* Database function: pullFillups()
*/
export function pullODOReading() {
  console.log("pullODOReading");

  const user = Auth.getAuth().uid;
  const query = firebaseRef.database().ref("users").child(user).child("odometer");

  return query.once('value').then(function(snapshot){
    return snapshot.val();
  }).catch(function(error) {
    console.log('Failed to pull average MPG data from firebase:', error);
  });

}

/*
* Database function: removeFillup()
* Author: Will Coates
*
* Purpose: remove a fillup from a user in the database
*
* @param: i: the index of the particular fillup we're removing
* @return: void
* TODO create error message, update task object fields, add notifications?
*/
export function removeFillup(i) {
  console.log("removing array[" + i + "]");

  if(Auth.checkAuth()) {
    var user = Auth.getAuth().uid;
    firebaseRef.database().ref("users").child(user).child("fillups").equalTo(i).on("value", function(snapshot){
      console.log("removing snapshot.val");
      console.log(snapshot.val());
      snapshot.forEach(function(data){
        console.log(data.key);
      });
    });
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
