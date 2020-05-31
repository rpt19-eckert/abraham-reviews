const express = require('express');
const path = require('path');
// const {Review} = require('../database/postgresql/pgIndex.js');
const { getListings, getReviews, getScores } = require('../database/postgresql/queries.js')
var expressStaticGzip = require("express-static-gzip");
const faker = require('faker');

let app = express();

app.use(express.text());
app.use(express.urlencoded());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/', expressStaticGzip(path.join(__dirname + '/../public'), {
  enableBrotli: true
}));

//For other services, Get avg score & # of reviews e.g. '2.78, 12 reviews'
app.get('/averageScore:id', (req, res) => {
  let listId = req.params.id;
  Review.findOne({id: listId}, (err, result) => {
    if (err) {
      console.log('error in averageScore', err);
      res.sendStatus(404);
    } else {
      if (result.length === 0) {
        return 0;
      }
      let finalScore = 0;
      let helperScore = 0;
      let reviews = result[0].reviews;
      let reviewNumber = reviews.length;
      for (let i = 0; i < reviews.length; i++) {
        let scores = reviews[i].scores[0];

        helperScore += +scores.cleanliness;
        helperScore += +scores.communication;
        helperScore += +scores.checkin;
        helperScore += +scores.accuracy;
        helperScore += +scores.location;
        helperScore += +scores.value;

        finalScore += (helperScore / 6);
        helperScore = 0;
      }
      res.end(`${(finalScore / reviews.length).toFixed(2).toString()}, (${reviewNumber} reviews)`);
    }
  })
})

//Get listing by either id or name
app.get('/listing', (req, res) => {
  let listId = req.query.data || 10001;
  console.log('list id: ', listId)
  let reg = /\d{5}/;
  //test to see if id num or listing string
  let result = reg.test(listId);

  getListings(listId, (err, listData) => {
    getReviews(listId, (err, reviewData) => {
      getScores(listId, (err, scoreData) => {
        let reviews = {
          id: listData.id,
          name: listData.name,
          reviews: reviewData,
          scores: scoreData
        }
        console.log('server data: ', reviews);
        if (err) res.status(500).send(err);
        else res.status(200).send(reviews);
      });
    });
  });

});

//Route to get index.html back after updating state
app.get('/:id', (req, res) => {
  console.log('send file');
  res.sendFile(path.join(__dirname, '../public', '/index.html'));
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//POST NEW REVIEW
app.post('/listing/review', (req, res) => {
  /* generate random year */
  let genYear = () => {
    let years = [2015, 2016, 2017, 2018, 2019, 2020];
    let randPick = Math.floor(Math.random() * Math.floor(6));
    return years[randPick];
  }
  /* create random rating */
  let randomRating = () => {
    let rand1 = Math.floor(Math.random() * Math.floor(5));
    let rand2 = Math.floor(Math.random() * Math.floor(9));
    let result = rand1 + '.' + rand2;
    return result;
  }
  /* generate unique id */
  let incrementIdValue = () => {
    let id = 10101;
    let store = [];
    if (store.includes(id)) {
      id++;
    } else {
      store.push(id);
    }
    return id;
  }
    Review.create({
      id: incrementIdValue(), //need to resolve by incrementing +1 each time a new review is created.
      name: faker.name.findName(),
      reviews: {
        username: faker.name.findName(),
        date: `${faker.date.month()} ${genYear()}`,
        text: faker.lorem.paragraph(),
        avatar: faker.internet.avatar(),
        scores: [
          {
            cleanliness: randomRating(),
            communication: randomRating(),
            checkin: randomRating(),
            accuracy: randomRating(),
            location: randomRating(),
            value: randomRating()
          }
        ]
      }
    }, (err, data) => {
      if (err) {
        res.status(404).json('Error posting new review.')
      } else {
        console.log('Successful create');
        res.status(200).send(data)
      }
    });
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put('/listing/update/:listingId', (req, res) => {
  let listingId = req.params.listingId;
  console.log('listing id: ', listingId);
  let updateQuery = { id : listingId }
  Review.findOneAndUpdate(updateQuery, {name: faker.lorem.words()}, (err, data) => {
    if (err){
      res.status(404).send(err)
    } else {
      console.log('successful update: ', data.name);
      res.status(200).send(data);
    }
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.delete('/listing/delete/:listingId', (req, res) => {
  let listingId = req.params.listingId;
  console.log('listing id: ', listingId);
  let deleteQuery = { id: listingId }
  Review.deleteOne(deleteQuery, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log('Successful delete.')
      res.status(200).send('File deleted.');
    }
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/listing/:listingId', (req, res) => {
  let listingId = req.params.listingId;
  console.log('listing id: ', listingId);
  let query = { id: listingId }
  Review.findOne(query, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log('Successful get.')
      res.status(200).send('File retrieved.');
    }
  });
});




app.listen(3004, () => {
  console.log('Listening on port 3004');
});

module.exports = app;
