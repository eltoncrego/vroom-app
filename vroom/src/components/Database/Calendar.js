import {firebaseRef} from "./Database";

/*a
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
        // make sure the snapshot has data in it
        if(snapshot.exists()){
            // keep track of the number of tasks we process so we can return the data at the right time
            var numProcessed = 0;
            snapshot.forEach(function(child) {
                console.log("numChildren:"+snapshot.numChildren());
                if(child.val().date == d){
                  //child.val() is the task
                  //set ttref of that to the path to the specific task type
                  //do snapshot of the task type at the end of that path
                  // in Dashboard.js in onDayPress, display that info
                  firebaseRef.database().ref(child.val().ttRef).once('value').then(function(tt){
                    data[data.length] = {key:child.key,title:tt.val().action+" "+tt.val().item, desc:tt.val().itemDescription};
                    numProcessed++;
                    if(numProcessed == snapshot.numChildren()){
                      console.log("exiting match: "+child.key+" "+numProcessed);
                      resolve(data);
                    }
                  });
                } else {
                  numProcessed++;
                  if(numProcessed == snapshot.numChildren()){
                    console.log("exiting no match: "+child.key+" "+numProcessed);
                    resolve(data);
                  }
                }
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
