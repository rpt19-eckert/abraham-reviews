const fs = require('fs');
const path = './csv/Scores/scores.csv';
const faker = require('faker');


//Random rating number generator
let floatNum = () => {
  let rand1 = Math.floor(Math.random() * Math.floor(5));
  let rand2 = Math.floor(Math.random() * Math.floor(9));
  let result = rand1 + '.' + rand2;
  return result;
}

//generate script to feed Listings table
const generatedListings = [];

let scoreStream = fs.createWriteStream(path);
scoreStream.write('id,cleanliness,communication,checkin,accuracy,location,value\n', 'utf8');

function writeScores (writer, encoding, callback) {
  let currentId = 0; //current counter of listingIds
  let toReach = 10000000; //current number to reach
  function write() {
    let ok = true;
    do {
      toReach--;
      currentId++;
      let cleanliness = floatNum();
      let communication = floatNum();
      let checkin = floatNum();
      let accuracy = floatNum();
      let location = floatNum();
      let value = floatNum();

      let data = `${currentId},${cleanliness},${communication},${checkin},${accuracy},${location},${value}\n`;
      if (toReach === 0) {
        writer.write(data, encoding, callback);
      } else  {
        ok = writer.write(data, encoding);
      }
    }
    while (toReach > 0 && ok);
    if (toReach > 0)  {
      writer.once('drain', write);
    }
  }
  write();
}

writeScores(scoreStream, 'utf-8', () => {
  scoreStream.end();
});