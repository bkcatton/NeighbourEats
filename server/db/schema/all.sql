DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS listing_availability CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(30) NOT NULL,
  hashed_password VARCHAR(30) NOT NULL,
);

CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  street_name VARCHAR(255) NOT NULL,
  street_number VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  postal_code VARCHAR(255) NOT NULL,
  province VARCHAR(2) NOT NULL,
  listing_description VARCHAR(2) NOT NULL,
);

CREATE TABLE listing_availability (
  id SERIAL PRIMARY KEY NOT NULL,
  date_available DATE NOT NULL,
  listing_id INTEGER REFERENCES listing_id(id) ON DELETE CASCADE,
);