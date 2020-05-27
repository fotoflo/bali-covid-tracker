function createTables(client){

  client.query(`CREATE TABLE IF NOT EXISTS
                  regency_data(
                    id SERIAL PRIMARY KEY,
                    date DATE,
                    location VARCHAR (255),
                    type VARCHAR (255),
                    count INTEGER,
                  )
  `);

  client.query(`CREATE TABLE IF NOT EXISTS
                  raw_reports(
                    id SERIAL PRIMARY KEY,
                    url VARCHAR (4096) NOT NULL,
                    fetch_date date,
                    report JSON NOT NULL
                  )
  `);

}

module.exports = createTables;