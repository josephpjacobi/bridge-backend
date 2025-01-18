DROP DATABASE IF EXISTS marinaappdb;

CREATE DATABASE marinaappdb;

\c marinaappdb

-- Set up Marinas table
CREATE TABLE IF NOT EXISTS Marinas
(
    id SERIAL PRIMARY KEY,
  marina_name VARCHAR(50) NOT NULL,
  address VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip_code VARCHAR(100) NOT NULL,
  updated_at timestamp NOT NULL,
  created_at timestamp NOT NUll
);

ALTER TABLE Marinas
    OWNER to postgres;



-- INSERT INTO marinas (
--   marina_name, address, city, state, zip_code
-- ) Values (
--   "Bridge Marina",
--   "40 Ludlam Ave",
--   "Bayville",
--   "NY",
--   "11709"
-- );



-- CREATE TABLE customers (
--   id SERIAL PRIMARY KEY,
--   marina_name VARCHAR(50) NOT NULL,
--   address VARCHAR(100) NOT NULL,
--   updated_at timestamp NOT NULL,
--   created_at timestamp NOT NUll
-- );

-- CREATE TABLE vessels (
--   id SERIAL PRIMARY KEY,
--   marina_name VARCHAR(50) NOT NULL,
--   address VARCHAR(100) NOT NULL,
--   updated_at timestamp NOT NULL,
--   created_at timestamp NOT NUll
-- );

-- CREATE TABLE contracts (
--   id SERIAL PRIMARY KEY,
--   marina_name VARCHAR(50) NOT NULL,
--   address VARCHAR(100) NOT NULL,
--   updated_at timestamp NOT NULL,
--   created_at timestamp NOT NUll
-- );

-- CREATE TABLE work_orders (
--   id SERIAL PRIMARY KEY,
--   marina_name VARCHAR(50) NOT NULL,
--   address VARCHAR(100) NOT NULL,
--   updated_at timestamp NOT NULL,
--   created_at timestamp NOT NUll
-- );

-- CREATE TABLE invoices (
--   id SERIAL PRIMARY KEY,
--   marina_name VARCHAR(50) NOT NULL,
--   address VARCHAR(100) NOT NULL,
--   updated_at timestamp NOT NULL,
--   created_at timestamp NOT NUll
-- );