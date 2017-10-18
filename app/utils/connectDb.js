import pg from "pg"

const initDatabases = () => {
	const client = new pg.Client()
	client.connect()
	return client.query("SELECT datname FROM pg_database")
		.then(result => result.rows)
		.catch(err => console.log(err))
}

export default initDatabases
