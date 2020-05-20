const createCsvWriter = require('csv-write').createObjectCsvWrite;
const csvListing = createCsvWriter({
  path: './csv/listing.csv',
  header: [
    {id: 'id', title: 'Id'},
    {id: 'name', title: 'Name'}
  ]
});

//generate listing script below