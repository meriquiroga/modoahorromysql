const Sequelize = require('sequelize')

const database = new Sequelize('modoahorro2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = database