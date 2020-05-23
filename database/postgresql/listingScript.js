const fs = require('fs');
const path = './csv/Listings/listings.csv';
const faker = require('faker');

//columns for csv file
const columns = {
  id: 'Id',
  name: 'Name'
};

//generate script to feed Listings table
const generatedListings = [];

let listingStream = fs.createWriteStream(path);
listingStream.write('id,name\n', 'utf8');

/* needs work to be fully automatic*/
function writeListings (writer, encoding, callback) {
  let currentId = 0; //current counter of listingIds
  let toReach = 10000000; //current number to reach
  function write() {
    let ok = true;
    do {
      toReach--;
      currentId++;
      let name = faker.random.words();
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
});