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

//listings
const getListings = (queryId, callback) => {
  let listQry = `select * from listings where id = ${queryId}`
  pool.query(listQry, (err, data) => {
    if (err) callback(err);
    else callback(null, data.rows[0]);
  })
}

//reviews
const getReviews = (queryId, callback) => {
  let reviewQry = `select * from reviews where listingid = ${queryId}`;
  // let queryStr = `select * from listings join reviews on listings.id = reviews.${queryId} join scores on reviews.id = scores.${queryId}`;
  pool.query(reviewQry, (err, data) => {
    if (err) callback(err);
    else callback(null, data.rows);
  });
}

//scores
const getScores = (queryId, callback) => {
  let scoreQry = `select * from scores where reviewid = ${queryId}`;
  pool.query(scoreQry, (err, data) => {
    if (err) callback(err);
    else callback(null, data.rows);
  })
}

module.exports = {
  getListings,
  getReviews,
  getScores
}