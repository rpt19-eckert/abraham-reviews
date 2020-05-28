const fs = require('fs');
<<<<<<< HEAD
=======
const stringify = require('csv-stringify');
>>>>>>> ec6251b176abc71dab4feb48edf10d564c939e4e
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

<<<<<<< HEAD
//create a random listing id for each review to reference.
let randomListingId = () => {
  let result = Math.floor(Math.random() * 10000000);
  if (result === 0) {
    result === 1;
  }
  return result;
}

let reviewStream = fs.createWriteStream(path);
// reviewStream.write(`id,username,date,text,avatar\n`, 'utf8');
=======






/*
create 10 files to populate 1 million records into each
create a for loop to 10, on each iteration create a new csv file which populates another 1 million
*/

let reviewStream = fs.createWriteStream(path);
reviewStream.write(JSON.stringify(columns), 'utf8');
>>>>>>> ec6251b176abc71dab4feb48edf10d564c939e4e

/* needs work to be fully automatic*/
function writeReviews (writer, encoding, callback) {
  let currentId = 0; //current counter of listingIds
  let toReach = 10000000; //current number to reach
  function write() {
    let ok = true;
    do {
      toReach--;
      currentId++;
<<<<<<< HEAD
      let username = faker.internet.userName();
      let date = `${faker.date.month()} ${randomYear()}`
      let text = faker.lorem.words();
      let avatar = faker.image.avatar();
      let listingId = randomListingId();
      let data = `${currentId},${username},${date},${text},${avatar},${listingId}\n`;
      if (toReach === 0) {
        writer.write(data, encoding, callback);
      } else  {
        ok = writer.write(data, encoding);
=======
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
>>>>>>> ec6251b176abc71dab4feb48edf10d564c939e4e
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
<<<<<<< HEAD
});
=======
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
>>>>>>> ec6251b176abc71dab4feb48edf10d564c939e4e
