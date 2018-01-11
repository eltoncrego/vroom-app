/*
 * tasksToAllCars.js
 * Author: Will Coates
 * 		Acknowledgments:
 *			-Alec Felt's work on taskCreation.js was a big help
 			-stackOverflow, the font of all knowledge
 *
 * A script to update each car model in the database with a set of tasks,
 * 	represented by a given JSON object.
 *
 * Invoke from the command line by running "node tasksToAllCars.js"
 * 		(ideally I'd have a script/alias set up, but I can't even run Alec's script)
 *
 */

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

const prompt = require('prompt');
const admin = require('./index');
const { contProps, carProps, taskProps, jsonProps}= require('./promptObjects')

/*
 * Globals: jsonProps
 * Author: Will Coates
 *
 * Purpose: sets up prompting user for JSON object to be written
 * 			(path should be something like: '../')
 */
 /*
var jsonProps = {
	properties: {
		filename: {
			description: "Please enter the filename of the JSON object",
			// regular expression should match any .json filename
			pattern: /^[\w, \s-]+\.json$/,
			message: 'Must be a .json file',
			required: true
		}
	}
};
*/

// Introduction to the admin, to verify they actually want to run the script
console.log("=====================================================================================================");
console.log("Tasks To All Cars");
console.log("Author: Will Coates");
console.log("This script updates each car model in the database with a set of tasks, represented by a JSON object.");
console.log("The JSON object should be a .json file in admin/taskJSONObjects");
console.log("=====================================================================================================");

/*
 * writeToAllCars()
 * Author: Will Coates
 *
 * Purpose:
 		writes a given JSON object to every car in the database
 * Variables:
 		tasks: JSON object to write to each car
 */
writeToAllCars = (tasks) => {
     var query = admin.database().ref('cars').orderByKey();
     query.once('value')
     .then(function(carSnapshot) {
     		// take a snapshot of all the years
     		carSnapshot.forEach(function(yearSnapshot) {
     			var year = yearSnapshot.key;
          // for each year, take a snapshot of all the makes
     			yearSnapshot.forEach(function(makeSnapshot) {
     				var make = makeSnapshot.key;
     				// for each make, take a snapshot of all the models
     				makeSnapshot.forEach(function(modelSnapshot) {
     					var model = modelSnapshot.key;
  				    // for each model, update task_types with object: tasks
     					admin.database().ref('cars').child(year).child(make).child(model)
     					.child('task_types').update(tasks)
     					.catch((err) => {
     						console.log(err.message);
     					});
              console.log('Written to ' + year + ' ' + make + ' ' + model);
     				});
     			});
  			  console.log('Written to all cars of year: ' + year);
     		});
        // must release the database so Node.js knows there are no more events that can happen
        console.log("Database is going offline");
    		admin.database().goOffline();
     });
}

/*
 * Collect and Write Tasks
 * Author: Will Coates
 *
 * Purpose: collects the JSON object that the admin wants to write, and
 *			actually writes it to each car in the database
 */
prompt.get(jsonProps, function(err, result){
   filename = result.filename;

   console.log('filename:' + filename);

   // Admin has provided filename. If it's an existing JSON object
   // in taskJSONObjects, then set to tasksOb, otherwise catch
   // "Error: Cannot find module..."
   try{
   	 var tasksOb = require('../admin/taskJSONObjects/' + filename );
   }
   catch(ex){
     console.error('Error: ', ex.message);
     console.log('Please try again');
     return;
   }

   console.log('tasksOb: ' + JSON.stringify(tasksOb));

   // Now update tasksOb to all existing cars in the database
   var promise = new Promise(function(resolve) {
   		writeToAllCars(tasksOb);
   		resolve("execution has left tasksToAllCars script.");
   });

   promise.then(function(result) {
   	console.log(result);
   });
});
