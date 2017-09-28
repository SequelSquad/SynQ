import functions from './TextFunctions'
import fs from "fs"

let file = ''

export default (state) => {
  // const setup = functions.setup();
  // const data = functions.tableName(state.input);
  // const columEnd = functions.endColumn()
  // const tableEnd = functions.endTable()
  // const sequelizeFile = file.concat(setup, data, columEnd, tableEnd)

  const isNull = functions.boolean('allowNull', true)
  const isEmail = functions.boolean('isEmail', false)
  const validation = functions.validate(isEmail)
  const type = functions.type('STRING')
  const parameters = type.concat(isNull, validation)

  const column = functions.column(state.input,parameters)
  const table = functions.table(state.input, column)
  const finalFile = functions.setup(table)

  fs.mkdir("./db2", (err) => {
    if (err) {
      console.log("failed to create dir", err)
    } else {
      fs.writeFile("./db2" + "/test.js", finalFile, (err) => {
        if (err) {
          console.log("Where's the input?")
        }
        else {
          console.log("wrote file")
        }
      })
    }
  })
}

