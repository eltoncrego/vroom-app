import {firebaseRef} from "./Database";

/*
* Database function: getEventDates()
* Author: Connick Shields
*
* Purpose: get a string list of event dates to use with the calendar
*
* @param: (u) = user
* @return: a list of event dates to be used when creating the calendar
*/

export function getEventDates(u){
    return new Promise((resolve, reject) => {
      firebaseRef.firestore().collection("users").doc(u).collection("events")
      .get()
      .then(function(querySnapshot) {
          var dates = {};
          var i = 0;
          querySnapshot.forEach(function(doc) {
              dates[i++] = doc.id;
          });
          console.log(dates);
          resolve(dates);
      })
      .catch(function(error) {
          console.log("Error getting events: ", error);
          reject(error);
      });
    });
}

/*
* Database function: getEventByDate()
* Author: Connick Shields
*
* Purpose: get a list of Calendar events by date
*
* @param: (d) = date
* @return: a list of event(s) that will occur on the specified date
*/

export function getEventByDate(d){

}
