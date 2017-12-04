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
      firebaseRef.database().ref('tasks/')
      .where("uid", "==", u).get()
      .then(function(querySnapshot) {
          var dates = {};
          var i = 0;
          querySnapshot.forEach(function(doc) {
              dates[i++] = doc.data().date;
          });
          console.log(dates);
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
    firebaseRef.firestore().collection("tasks")
    .where("uid", "==", u).where("date", "==", d).get()
    .then(function(querySnapshot) {
        var data = {};
        var i = 0;
        querySnapshot.forEach(function(doc) {
          data[i++] = doc.data();
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