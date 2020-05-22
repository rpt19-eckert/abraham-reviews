const fs = require('fs');
const stringify = require('csv-stringify');
const path = './csv/listings.csv';
const faker = require('faker');

//columns for csv file
const columns = {
  id: 'Id',
  name: 'Name'
};

//generate script to feed Listings table
const generatedListings = [];

let currentId = 9000000; //current counter of listingIds
let toReach = 10000000; //current number to reach
/* needs work to be fully automatic*/
while (currentId <= toReach) {
  currentId++;
  generatedListings.push(
    { id: currentId },
    { name: faker.random.words() }
  )
}





//use csv-stringify to stringiy columns and data
stringify(generatedListings, { header: true, columns: columns}, (err, data) => {
  if (err) throw err;
  fs.writeFile(path, data, (err) => {
    // let listingStream = fs.createWriteStream()
    if (err) throw err;
    console.log(`Path saved at ${path}`);
  });
});