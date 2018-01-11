 /* 
 * testModelsPush.js
 * Author: Will Coates 
 * 		Acknowledgments:
 *			-Alec Felt's work on taskCreation.js was a big help
 			-stackOverflow, the font of all knowledge
 * 
 * A test script to push my sample JSON object of all models to the year 1992. 
 * [TO BE MADE OBSOLETE WITH SCRIPT THAT SCANS Car_Models FOR ALL [year].json FILES
 *  AND PUSHES EACH TO THE PROPER YEAR]
 * 
 * Invoke from the command line by running "node testModelsPush.js"
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


/*
 * REFACTOR AS promptProps A LA ALEC'S SCRIPT
 *
 *
 * Globals: jsonPrompt
 * Author: Will Coates
 *
 * Purpose: sets up prompting user for JSON object to be written 
 * 			(path should be something like: '../')
 */
var jsonPrompt = {
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

// Introduction to the admin, to verify they actually want to run the script
console.log("=====================================================================================================");
console.log("Test Models Push");
console.log("Author: Will Coates");
console.log("This is a test script to push a .json file containing all models to a specific year.");
console.log("It is to be replaced with a script that scans  Car_Models for all [year].json files and pushes each to the proper year");
console.log("The JSON object should be a .json file in admin/Car_Models");
console.log("=====================================================================================================");

// Should push given JSON object to the year 1992 (just for testing)
prompt.get(jsonPrompt, function(err, result){
   filename = result.filename;

   console.log('filename:' + filename);

   // Admin has provided filename. If it's an existing JSON object
   // in taskJSONObjects, then set to tasksOb, otherwise catch
   // "Error: Cannot find module..."
   try{
   	var modelsOb = require('../admin/Car_Models/' + filename );
   }
   catch(ex){
    console.error('Error: ', ex.message);
    console.log('Please try again');
    return; 
   }

   console.log('modelsOb: ' + modelsOb);

   // Now update tasksOb to all existing cars in the database
   var promise = new Promise(function(resolve) {
   		admin.database().ref('cars').child(1992).set(modelsOb);
   		resolve("yay");
   });

   promise.then(function(result) {
   	console.log(result);
   });
});

