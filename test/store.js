const should = require('chai').should();

const database = require('../database');
const db = database.db;


// the thing to test
const storeRawData = require('../store').storeRawData;

describe('storeRawData', () => {
	// arrange 
	const fs = require('fs');
	const sampleData = JSON.parse(fs.readFileSync('sampleDailyData.json'));


 	it(`should send the raw data to the database`,
		async () => {
			// act

			db.query('select * from raw_reports')
				.spread(rows) => {
					console.log(rows)
					done();
				})
				.catch(done);

			// assert


			// clean ups
		}
	)
})