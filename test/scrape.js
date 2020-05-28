const should = require('chai').should();

const database = require('../database');
const db = database.db;

const fetchDailyData = require('../scrape').fetchDailyData;

describe('fetchDailyData', () => {
	// arrange 

 	xit(`should return an object with BADUNG as a property`,
		async () => {
			// act
			const result = await fetchDailyData();
		//	console.log(result)
			// assert
			result.should.be.a('object')
			result.should.have.property('BADUNG')

			// clean ups
		}
	)
})