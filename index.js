const fetchDailyData = require('./scrape').fetchDailyData;
const storeParsedResults = require('./store').storeParsedResults;
const database = require('./database')
const db = database.db;

const run = async () => {
	const data = await fetchDailyData()
	const stored = await storeParsedResults(data)
}

run();