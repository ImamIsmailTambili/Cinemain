SELECT * FROM "MasterKursi";

INSERT INTO "MasterKursi" ("nomorKursi")
SELECT 'J' || generate_series(1, 18);