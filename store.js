const database = require('./database');
const db = database.db;
const Promise = require("bluebird");


const storeRawData = async (data) => {
	db.query('INSERT INTO raw_reports SET ?', { 
		fetch_date: "CURDATE()",
		report: JSON.stringify(data) }
	)
}


const storeParsedResults = async (data) => {
	const regencies = Object.keys(data);

	await Promise.each(regencies, async regency => { 
	    let types = Object.keys( data[regency] )
	    await Promise.each( types, async type => {
	    	let count = data[regency][type];
	    	if(typeof(count) == 'string'){
		    	return;
		    }

	    	return await db.query('INSERT INTO regency_data SET ?',{
		    	 	type: type,
		    	 	date: today(),
		    	 	location: regency,
		    	 	count: count
		    	 } 
	    	)
	    }) 
	}).then( result => {
		console.log("done storing", result)
	}).catch( err => {
		console.log("error storing", err)
	})
}

const calculateTotals = async () => {
	return await db.query(`select type, sum(count) as count
		from regency_data
		where date = curdate()
		group by type;`)
	.spread( async rows => {
		return Promise.each(rows, async row => {
			console.log(row)
			await db.query('INSERT INTO regency_data SET ?',{
				    		type: row.type,
				    		date: today(),
				    		location: 'TOTAL',
				    		count: row.count
					    });
		})
	});
}


module.exports = {
	storeRawData,
	storeParsedResults,
	calculateTotals
};

const today = () =>{
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	return yyyy + '-' + mm + '-' + dd;
}
