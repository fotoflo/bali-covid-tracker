const fetchDailyData = require('./scrape').fetchDailyData;
const storeParsedResults = require('./store').storeParsedResults;
const calculateTotals = require('./store').calculateTotals;
const database = require('./database');
const db = database.db;

const run = async () => {
	console.log( "Fetching for " + new Date());
	const data = await fetchDailyData()
	console.log("scraped")
	const stored = await storeParsedResults(data)
	console.log("stored, calculating totals")
	let totals = await calculateTotals();
	console.log("inserted totals")
	process.exit(0);
}

run();