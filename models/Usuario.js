const Sequelize = require('sequelize')
const database = require("../config/database");

const Usuario = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      objetivo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
    
})

module.exports = Usuario