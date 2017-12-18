const prompt = require('prompt');
const admin = require('./index');
const { contProps, carProps, taskProps } = require('./promptObjects');
const { makeTask } = require('./promptUtilities');

/*
 * Globals: year, make, model
 * Author: Alec Felt
 *
 * Purpose: Keeps track of which car we are dealing with
 */
var year, make, model;

/*
 * User Prompt Function: taskEntry()
 * Author: Alec Felt
 *
 * Purpose: prompts the user for input according to taskProps,
 *          makes JSON task object and pushes it to FirebaseDatabase
 */
taskEntry = () => {
    prompt.get(taskProps, function(err, result){
        var jsonObj = makeTask(result);
        admin.database().ref('cars')
        .child(year).child(make).child(model)
        .child(result.taskName).set(jsonObj)
        .catch((err) => {
            console.log(err.message);
        });
    });
}

/*
 * User Prompt Function: contPrompt()
 * Author: Alec Felt
 *
 * Purpose: prompts the user for input according to contProps,
 *          asks the user whether they would like to continue entering tasks
 */
contPrompt = (contProps) => {
    prompt.get(contProps, function(err, result){
        if(result.cont === 'yes'){
            taskEntry();
        }else if(result.cont === 'no'){
            console.log("love you long time <3.");
            throw new Error('This is not an error. This is just to abort javascript');
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
    .on('value', function(snap) {
        var msg;
        if(snap.exists()){
            msg = "Car exists.";
        }else{
            msg = "Car doesn't exist."
        }
        console.log(msg);
        contPrompt(contProps);
    });
});
