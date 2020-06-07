use covid_tracker;
select * from regency_data;
select * from regency_data where location = "TOTAL";

#translations
select date, location, count,
	CASE
		WHEN type = 'lainnya' THEN "other"
        WHEN type = 'meninggal' THEN "dead"
        WHEN type = 'pp' THEN "pp" #?????
        WHEN type = 'otg' THEN "possible, no symptoms"
        WHEN type = 'odp' THEN "suspected outpatient"
        WHEN type = 'pdp' THEN "under isolation"
        WHEN type = 'sembuh' THEN "recovered"
        WHEN type = 'positif' THEN "total positive"
        WHEN type = 'positif_luar' THEN "positive outside" #?????
        WHEN type = 'positif_lokal' THEN "positive_local"
        WHEN type = 'positif_dalam' THEN "positive_inside" #?????
        WHEN type = 'positif_lainnya' THEN "positive_other"
    ELSE "ERROR"
END as type
from regency_data;

# totals
select type, sum(count) as total
from regency_data
where date = curdate()
group by type;





show tables;

CREATE TABLE IF NOT EXISTS
                  regency_data(
                    id SERIAL PRIMARY KEY,
                    date DATE,
                    location VARCHAR (255),
                    type VARCHAR (255),
                    count INTEGER
                  );
				
delete from regency_data;
select count(id) from regency_data;


select * from regency_data order by date desc;