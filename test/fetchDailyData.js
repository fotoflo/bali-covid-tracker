const should = require('chai').should();
const fetchDailyData = require('../scrape').fetchDailyData;

describe('fetchDailyData', () => {
	// arrange 

 	it(`should return an object with BADUNG as a property`,
		async () => {
			// act
			let result = await fetchDailyData();
			//console.log(result.values)
			// assert
			result.should.be.a('object')
			result.should.have.property('BADUNG')

			// clean ups
		}
	)
})