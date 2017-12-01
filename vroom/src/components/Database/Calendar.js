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
    firebaseRef.firestore().collection("users").doc(u).collection("events")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting events: ", error);
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
