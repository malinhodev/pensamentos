const { DataTypes } = require('sequelize')
const db = require('../db/connex')
const User = require('./User')

const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,//vazio false
        require: true,
    },
})
Tought.belongsTo(User)//FAZ PARTE DO USUSARIO
User.hasMany(Tought)//TEM VARIOS PENSAMENTOS
module.exports = Tought