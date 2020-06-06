const fetch = require('node-fetch')
const cheerio = require('cheerio')

const fetchDailyData = async () => {
	return fetch('https://pendataan.baliprov.go.id/')
		.then( res => res.text() )
		.then(( body )=>{
			const $ = cheerio.load(body)

			const json = $("body > div > script:nth-child(15)").html().split('\n')[1].split(' = ')[1].split(";")[0];
			const data = JSON.parse(json)
			return data;
		})
		.catch(err => {
			console.log("error fetching data ", err)
		});
	}

module.exports = {
	fetchDailyData
}