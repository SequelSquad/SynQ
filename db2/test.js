var Sequelize = require('sequelize')
  var db = require('../index.js')
  module.exports = db.define('Puppies',{  
	breed:{
		type: Sequelize.STRING
		allowNull: false,
		isEmail: false },
	breeders:{
		type: Sequelize.STRING
		allowNull: false,
		isEmail: false }
})