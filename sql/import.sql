-- Adminer 4.7.7 PostgreSQL dump

DROP TABLE IF EXISTS "words";
DROP SEQUENCE IF EXISTS words_id_seq;
CREATE SEQUENCE words_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."words" (
                                  "id" integer DEFAULT nextval('words_id_seq') NOT NULL,
                                  "value" text NOT NULL,
                                  "category" text NOT NULL,
                                  CONSTRAINT "words_value" UNIQUE ("value")
) WITH (oids = false);

INSERT INTO "words" ("id", "value", "category") VALUES
                                                    (1,	'toto',	'test'),
                                                    (2,	'popo',	'test'),
                                                    (3,	'titii',	'test'),
                                                    (4,	'tata',	'test'),
                                                    (6,	'lolo',	'test'),
                                                    (7,	'momo',	'toast');


-- 2023-03-31 12:16:27.724979+00