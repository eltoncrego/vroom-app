const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey');
const prompt = require('prompt');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vroom-d5c0e.firebaseio.com"
});

console.log("=======================================");
console.log("Which car?");
console.log("=======================================");

prompt.start();

var carProps = {
    properties: {
        year: {
            description: 'Year',
            pattern: /\d{4}/,
            required: true
        },
        make: {
            description: 'Make',
            pattern: /^[A-Z][a-z]*/,
            required: true
        },
        model: {
            description: 'Model',
            required: true
        }
    }
}

prompt.get(carProps, function (err, result) {
    admin.database().ref().child(result.year).child(result.make).child(result.model).on('value', function(snap) {
        if(snap.exists()){
            console.log("car exists!");
        }else{
            console.log("car doesn't exist!");
        }
    });
});
