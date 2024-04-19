DROP TABLE if exists research;

CREATE TABLE research (
    id SERIAL PRIMARY KEY,
    cord_uid TEXT,
    sha TEXT,
    source TEXT,
    title TEXT,
    doi TEXT,
    pmcid TEXT,
    pubmed_id TEXT,
    license TEXT,
    abstract TEXT,
    publish_time TEXT,
    authors TEXT,
    journal TEXT,
    mag_id TEXT,
    who_covidence_id TEXT,
    arxiv_id TEXT,
    pdf_json_files TEXT,
    pmc_json_files TEXT,
    url TEXT,
    s2_id TEXT
);

COPY research (cord_uid,sha,source,title,doi,pmcid,pubmed_id,license,abstract,publish_time,authors,journal,mag_id,who_covidence_id,arxiv_id,pdf_json_files,pmc_json_files,url,s2_id
) FROM '/docker-entrypoint-initdb.d/metadata.csv' DELIMITER ',' CSV HEADER;