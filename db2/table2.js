var Sequelize = require('sequelize')
  var db = require('../index.js')
  module.exports = db.define('TABLE2',{  
	COL1:{
		type: Sequelize.COL2, },
	COL2:{
		type: Sequelize.COL3, }
})