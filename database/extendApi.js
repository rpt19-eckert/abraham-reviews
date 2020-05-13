const { Reviews } = require('./index.js')
const faker = require('faker')

////////////////////////////////////
//helper functions
let genYear = () => {
  let years = [2015, 2016, 2017, 2018, 2019, 2020];
  let randPick = Math.floor(Math.random() * Math.floor(6));
  return years[randPick];
}
let randomRating = () => {
  let rand1 = Math.floor(Math.random() * Math.floor(5));
  let rand2 = Math.floor(Math.random() * Math.floor(9));
  let result = rand1 + '.' + rand2;
  return result;
}

//HANDLE NEW POST
Reviews.create({
  id: 10101, //need to resolve by incrementing +1 each time a new review is created.
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
    console.error('Error in create: ', err);
  } else {
    console.log('Successful create: ', JSON.stringify(data));
  }
});