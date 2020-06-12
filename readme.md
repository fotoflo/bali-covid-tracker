BALICOVID SCRAPER

#installation

Clone the repository. Install the dependencies as usual:

    npm install


Also, create a file called '.env' in the root directory of the project. This needs to contain the login info for your database

    export DB_HOST=[address of your CloudSQL database]
    export DB_USER=[postgres username]
    export DB_PASS=[password for database user]
    export DB_NAME=[name of the database]
    export DB_PORT=[port of the database]

    then run `source .env` to add those environment variables to your environment - you can run `printenv` to validate they are now part of the runtime environment 
    
# running

put on a cron job
run daily at 12:01 bali time


## Database Structure

These are the tables used by the tool. In general, rows will be queried by the URL of the audit, and the time the report was fetched (fetch_time).

### raw_reports
Fill this one on crawl,
if this one exists for the date, we dont crawl again

0. id - SERIAL PRIMARY KEY - For unique identification
1. url - VARCHAR(2048) - The URL of the report
2. fetch_date - date - The fetch_time of the report where this request originated
3. report - json - The raw JSON of the report


### regency_data

0. id - SERIAL PRIMARY KEY - For unique identification
1. date - date - the date of the data
2. location - the location we're cralwing for
3. type - the type of data - new cases, recovered, etc
4. count - the number of new cases, recovered, etc


# Creating a data studio data source

I create a mysql source with the following query to create a data studio data source

```
select date, location, count, type as original,
	CASE
		WHEN type = 'lainnya' THEN "other"
        WHEN type = 'meninggal' THEN "dead"
        WHEN type = 'pp' THEN "pp" #?????
        WHEN type = 'otg' THEN "Possible, no symptoms"
        WHEN type = 'odp' THEN "Suspected Outpatient"
        WHEN type = 'pdp' THEN "Under Isolation"
        WHEN type = 'sembuh' THEN "Recovered"
        WHEN type = 'positif' THEN "Total Positive"
        WHEN type = 'positif_luar' THEN "Infected via International Traveler"
        WHEN type = 'positif_lokal' THEN "Infected via Local Transmission"
        WHEN type = 'positif_dalam' THEN "Infected via Domestic Traveler"
        WHEN type = 'positif_lainnya' THEN "Infected via Other Source"
    ELSE "ERROR"
END as type
from regency_data 
where location like "Total"
order by date desc;
```