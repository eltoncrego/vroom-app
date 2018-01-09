/*
 * Utility Script: numCars
 * Author: Alec
 *
 * Purpose: Counts the total number of cars in the database
 */
const admin = require('./index');

// Utility function
function exitPrompt() {
  process.exit();
}

// datasnaphot loop wrapper
numCars = () => {
  return new Promise((resolve, reject) => {
    admin.database().ref('cars').once('value')
    .then((years) => {
      yearsLoop(years)
      .then((count) => {
        resolve(count);
      })
      .catch((err) => {
        reject(err);
      });
    })
    .catch((err) => {
      reject(err);
    })
  })
}

// loops through each year and wraps makesLoop()
yearsLoop = (years) => {
  return new Promise((resolve, reject) => {
    var count = 0;
    var iterations = 0;
    var numYears = years.numChildren();
    years.forEach((year) => {
      makesLoop(year)
      .then((yearCount) => {
        count += yearCount;
        if(++iterations == numYears) resolve(count);
      })
      .catch((err) => {
        reject(err);
      });
    });
  });
}

// loops through each make and wraps modelsLoop
makesLoop = (year) => {
  // console.log('makesLoop');
  return new Promise((resolve, reject) => {
    var count = 0;
    var iterations = 0;
    var numMakes = year.numChildren();
    year.forEach((make) => {
      modelsLoop(make)
      .then((makeCount) => {
        count += makeCount;
        if(++iterations == numMakes) resolve(count);
      })
      .catch((err) => {
        reject(err);
      });
    });
  });
}

// returns numChildren of the given make
modelsLoop = (make) => {
  // console.log('modelsLoop');
  return new Promise((resolve, reject) => {
    resolve(make.numChildren());
  });
}

// // // // // // // // //
  //  EXECUTION CODE  //
// // // // // // // // //
console.log("=======================================");
console.log("Counting total number of cars");
console.log("=======================================");

numCars()
.then((count) => {
  for(var i = 0; i < 3; i++) console.log("- - -");
  console.log("numCars: ", count);
  for(var i = 0; i < 3; i++) console.log("- - -");
  console.log("love you long time <3.");
  console.log("- - -");
  exitPrompt();
})
.catch((err) => {
  console.log(err.message);
  exitPrompt();
})
