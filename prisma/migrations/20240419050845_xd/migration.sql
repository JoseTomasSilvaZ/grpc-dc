-- CreateTable
CREATE TABLE "research" (
    "id" SERIAL NOT NULL,
    "cord_uid" TEXT,
    "sha" TEXT,
    "source" TEXT,
    "title" TEXT,
    "doi" TEXT,
    "pmcid" TEXT,
    "pubmed_id" TEXT,
    "license" TEXT,
    "abstract" TEXT,
    "publish_time" TEXT,
    "authors" TEXT,
    "journal" TEXT,
    "mag_id" TEXT,
    "who_covidence_id" TEXT,
    "arxiv_id" TEXT,
    "pdf_json_files" TEXT,
    "pmc_json_files" TEXT,
    "url" TEXT,
    "s2_id" TEXT,

    CONSTRAINT "research_pkey" PRIMARY KEY ("id")
);
