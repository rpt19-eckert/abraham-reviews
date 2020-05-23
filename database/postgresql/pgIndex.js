const { Sequelize, DataTypes } = require('Sequelize');
const sequelize = new Sequelize('postgres://me:password@localhost:5432/reviews')

//establish db connection
try {
  sequelize.authenticate();
  console.log('Connected to Postgrest db successfully.')
} catch (error) {
  console.log('Unable to connect to Postgres db.')
}

//i will need to have a one to many relationship for my tables
//Listing is the parent, where Reviews are the child of each Listing, and the Score are the children of each Review for each Listing

//listing - review - score

//create model
const Listing = sequelize.define('Listing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Review = sequelize.define('Review', {
  // reviews: [
  //   {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false
      }
    // }
  // ]
});

const Score = sequelize.define('Score', {
  // scores: [
    // {
      cleanliness: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      communication: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      checkin: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      accuracy: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      location: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    // }
  // ]
});

Listing.belongsToMany(Review, { through: Score });


sequelize.sync({ force: true });

module.exports.Review = Review;