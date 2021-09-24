const Sequelize = require('sequelize')

const database = new Sequelize('modoahorro', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = database