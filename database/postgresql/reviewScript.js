const fs = require('fs');
const stringify = require('csv-stringify');
const path = './csv/Reviews/reviews.csv';
const faker = require('faker');

//columns for csv file
const columns = {
  id: 'Id',
  username: 'Username',
  date: "Date",
  text: "Text",
  avatar: "Avatar"
};

//generate script to feed Listings table
const generatedReviews = [];

// let currentId = 1; //current counter of listingIds
// let toReach = 1000000; //current number to reach
//generate random year for reviews date
let randomYear = () => {
  let years = [2015, 2016, 2017, 2018, 2019, 2020];
  let year = Math.floor(Math.random() * Math.floor(6));
  return years[year];
}







/*
create 10 files to populate 1 million records into each
create a for loop to 10, on each iteration create a new csv file which populates another 1 million
*/

let reviewStream = fs.createWriteStream(path);
reviewStream.write(JSON.stringify(columns), 'utf8');

/* needs work to be fully automatic*/
function writeReviews (writer, encoding, callback) {
  let currentId = 0; //current counter of listingIds
  let toReach = 10000000; //current number to reach
  function write() {
    let ok = true;
    do {
      toReach--;
      currentId++;
      let data = [
        { id: currentId },
        { username: faker.internet.userName() },
        { date: `${faker.date.month()} ${randomYear()}` },
        { text: faker.lorem.sentences() },
        { avatar: faker.image.avatar() }
      ]
      if (toReach === 0) {
        writer.write(JSON.stringify(data), encoding, callback);
      } else  {
        ok = writer.write(JSON.stringify(data), encoding);
      }
    }
    while (toReach > 0 && ok);
    if (toReach > 0)  {
      writer.once('drain', write);
    }
  }
  write();
}

writeReviews(reviewStream, 'utf-8', () => {
  reviewStream.end();
})






// while (currentId <= toReach) {
//   currentId++;
//   generatedReviews.push(
//     { id: currentId },
//     { username: faker.internet.userName() },
//     { date: `${faker.date.month()} ${randomYear()}` },
//     { text: faker.lorem.sentences() },
//     { avatar: faker.image.avatar() }
//   )
// }

// let writeStream = fs.createWriteStream(path);
// stringify(generatedReviews, { heaeder: true, columns: columns}, (err, data) => {
//   if (err) {
//     throw err;
//   } else {
//     writeStream.write(data);
//   }
//   writeStream.on('finish', () => console.log('wrote all data to file'));
//   writeStream.end();
// });

//use csv-stringify to stringiy columns and data
/*
stringify(generatedReviews, { header: true, columns: columns}, (err, data) => {
  if (err) throw err;
  fs.writeFile(path, data, (err) => {
    if (err) throw err;
    console.log(`Path saved at ${path}`);
  });
});
*/