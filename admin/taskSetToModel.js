/*
 * taskSetToModel.js
 * Author: Will Coates (very lightly adapted from Alec Felt's taskCreation.js)
 * Purpose: 
 *    Updates a year/make/model specified by user with a set of tasks unique to that year/make/model
 *    (specified by a .json file)
 */
const prompt = require('prompt');
const admin = require('./index');
const { contProps, carProps, taskProps, jsonProps} = require('./promptObjects');
const { makeTask } = require('./promptUtilities');

/*
 * Globals: year, make, model
 * Author: Alec Felt
 *
 * Purpose: Keeps track of which car we are dealing with
 */
var year, make, model;

/*
 * User Prompt Function: writeTaskSet()
 * Author: Will Coates 
 *
 * Purpose: Given a filename prompted by the user, pushes that JSON to database
 *          at a specific year
 *          
 */

writeTaskSet = () => {
    prompt.get(jsonProps, function(err, result){
        filename = result.filename;

        console.log('filename: ' + filename);

        try{
            var tasksOb = require('../admin/taskJSONObjects/' + filename);
        }
        catch(ex){
            console.error('Error: ', ex.message);
            console.log('Please try again');
            return;
        }
        console.log("Writing " + filename + " to " + year + " " + make + " " + model);
        // now actually .update() it
        admin.database().ref('cars')
        .child(year).child(make).child(model).child('task_types')
        .update(tasksOb);
    });
}

/*
 * User Prompt Function: contPrompt()
 * Author: Alec Felt (modified by Will Coates)
 *
 * Purpose: prompts the user for input according to contProps,
 *          asks the user whether they would like to continue entering tasks
 */
contPrompt = (contProps) => {
    prompt.get(contProps, function(err, result){
        if(result.cont === 'yes'){
            writeTaskSet();
        }else if(result.cont === 'no'){
            console.log("Bye bye, then!");
            process.exit();
        }else{
            contPrompt();
        }
    });
}

console.log("=======================================");
console.log("Which car?");
console.log("=======================================");

/*
 * User Prompt Code
 * Author: Alec Felt
 *
 * Purpose: prompts the user for input according to carProps,
 *          asks the user to specify which car we are dealing with,
 *          sets a FirebaseDatabseValueListener
 */
prompt.get(carProps, function (err, result) {
    year = result.year;
    make = result.make;
    model = result.model;
    admin.database().ref('cars')
    .child(result.year).child(result.make).child(result.model)
    .once('value', function(snap) {
        var msg;
        if(snap.exists()){
            msg = year+', '+make+' '+model+' exists in FirebaseDatabase';
        }else{
            msg = year+', '+make+' '+model+' doesn\'t exist in FirebaseDatabase yet';
        }
        console.log(msg);
        admin.database().ref('cars')
        .child(result.year).child(result.make).child(result.model).child('task_types')
        .on('value', function(snap) {
            contPrompt(contProps);
        });
    });
});
