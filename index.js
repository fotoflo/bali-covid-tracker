const fetchDailyData = require('./scrape').fetchDailyData;
const storeParsedResults = require('./store').storeParsedResults;
const database = require('./database')
const db = database.db;

const run = async () => {
	const data = await fetchDailyData()
	console.log("scraped")
	const stored = await storeParsedResults(data)
	console.log("finished")
	process.exit(0);
}

run();