const prompt = require('prompt');
const admin = require('./index');
const { contProps, carProps, taskProps, jsonProps, pathProps} = require('./promptObjects');

/*
 * Congfiguration: firebase.initializeApp
 * Author: Alec Felt
 *   Purpose: Attach our app to our database
 */
 // Initialize Firebase
const config = {
   apiKey: "AIzaSyAmJxDUilgKOlQDyji9qmMNh2Bb73WcP7U",
   authDomain: "vroom-d5c0e.firebaseapp.com",
   databaseURL: "https://vroom-d5c0e.firebaseio.com",
   projectId: "vroom-d5c0e",
   storageBucket: "vroom-d5c0e.appspot.com",
   messagingSenderId: "52629805323"
};


/*
*
* Testing interface to read/write from/to Firebase
*
*/

prompt.get(pathProps, function (err, data) {
  var path = data.path;
  console.log("After prompting, path = " + path);

  var helloObject = {
    "hello" : "world",
    "thisIs": "a test"
  }

  console.log("==============================");
  console.log("WRITING TO PATH");
  writeToPath(path, helloObject);
  console.log("==============================");


  console.log("==============================");
  console.log("READING FROM PATH");

  var data = readFromPath(path);

  data.then(function(result) {
    console.log("after promise: " + JSON.stringify(result));
    console.log(result.hello);
    console.log(result.thisIs);
  });

  // must release the database so Node.js knows there are no more events that can happen
  console.log("Database is going offline");
  admin.database().goOffline();
  console.log("=============================");
});



  /*
   * Firebase Function: readFromPath()
   * Author: Will Coates
   *
   * Purpose: A generic function for reading from our Realtime Database
   * Arguments:
   *    -path: a string containing the path to read from
   */
readFromPath = (path) => {
    console.log("path = " + path);
    var query = admin.database().ref(path);

  query.once('value')
    .then(function(snapshot){
    var help = snapshot.exists();
    console.log("Does the snapshot exist? " + help);
  });

  return query.once('value').then(function(snapshot){
    console.log("snapshotting");
    return snapshot.val();
  });

}


  /*
   * Firebase Function: writeToPath()
   * Author: Will Coates
   *
   * Purpose: A generic function for writing to our Realtime Database
   * Arguments:
   *    -path: a string containing the path to write to
   */

  writeToPath = (path, object) => {
    console.log("writing to path = " + path);
    console.log("object: ");
    console.log(object);

    admin.database().ref(path).push(object);
  }
