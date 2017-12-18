const adminFirebase = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey');

/*
 * Firebase Admin SDK Configuration
 * Author: Alec Felt
 *
 * Purpose: Allows Firebase Admin functionality
 */
var config = {
  credential: adminFirebase.credential.cert(serviceAccount),
  databaseURL: "https://vroom-d5c0e.firebaseio.com"
};
const admin = adminFirebase.initializeApp(config);
module.exports = admin;
