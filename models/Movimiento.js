const Sequelize = require("sequelize");
const database = require("../config/database");

const Movimiento = database.define("movimiento", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  number: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Movimiento;
