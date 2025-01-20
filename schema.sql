DROP DATABASE IF EXISTS buoy_db;

CREATE DATABASE buoy_db;

\c buoy_db

-- Set up Marinas table
CREATE TABLE IF NOT EXISTS marinas
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip_code VARCHAR(100) NOT NULL,
  updated_at timestamp NOT NULL DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE marinas
    OWNER to postgres;

INSERT INTO marinas (
  name, address, city, state, zip_code
) Values (
  'Bridge Marina',
  '40 Ludlam Ave',
  'Bayville',
  'NY',
  '11709'
);

INSERT INTO marinas (
  name, address, city, state, zip_code
) Values (
  'Oyster Bay Marine Center',
  '5 Bay Ave',
  'Oyster Bay',
  'NY',
  '11771'
);

INSERT INTO marinas (
  name, address, city, state, zip_code
) Values (
  'Sagamore Yacht Club',
  '7 Bay Ave',
  'Oyster Bay',
  'NY',
  '11771'
);

CREATE TABLE IF NOT EXISTS marina_customer (
  id SERIAL PRIMARY KEY,
  marina_id	integer NOT NUll,
  owner_id integer NOT NULL,
  inventory_id integer NOT NULL,
  updated_at timestamp NOT NUll DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE marina_customer
    OWNER to postgres;

INSERT INTO marina_customer (
  marina_id, owner_id, inventory_id
) Values (
  '1', -- Bridge Marina
  '1', -- Joe Jacobi
  '1' -- Bassman
);

CREATE TABLE IF NOT EXISTS marina_inventory (
  id SERIAL PRIMARY KEY,
  marina_id	integer NOT NUll,
  inventory_id integer NOT NULL,
  updated_at timestamp NOT NUll DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE marina_inventory
    OWNER to postgres;

INSERT INTO marina_inventory (
  marina_id, inventory_id
) Values (
  '1', -- Bridge Marina
  '1' -- Bossman
);

CREATE TABLE IF NOT EXISTS vessels (
  id SERIAL PRIMARY KEY,
  year integer NOT NULL,
  boat_name VARCHAR(50),
  length integer NOT NULL,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50),
  updated_at timestamp NOT NUll DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE vessels
    OWNER to postgres;

INSERT INTO vessels (
  year, boat_name, length, make, model
) Values (
  '2005',
  'Bassman',
  '24',
  'Boston Whaler',
  'Outrage'
);

CREATE TABLE IF NOT EXISTS owners (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  address VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip_code VARCHAR(100) NOT NULL,
  updated_at timestamp NOT NUll DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE owners
    OWNER to postgres;

INSERT INTO owners (
  first_name, last_name, address, city, state, zip_code
) Values (
  'Joe',
  'Jacobi',
  '20 Pine Lane',
  'Bayville',
  'NY',
  '11709'
);

CREATE TABLE IF NOT EXISTS contracts (
  id SERIAL PRIMARY KEY,
  status VARCHAR(50) NOT NULL,
  vessel_id	integer NOT NULL,
  marina_id	integer NOT NULL,
  delivery_method	VARCHAR(15) NOT NULL,
  completed_at timestamp,
  updated_at timestamp NOT NUll DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE contracts
    OWNER to postgres;

INSERT INTO contracts (
  status, vessel_id, marina_id, delivery_method
) Values (
  'Paid',
  '1', -- Bassman
  '1', -- Bridge Marina
  'email'
);

CREATE TABLE IF NOT EXISTS contract_items (
  id SERIAL PRIMARY KEY,
  contract_id	integer NOT NULL,
  type_id	integer NOT NULL,
  updated_at timestamp NOT NUll DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE contract_items
    OWNER to postgres;

INSERT INTO contract_items (
  contract_id, type_id
) Values (
  '1', -- Contract 1
  '1' -- Shrink Wrap
);

CREATE TABLE IF NOT EXISTS contract_item_type (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  marina_id	integer NOT NULL,
  description	VARCHAR(100) NOT NULL,
  updated_at timestamp NOT NUll DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE contract_item_type
    OWNER to postgres;

INSERT INTO contract_item_type (
  title, marina_id, description
) Values (
  'Shrink Wrap', -- Contract 1
  '1', -- Bridge Marina
  'Prepare your boat for winter by covering it with shrink wrap'
);

CREATE TABLE IF NOT EXISTS work_orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(50) NOT NULL,
  marina_id	integer NOT NULL,
  vessel_id	integer NOT NULL,
  contract_id integer,
  completed_at timestamp,
  updated_at timestamp NOT NUll DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE work_orders
    OWNER to postgres;

INSERT INTO work_orders (
  status, marina_id, vessel_id, contract_id
) Values (
  'Not started',
  '1', -- Bridge Marina
  '1', -- Bassman
  '1' -- Contract 1
);

CREATE TABLE IF NOT EXISTS work_order_items (
  id SERIAL PRIMARY KEY,
  work_order_id	integer NOT NULL,
  type_id	integer NOT NULL,
  updated_at timestamp NOT NUll DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE work_order_items
    OWNER to postgres;

INSERT INTO work_order_items (
  work_order_id, type_id
) Values (
  '1', -- Work Order 1
  '1' -- Shrink wrap
);

CREATE TABLE IF NOT EXISTS work_order_item_type (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  marina_id	integer NOT NULL,
  description	VARCHAR(100) NOT NULL,
  updated_at timestamp NOT NUll DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE work_order_item_type
    OWNER to postgres;

INSERT INTO work_order_item_type (
  title, marina_id, description
) Values (
  'Shrink Wrap',
  '1', -- Bridge Marina
  'Cover boat with shrink wrap'
);

CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  status VARCHAR(50) NOT NULL,
  marina_id	integer NOT NULL,
  work_order_id integer,
  vessel_id	integer,
  owner_id integer,
  date_sent timestamp,
  date_due timestamp,
  completed_at timestamp,
  updated_at timestamp NOT NUll DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE invoices
    OWNER to postgres;

INSERT INTO invoices (
  status, marina_id, work_order_id, vessel_id, owner_id
) VALUES (
  'Paid',
  '1', -- Bridge Marina
  '1', -- Work Order 1
  '1', -- Bassman
  '1' -- Joe Jacobi
);

CREATE TABLE IF NOT EXISTS line_items (
  id SERIAL PRIMARY KEY,
  invoice_id	integer NOT NULL,
  type_id	integer NOT NULL,
  price integer NOT NULL,
  labor_in_hours integer,
  updated_at timestamp NOT NUll DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE line_items
    OWNER to postgres;

INSERT INTO line_items (
  invoice_id, type_id, price, labor_in_hours
) VALUES (
  '1', -- Invoice 1
  '1', -- Shrink Wrap
  '500', -- $500
  '1' -- 1 hour
);

CREATE TABLE IF NOT EXISTS line_item_type (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  marina_id	integer NOT NULL,
  description	VARCHAR(100) NOT NULL,
  updated_at timestamp NOT NUll DEFAULT NOW(),
  created_at timestamp NOT NUll DEFAULT NOW()
);

ALTER TABLE line_item_type
    OWNER to postgres;

INSERT INTO line_item_type (
  title, marina_id, description
) VALUES (
  'Shrink Wrap',
  '1', -- Bridge Marina
  'Cover boat with shrink wrap'
);