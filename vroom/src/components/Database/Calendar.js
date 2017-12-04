import {firebaseRef} from "./Database";

/*
* Database function: getTaskDates()
* Author: Connick Shields
*
* Purpose: get a string list of task dates to use with the calendar
*
* @param: (u) = user
* @return: a list of task dates to be used when creating the calendar
*/

export function getTaskDates(u){
    return new Promise((resolve, reject) => {
      firebaseRef.database().ref('tasks/').orderByChild('uid').equalTo(u).once('value')
      .then(function(snapshot) {
          var dates = [];
          snapshot.forEach(function(child) {
              //console.log(child);
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
* Database function: getTaskByDate()
* Author: Connick Shields
*
* Purpose: get a list of Calendar tasks by date
*
* @param: (d) = date
* @param: (u) = user
* @return: an array of task(s) that will occur on the specified date
*/

export function getTaskByDate(d, u){
  return new Promise((resolve, reject) => {
    firebaseRef.database().ref('tasks').orderByChild('uid').equalTo(u).once('value')
    .then(function(snapshot) {
        var data = [];
        snapshot.forEach(function(child) {
          if(child.val().date == d){
            //child.val() is the task
            //set ttref of that to the path to the specific task type
            //do snapshot of the task type at the end of that path
            // in Dashboard.js in onDayPress, display that info
            firebaseRef.database().ref(child.val().ttRef).once('value').then(function(tt){
              data[data.length] = {title:""+tt.val().action+" "+tt.val().item, desc:tt.val().itemDescription};
              console.log(data);
            });
              //data[data.length] = child.val();
          }
        });
        console.log(data);
        resolve(data);
    })
    .catch(function(error) {
        console.log("Error getting tasks: ", error);
        reject(error);
    });
  });
}
