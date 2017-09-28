const functions = {}

functions.setup = (table) => {
  return `var Sequelize = require('sequelize')
  var db = require('../index.js')
  module.exports = db.define(${table})`
}

//Ends the property if there are other properties inside this table
// functions.endProperties = () => {
//   return `,`
// }
//Start Table
functions.table = (TableName, TableProperties) => {
  console.log('creating table')
  return `'${TableName}',{ \n ${TableProperties} \n}`
}
//create column
functions.column = (ColumnName, ColumnProperties) => {
  console.log('creating column')
  return `\t ${ColumnName}:{\n ${ColumnProperties}}`
}
//column properties: TYPE
functions.type = (type) =>{
  console.log('creating type')
  return `\t \t type: Sequelize.${type},\n `
}
//Column properties: Boolean value property (etc allowNull, isEmail, isURL)
functions.property = (property, bool) => {
  console.log('creating allowNull')
  return `\t \t ${property}: ${bool},\n `
}
//Column properties: VALIDATE
functions.validate = (validationStr) =>{
  console.log('Creating validation')
  return `\t \t validate: {\n \t ${validationStr}}`
}

export default functions
