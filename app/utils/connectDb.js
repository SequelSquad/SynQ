import pg from "pg"

let portSetting = "postgres://localhost:5432/"

export const initDatabases = () => {
	const client = new pg.Client()
	client.connect()
	return client.query("SELECT datname FROM pg_database")
		.then(result => result.rows)
		.catch(err => console.log(err))
}

export const loadTables = (db) => {
	const postgresUrl = portSetting + db
	const client = new pg.Client(postgresUrl)
	let querySearch = "SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'public'"
	client.connect()
	return client.query(querySearch)
		.then(result => {
			const tables = result.rows.map(table => table.table_name)
			return tables
		})
		.catch(err => console.log(err))
}

export const loadColumns = (settings) => {
	const postgresUrl = portSetting + settings.db
	const client = new pg.Client(postgresUrl)
	let querySearch = `SELECT * FROM information_schema.columns WHERE table_name = '${settings.table}' AND table_schema = 'public'`
	client.connect()
	return client.query(querySearch)
		.then(result => {
			const columns = result.rows.map(row => row.column_name)
			return {id:settings.id, dataValues: columns.map((column) => {
				return {id: Date.parse(new Date), name: column}
			})
			}
		})
		.catch(err => console.log(err))
}

