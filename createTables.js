function createTables(db){

  db.query(`CREATE TABLE IF NOT EXISTS
                  regency_data(
                    id SERIAL PRIMARY KEY,
                    date DATE,
                    location VARCHAR (255),
                    type VARCHAR (255),
                    count INTEGER
                  )
  `);

  db.query(`CREATE TABLE IF NOT EXISTS
                  raw_reports(
                    id SERIAL PRIMARY KEY,
                    fetch_date date,
                    report JSON NOT NULL
                  )
  `);

}

module.exports = createTables;