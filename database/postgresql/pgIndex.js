const { Sequelize } = require('Sequelize');
const sequelize = new Sequelize('postgres://postgres:postgrespw@localhost:5432/reviews')

try {
  sequelize.authenticate();
  console.log('Connected to Postgrest db successfully.')
} catch (error) {
  console.log('Unable to connect to Postgres db.')
}