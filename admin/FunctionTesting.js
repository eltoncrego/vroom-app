const prompt = require('prompt');
const admin = require('./index');
const { contProps, carProps, taskProps, jsonProps, pathProps} = require('./promptObjects');

 /*
  * Firebase Configuration
  * Author: Alec Felt
  *
  */
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


  var helloObject = {
    "hello" : "world"
  }
  console.log("==============================");
  console.log("WRITING TO PATH");
  console.log("here's the data we're writing:");
  console.log(helloObject);
  console.log("To path: " + path); 
  writeToPath(path, helloObject);
  console.log("==============================");


  console.log("==============================");
  console.log("READING FROM PATH");
  console.log("Reading from path = " + path);

  var data = readFromPath(path);

  data.then(function(result) {
    console.log("after promise: " + result);
  });


  console.log("here's the data we've read:");
  console.log(data);
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
    var ref = admin.database().ref(path);

  ref.once('value').then(function(snapshot){
    var help = snapshot.exists();
    console.log("Does the snapshot exist? " + help);
  });

  return ref.once('value').then(function(snapshot){
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

    admin.database().ref(path).set(object);

  }
  
