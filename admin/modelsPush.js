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
 * Globals: ynPrompt
 * Author: Will Coates
 *
 * Purpose: sets up prompting user for JSON object to be written
 * 			(path should be something like: '../')
 */
var ynPrompt = {
	properties: {
        verify: {
            description: "Are you sure you want to run this script? (yes/no)",
            required: true
        }
    }
};



writeToAllYears = () => {
// Should push all JSON objects in admin/Car_Models to the cars database
   for(var year = 1992; year <= 2018; year++){
	   try{
	   	console.log("looking for " + year + ".json");

   		var modelsOb = require('../admin/Car_Models/' + year + ".json");
   	   }
	   catch(ex){
    	console.error('Error: ', ex.message);
	    console.log('Please try again');
    	return; 
   	   }
	   // Now set the models field of all years to modelsOb 
	   var promise = new Promise(function(resolve) {
	   		console.log("pushing " + year + ".json");

   			admin.database().ref('cars').child(year).set(modelsOb);
	   		resolve("yay");
	   });

   	promise.then(function(result) {
   	console.log(result);
   });

   }

}

 // Introduction to the admin, to verify they actually want to run the script
console.log("=====================================================================================================");
console.log("Models Push");
console.log("Author: Will Coates");
console.log("This pushes all JSON files in admin/Car_Models to their respective years in the cars database");
console.log("Please inspect this folder to make sure the files in it should actually be pushed!");
console.log("=====================================================================================================");

console.log("=====================================================================================================");
console.log("WARNING! WARNING! WARNING! WARNING! WARNING! WARNING! WARNING! WARNING!");
console.log("This will OVERWRITE models! Edit the year range to make sure it doesn't CLOBBER existing models!");
console.log("=====================================================================================================");

/*
 * INSERT A Y/N PROMPT HERE SO THAT WE HAVE SOME PROTECTION AGAINST CLOBBERING OUR DATABASE
 */ 

 /* Author: Alec Felt [modified by Will Coates]
 *
 * Purpose: prompts the admin according to surePrompt var above,
 *          asks the admin if they're sure they want to run this script
 */
 prompt.get(ynPrompt, function(err, result){
    if(result.verify === 'yes'){
        writeToAllYears();
    }else if(result.verify === 'no'){
        throw new Error('This is not an error. This is just to abort javascript');
    }else{
           contPrompt();
    }
});
