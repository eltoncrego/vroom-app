/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';


/*
* Class: VroomAlert
* Author: Elton C. Rego
* Purpose: Creates and styles a custom alert for our app that fits the
*   feel of the rest of the app
*/
export default class Notifications extends Component{

  /*
  * Method: constructor()
  * Author: Elton C. Rego
  *
  * Purpose: Sets the state text for the card naming
  */
  constructor(props) {
    super(props)
  }

  // Call this to test an immediate notification.
  showLocalNotification() {
    FCM.presentLocalNotification({
      id: 'testnotif',
      vibrate: 500,
      sound: "default",
      title: 'Hello',
      body: 'This is a test',
      sub_text: 'sub text',
      priority: "high",
      show_in_foreground: true,
      group: 'test',
    });
  }

  // Call this to test a scheduled notification
  scheduleLocalNotification(timeFromNow, title, body, sub_text, id) {
    FCM.scheduleLocalNotification({
      id: id,
      fire_date: new Date().getTime()+timeFromNow,
      vibrate: 500,
      sound: "default",
      title: title,
      body: body,
      sub_text: sub_text,
      priority: "high",
      show_in_foreground: true,
      wake_screen: true,
      group: 'test',
    });
  }

  scheduleAveragedNotification(data) {
    FCM.scheduleLocalNotification({
      id: 'weekreminder-scheduled',
      fire_date: new Date().getTime() + this.createSchedulerTiming(data),
      vibrate: 500,
      sound: "default",
      title: 'Running a little dry?',
      body: 'Dont forget to add your latest fillup!',
      sub_text: 'sub text',
      priority: "high",
      show_in_foreground: true,
      wake_screen: true,
      group: 'test',
    });
  }

  requestPermission(){
    FCM.requestPermissions({badge: false, sound: true, alert: true});
  }

  resetNotificationState(){
    FCM.removeAllDeliveredNotifications();
    FCM.setBadgeNumber(0);
  }

  createSchedulerTiming(data){
    // time of one day in ms
    const one_day=1000*60*60*24;
    //average ms to return
    var working_set = data.reverse();
    var prev = working_set[0].date[0] * 365 * one_day + working_set[0].date[1] * 30 * one_day + working_set[0].date[2] * one_day;
    var ave_ms = 0;
    var i = 1;

    //calculate average ms
    working_set.forEach(function(element){
      var year = element.date[0] * 365 * one_day;
      var mon = element.date[1] * 30 * one_day;
      var day = element.date[2] * one_day;
      var diff = (year + mon + day) - prev;

      ave_ms = ((ave_ms*(i-1)) + diff) / i;
      prev = year + mon + day;
      i++;
    });

    console.log("Time until next notification " + (ave_ms / one_day) + " days");
    return(ave_ms);
  }

}
