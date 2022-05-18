DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id serial PRIMARY KEY,
    age integer,
    kind VARCHAR,
    name VARCHAR
);