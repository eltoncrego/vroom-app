const admin = require('./index');

numCars = () => {
  return new Promise((resolve, reject) {
    admin.database().once('value')
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

yearsLoop = (years) => {
  return new Promise((resolve, reject) {
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

makesLoop = (year) => {
  var count = 0;
  var iterations = 0;
  var numMakes = year.numChildren();
  year.forEach((make) => {
    modelsLoop(make)
    .then((makeCount) => {
      count += makeCount;
      if(++iterations == numMake) resolve(count);
    })
    .catch((err) => {
      reject(err);
    });
  });
}

modelsLoop = (make) => {
  return new Promise((resolve, reject) {
    resolve(make.numChilren());
  });
}
