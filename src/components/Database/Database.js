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
*/
export function pushFillup(fillupData) {
  console.log("pushFillup");
  if(Auth.checkAuth()) {
    var user = Auth.getAuth().uid;
    firebaseRef.database().ref("users").child(user).child("fillups").push(fillupData);
  }
}

/*
* Database function: initUser()
* Author: Elton C. Rego
*
* Purpose: push the initial data for a user to firebase
*/
export function initUser(originalODO){
  console.log("initUser");
  if(Auth.checkAuth()) {
    var user = Auth.getAuth().uid;
    firebaseRef.database().ref("users").child(user).child("premiumUser").set(false);
    firebaseRef.database().ref("users").child(user).child("originalODO").set(originalODO);
  }
}

/*
* Database function: requestOCR()
* Author: Connick Shields
*
* Purpose: requests OCR on the specified URL
*/
export function requestOCR(URL){
  console.log("requestOCR");
  if(Auth.checkAuth()) {
    fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDsnMVXpLDnYpPB3xT11sFSP6HfmPJDzig', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "requests": [
            {
              "image": {
                "source": {
                  "imageUri": URL
                }
              },
              "features": [
                {
                  "type": "TEXT_DETECTION"
                }
              ]
            }
          ]
        }
      ),
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

/*
* Database function: updateMPG()
* Author: Elton C. Rego
*
* Purpose: push an update to the average MPG value to firebase
*
* @param: average - the new MPG average we want to push to firebase
*/
export function updateMPG(average) {
  console.log("updateMPG");
  if(Auth.checkAuth()) {
    var user = Auth.getAuth().uid;
    firebaseRef.database().ref("users").child(user).child("average").set(average);
  }
}

/*
* Database function: updateODO()
* Author: Elton C. Rego
*
* Purpose: push the new odometer reading to firebase
*
* @param: the new odometer reading to push to firebase
*/
export function updateODO(newODO) {
  console.log("updateODO");
  if(Auth.checkAuth()) {
    var user = Auth.getAuth().uid;
    firebaseRef.database().ref("users").child(user).child("odometer").set(newODO);
  }
}


/*
* Database function: pullFillups()
* Author: Elton C. Rego
*
* Purpose: pulls the fillups stored in the user's database area
*
* @return returnArr: an array of the fillup data in the filestore
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
* Database function: pullAverageMPG()
* Author: Elton C. Rego
*
* Purpose: pulls the latest averageMPG stored in the user's database area
*
* @return mpg: a numeric value of the current average MPG of the user
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
* Database function: pullODOReading()
* Author: Elton C. Rego
*
* Purpose: pulls the latest ODO reading for the user
*
* @return odo: a numeric value of the latest ODO reading for the user
*/
export function pullODOReading() {
  console.log("pullODOReading");

  const user = Auth.getAuth().uid;
  const query = firebaseRef.database().ref("users").child(user).child("odometer");

  return query.once('value').then(function(snapshot){
    return snapshot.val();
  }).catch(function(error) {
    console.log('Failed to pull Original Odometer data from firebase:', error);
  });

}

/*
* Database function: pullOGDOReading()
* Author: Elton C. Rego
*
* Purpose: pulls the ORIGINAL ODO reading for the user
*
* @return originalODO: the original odometer reading entered by the user
*   during onboarding
*/
export function pullOGODOReading() {
  console.log("pullOGDOReading");

  const user = Auth.getAuth().uid;
  const query = firebaseRef.database().ref("users").child(user).child("originalODO");

  return query.once('value').then(function(snapshot){
    return snapshot.val();
  }).catch(function(error) {
    console.log('Failed to pull Odometer data from firebase:', error);
  });

}

/*
* Database function: pullUserPermissions()
* Author: Elton C. Rego
*
* Purpose: pulls the user permissions to validate if the user is a premium
*   user or not
*
* @return bool - is the user a premium user? t/f
*/
export function pullUserPermissions(){
  console.log("Pulling user permissions.");
  const user = Auth.getAuth().uid;
  const query = firebaseRef.database().ref("users").child(user).child("premiumUser");
  return query.once('value').then(function(snapshot){
    return snapshot.val();
  }).catch(function(error) {
    console.log('Failed to pull user permission data from firebase:', error);
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
*/
export function removeFillup(i) {
  console.log("removing fillup");
  console.log(i)

  var user = Auth.getAuth().uid;
  const query = firebaseRef.database().ref("users").child(user).child("fillups");
  query.once('value').then(function(snapshot){
    snapshot.forEach(function(child) {
      if (child.val().list_i == i) {
        console.log('Removing child '+child.key);
        child.ref.remove();
      }
    });
  }).catch(function(error) {
    console.log('Failed to remove fillup data from firebase:', error);
  });
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
*/
export function pushJSONTask(path, ob) {
  console.log("writing to path = " + path);
  console.log("JSON: ");
  console.log(ob);
  firebaseRef.database().ref(path).set(ob);

}
