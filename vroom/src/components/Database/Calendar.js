import {firebaseRef} from "./Database";
import {Auth} from '../Login';

/*
* Database function: getTaskDates()
* Author: Connick Shields
*
* Purpose: get a string list of task dates to use with the calendar
*
* @return: a list of task dates to be used when creating the calendar
*/

export function getTaskDates(){
    return new Promise((resolve, reject) => {
      firebaseRef.database().ref('tasks/').orderByChild('uid').equalTo(Auth.getAuth().uid).once('value')
      .then(function(snapshot) {
          var dates = [];
          snapshot.forEach(function(child) {
              dates[dates.length] = child.val().date;
          });
          resolve(dates);
      })
      .catch(function(error) {
          console.log("Error getting tasks: ", error);
          reject(error);
      });
    });
}

/*
* Database function: loopThruTasks()
* Author: Connick Shields, Alec Felt
*
* Purpose: loops through the children of a Firebase DataSnapshot,
*     helper function for getTaskByDate(),
*     returns a promise that resolves with an array of tasks
*
* @param: (d) = date
* @param: (snap) = Firbase DataSnapshot
* @return: an array of task(s) that will occur on the specified date
*/
function loopThruTasks(d, snap){
    return new Promise((resolve, reject) => {
        // keep track of the number of tasks we process so we can return the data at the right time
        var data = [], numProcessed = 0;
        snap.forEach(function(child) {
            if(child.val().date == d){
                //child.val() is the task
                //set ttref of that to the path to the specific task type
                //do snap of the task type at the end of that path
                // in Dashboard.js in onDayPress, display that info
                firebaseRef.database().ref(child.val().ttRef).once('value').then(function(tt){
                    data[data.length] = {key:child.key,title:tt.val().action+" "+tt.val().item, desc:tt.val().itemDescription};
                    numProcessed++;
                    if(numProcessed == snap.numChildren()){
                        resolve(data);
                    }
                })
                .catch(function(error){
                    console.log("ERROR loopThruTasks: "+error.message);
                    reject(error);
                });
            } else {
                numProcessed++;
                if(numProcessed == snap.numChildren()){
                    resolve(data);
                }
            }
        });
    });
}

/*
* Database function: getTaskByDate()
* Author: Connick Shields, Alec Felt
*
* Purpose: get a list of Calendar tasks by date
*
* @param: (d) = date
* @return: an array of task(s) that will occur on the specified date
*/
export function getTaskByDate(d){
    return new Promise((resolve, reject) => {
        firebaseRef.database().ref('tasks').orderByChild('uid').equalTo(Auth.getAuth().uid).once('value')
        .then(function(snapshot) {
            console.log("getTaskByDate(): task query success");
            var data = [];
            // make sure the snapshot has data in it
            if(snapshot.exists()){
                console.log("getTaskByDate(): task query exists");
                loopThruTasks(d, snapshot).then(arr => {
                    console.log("resolved array: "+arr);
                    resolve(arr);
                }).catch((error) => {
                    console.log(error.message);
                });
            } else {
                resolve(data);
            }
        })
        .catch(function(error) {
            console.log("Error getting tasks: ", error);
            reject(error);
        });
    });
}
