import electron from "electron"
import path from "path"
import fs from "fs"

class Store {
	constructor(opts){
		const userDataPath = (electron.app || electron.remote.app).getPath("userData")
		this.path = path.join(userDataPath, opts.configName + ".txt")
		this.data = parseDataFile(this.path, opts.defaults)
	}

	get(){
		return
	}



}


function parseDataFile(filePath, defaults){
	fs.readFile(filePath, (err, data) => {
		if (err) defaults
		else this.data =  data.toString.split("\n")
	})


}
