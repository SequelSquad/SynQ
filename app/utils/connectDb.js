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
				return {id: Date.parse(new Date), name: column, type: "", validations: []}
			})
			}
		})
		.catch(err => console.log(err))
}

export const loadTableForeignKeys = (settings) => {
	const postgresUrl = portSetting + settings.db
	const client = new pg.Client(postgresUrl)

	let querySearch = ["SELECT tc.constraint_name, tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name",
		"FROM information_schema.table_constraints AS tc JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name",
		"JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name WHERE constraint_type = 'FOREIGN KEY' AND tc.table_name='"]
	querySearch = querySearch.join(" ").trim() + settings.table + "'"
	client.connect()

	return client.query(querySearch)
		.then(result => {

			if (result.rows.length){
				return result.rows.map((relationship, i) => {
					return {id: Date.parse(new Date) + i , Table1: settings.id, Table2: relationship.foreign_table_name, Relationship: relationship.column_name}
				})
			} else {
				return result.rows
			}
			// return result.rows
		})
		.catch(err => console.log(err))
}

export const queryData = (settings) => {
	const postgresUrl = portSetting + settings.currentDatabase
	const client = new pg.Client(postgresUrl)
	let querySearch = settings.SQLquery
	if (querySearch.includes("DROP DATABASE")
				|| querySearch.includes("DROP TABLE")
				|| querySearch.includes("DELETE FROM")
	) querySearch = ""

	client.connect()

	return client.query(querySearch)
		.then(result => {
			if (!result) return []
			return result.rows
		})
		.catch(err => console.log(err))
}
