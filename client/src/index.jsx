import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Score from './components/score.jsx';
import Ratings from './components/ratings.jsx';
import Reviews from './components/reviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      dataLoaded: false,
    }
  }

  //get URL, split, pass data to get listing information and pass to state as reviews.
  componentDidMount() {
    let url = window.location.href;
    let listingId;
    if (url.split.length) {
      listingId = url.split('/').pop();
    } else {
      listingId = '10001';
    }
    $.ajax({
      type: 'GET',
      url: "http://127.0.0.1:3004/listing",
      data: {data: listingId},
      dataType: 'text',
      success: (results) => {
        let state = JSON.parse(results);
        this.setState(() => ({reviews: state}));
      },
      error: () => {
        console.log('error in onload API call');
      }
    });
  }

render() {
  return (<div>
    <Score reviews={this.state.reviews} />
    <br></br>
    <Ratings reviews={this.state.reviews} />
    <br></br>
    <Reviews reviews={this.state.reviews} />
  </div>)
}
}

ReactDOM.render(<App />, document.getElementById('reviews'));