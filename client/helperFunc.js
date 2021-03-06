//score.jsx
const score = (value) => {
  if (value.length === 0) {
    return 0;
  }
  let finalScore = 0;
  let helperScore = 0;
  // console.log('value in helperF: ', value.reviews);
  let reviews = value.reviews;
  // console.log('reviews in  hF: ', reviews);
  for (let i = 0; i < reviews.length; i++) {
    let scores = value.scores[0];

    helperScore += +scores.cleanliness;
    helperScore += +scores.communication;
    helperScore += +scores.checkin;
    helperScore += +scores.accuracy;
    helperScore += +scores.location;
    helperScore += +scores.value;

    finalScore += (helperScore / 6);
    helperScore = 0;
  }
  return (finalScore / reviews.length);
}

const totalReviews = (value) => {
  if (value.length === 0) {
    return 0;
  } else {
    return value.reviews.length;
  }
}

//ratings.jsx

const border = (value, attr) => {
  return {
    'borderBottom': 'solid',
    'borderBottomWidth': '50%',
    'position': 'relative',
    'bottom': '10px',
    'left': '45px',
    'right': '105px',
    'paddingLeft': (((+attrScore(value, attr) * 20) + 5).toFixed(0) + 'px').toString(),
    'color': 'black',
  }
}

const attrScore = (value, attr) => {
  if (value.length === 0) {
    return 0;
  }
  let helperScore = 0;
  let reviews = value.reviews;
  for (let i = 0; i < reviews.length; i++) {
    let scores = value.scores[0];
    helperScore += +scores[attr];
  }
  return (helperScore / reviews.length);
}

module.exports = {
  score,
  totalReviews,
  border,
  attrScore
}