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

  requestPermission(){
    FCM.requestPermissions({badge: false, sound: true, alert: true});
  }

  resetNotificationState(){
    FCM.removeAllDeliveredNotifications();
    FCM.setBadgeNumber(0);
  }

}
