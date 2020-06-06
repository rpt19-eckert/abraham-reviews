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

/* GET QUERIES */

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
  });
};

/* POST QUERIES */

const newPost = (data, callback) => {
  console.log('data db post L', data)
  let newInsert = `WITH listing AS (
    INSERT INTO listings (id, name) VALUES(${data.id},${data.name}),
    RETURNING id),
    review AS (
      INSERT INTO reviews (id, username, date, text, avatar, listingid) VALUES (${data.id},${data.username},${data.date},${data.text},${data.avatar},${data.listingid})
    ),
    score AS (
      INSERT INTO scores(id, cleanliness, communication, checkin, accuracy, location, value, reviewid)
      VALUES (${data.id},${data.cleanliness},${data.communication},${data.checkin},${data.accuracy},${data.location},${data.value},${data.reviewid})
    )`;

  pool.query(newInsert, (err, data) => {
    if (err) callback(err);
    else callback(null, data);
  });
};

module.exports = {
  getListings,
  getReviews,
  getScores,
  newPost
}