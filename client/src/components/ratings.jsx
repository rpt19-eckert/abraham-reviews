import React from 'react';

let divStyle = {
  'fontFamily': 'Roboto',
  'display': 'grid',
  'gridTemplateColumns': '1fr 1fr',
  'gridTemplateRows': '1fr 1fr 1fr'
}

class Ratings extends React.Component {
  constructor(props) {
    super(props)

  }

  attrScore(value, attr) {
    if (value.length === 0) {
      return 0;
    }
    let helperScore = 0;
    let reviews = value[0].reviews;
    // console.log('value of reviews', reviews.length);
    for (let i = 0; i < reviews.length; i++) {
      let scores = reviews[i].scores[0];
      // console.log(scores);
      helperScore += +scores[attr];
    }
    return (helperScore / reviews.length);
  }

  render() {
    return (<div style={divStyle}>
      <div>Cleanliness: {(this.attrScore(this.props.reviews, 'cleanliness')).toFixed(1)}</div>
      <div>Accuracy: {(this.attrScore(this.props.reviews, 'accuracy')).toFixed(1)}</div>
      <div>Communication: {(this.attrScore(this.props.reviews, 'communication')).toFixed(1)}</div>
      <div>Location: {(this.attrScore(this.props.reviews, 'location')).toFixed(1)}</div>
      <div>Check-In: {(this.attrScore(this.props.reviews, 'checkin')).toFixed(1)}</div>
      <div>Value: {(this.attrScore(this.props.reviews, 'value')).toFixed(1)}</div>
    </div>)
  }
}

export default Ratings;