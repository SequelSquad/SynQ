var Sequelize = require('sequelize')
  var db = require('../index.js')
  module.exports = db.define('breeders',{  
	breed:{
		type: Sequelize.STRING,
		allowNull: false,
		isEmail: false },
	breeders:{
		type: Sequelize.STRING,
		allowNull: false,
		isEmail: false,
		validate: {	
		is: ["^[a-z]+$"]}}
})