const { Sequelize, DataTypes } = require('sequelize');
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
});

const Score = sequelize.define('Score', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      cleanliness: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      communication: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      checkin: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      accuracy: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      location: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      value: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
});

// Review.belongsTo(Listing, { as: 'ListingRef', foreignKey: 'listingId' });
// Review.hasMany(Score, { as: 'score' })
// sequelize.sync({ force: true });

module.exports = {
  Review, Score
}