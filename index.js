const fetchDailyData = require('./scrape').fetchDailyData;
const database = require('./database')

const run = async () => {
	const data = await fetchDailyData()
	console.log(data);
}

run();