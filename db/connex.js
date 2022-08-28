const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('toughts', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('conectado ao banco!')
}catch(e){
    console.log(`erro ao conectar: ${e}`)
}

module.exports = sequelize