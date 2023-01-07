const Sequelize = require("sequelize");

const sequelizeObj = require("../util/databaseObj");

const Movie = sequelizeObj.define("movies", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  genre: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: "0",
  },
});

module.exports = Movie;
