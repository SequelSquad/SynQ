import functions from './TextFunctions'
import fs from "fs"

export default (state) => {

  //create the directory and file
  fs.mkdir(state.path, (err) => {
    if (err) {
      console.log("failed to create dir", err)
    } else {
        //initiates array of columns to join at the end
      let columnArr = []

      //for each column in our DB, aka 'model.dataValue'
      state.model.dataValue.forEach(data => {

        //Store the validation strings
        let validateStr = " "
        //Store the boolean strings
        let booleanArr= []

        //if it has boolean elements
        if (data.properties.boolean){
          data.properties.boolean.forEach( bool => {
            let val = functions.boolean(bool[0], bool[1])
            booleanArr.push(val)
          })
        }

        //if it has validation elements
        if (data.properties.validate){
          let validateArr = []
          data.properties.validate.forEach( validation => {
            let val = functions.boolean(validation[0], validation[1])
            validateArr.push(val)
          })
          let validateJoin = validateArr.join()
          validateStr = functions.validate(validateJoin)
        }

        //Store the type string
        const type = functions.type(data.properties.type)

        //Join everything together!
        const booleanStr = booleanArr.join()
        const parameters = type.concat(booleanStr, validateStr)

        //create the column string
        const column = functions.column(data.name,parameters)

        //push the column string to the column array
        columnArr.push(column)
      })

      //Join all the columns into a single string
      const allMyData = columnArr.join()

      //pass the columns string into the table
      const table = functions.table(state.model.name, allMyData)

      //pass the table in the setup function
      const finalFile = functions.setup(table)

      fs.writeFile(state.path + `/${state.model.name}.js`, finalFile, (err) => {
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

