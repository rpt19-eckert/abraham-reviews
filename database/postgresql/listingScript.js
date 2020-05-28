const fs = require('fs');
<<<<<<< HEAD
const path = './csv/Listings/listings.csv';
=======
const stringify = require('csv-stringify');
const path = './csv/listings.csv';
>>>>>>> ec6251b176abc71dab4feb48edf10d564c939e4e
const faker = require('faker');

//columns for csv file
const columns = {
  id: 'Id',
  name: 'Name'
};

//generate script to feed Listings table
const generatedListings = [];

<<<<<<< HEAD
let listingStream = fs.createWriteStream(path);
// listingStream.write('id,name\n', 'utf8');

/* needs work to be fully automatic*/
function writeListings (writer, encoding, callback) {
  let currentId = 0; //current counter of listingIds
  let toReach = 10000000; //current number to reach
  function write() {
    let ok = true;
    do {
      toReach--;
      currentId++;
      let name = faker.name.firstName();
      let data = `${currentId},${name}\n`;
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

writeListings(listingStream, 'utf-8', () => {
  listingStream.end();
=======
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
>>>>>>> ec6251b176abc71dab4feb48edf10d564c939e4e
});