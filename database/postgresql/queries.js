const {Pool, Client} = require('pg');
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'reviews',
  password: 'password',
  port: 5432
});
pool.connect((err) => {
  if (err) console.log('Error connecting to Postgres');
  else console.log('Postgres successfully connected');
});

/* QUERIES */
////////////////////////////////////

const getReviews = (queryId, callback) => {
  console.log('queryId: ', queryId);
  let queryStr = `select * from reviews where listingid = ${queryId}`;
  // let queryStr = `select * from listings join reviews on listings.id = reviews.${queryId} join scores on reviews.id = scores.${queryId}`;
  console.log('queryId: ', queryId)
  pool.query(queryStr, (err, data) => {
    console.log('data (db): ', data.rows);
    if (err) {
      callback(err);
    } else {
      callback(null, data.rows);
    }
  });
}

////////////////////////////////////



module.exports = {
  getReviews
}