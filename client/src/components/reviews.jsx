import React from 'react';
import Review from './review.jsx';

let divStyle = {
  'fontFamily': 'Roboto',
  'display': 'grid',
  'gridTemplateColumns': '1fr 1fr',
  'gridTemplateRows': '1fr',
}

class Reviews extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    console.log('props in reviews: ', this.props.reviews.reviews);
    return (<div style={divStyle}>
      {this.props.reviews.length > 0 &&
        this.props.reviews.reviews.map((item, index) => {
        console.log('item: ', item);
        return <Review key={index} reviews={item} />
      })}
    </div>)
  }
}

export default Reviews;