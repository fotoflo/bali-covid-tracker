const should = require('chai').should();
const database = require('../database');

const db = database.db;

describe('database.db', () => {


	beforeEach(function (done) {
		db.query('DELETE FROM test')
			.then(done.bind(null, null))
			.catch(done);
	});
	// arrange 

 	it(`should be configured`,
		() => {			
			db.isConfigured().should.be.true;
		}
	)

	it('should return results', (done) => {
		db.query('INSERT INTO test SET ?', { id: 1, foobar: 'monkey' })
			.spread( (res) => {
				res.affectedRows.should.equal(1);
				return db.query('SELECT * FROM test');
			})
			.spread( (rows) => {
				rows.should.have.a.lengthOf(1);
				rows[0].id.should.equal(1);
				rows[0].foobar.should.equal('monkey');
				done();
			})
			.catch(done);
	});

	it('should reject on error',  (done) => {
		db.query('SELECT * FROM non_existing_table')
			.catch({ code: 'ER_NO_SUCH_TABLE' },  (err) => {
				err.should.exist;
				done();
			})
			.catch(done);

	});
})