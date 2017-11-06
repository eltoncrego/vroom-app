import React, { Component } from 'react';
import * as firebase from 'firebase';

export default class Database extends Component {

  /*
   * function: signup
   * Author: Alec Felt
   * Purpose: Add a user via email/password
   */
  async signup(email, pass) {

      try {
          await firebase.auth()
              .createUserWithEmailAndPassword(email, pass);

          console.log("Account created");

          // Navigate to the Home page, the user is auto logged in

      } catch (error) {
          console.log(error.toString());
      }

  }

  /*
   * Function: login
   * Author: Alec Felt
   * Purpose: login with email/password
   */
  async login(email, pass) {

      try {
          await firebase.auth()
              .signInWithEmailAndPassword(email, pass);

          console.log("Logged In!");

          // Navigate to the Home page

      } catch (error) {
          console.log(error.toString());
      }

  }

  /*
   * Function: logout
   * Author: Alec Felt
   * Purpose: logout of email/password verification
   */
  async logout() {

      try {

          await firebase.auth().signOut();

          // Navigate to login view

      } catch (error) {
          console.log(error);
      }

  }
}
