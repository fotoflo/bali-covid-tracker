const database = require('./database');
const db = database.db;


const storeRawData = async (data) => {
	db.query('INSERT INTO raw_reports SET ?', { 
		fetch_date: "CURDATE()",
		report: JSON.stringify(data) }
	)
}


const storeParsedResults = async (data) => {
	const regencies = Object.keys(data);

	regencies.forEach( regency => { 
	    let type = Object.keys( data[regency] )
	    type.forEach( type => {
	    	let count = data[regency][type];
	    	if(typeof(count) == 'string'){
		    	return;
		    }

	    	db.query('INSERT INTO regency_data SET ?',{
		    	 	type: type,
		    	 	date: today(),
		    	 	location: regency,
		    	 	count: count
		    	 } 
	    	)
	    }) 
	})	
}

module.exports = {
	storeRawData,
	storeParsedResults
};

const today = () =>{
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	return yyyy + '-' + mm + '-' + dd;
}
