const fs = require('fs');
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

/* needs work to be fully automatic*/
function writeReviews (writer, encoding, callback) {
  let currentId = 0; //current counter of listingIds
  let toReach = 10000000; //current number to reach
  function write() {
    let ok = true;
    do {
      toReach--;
      currentId++;
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
});