import { Pool } from 'pg';
import 'dotenv/config';

export const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DATABASENAME,
  password: process.env.DBPASSWORD,
  dialect: process.env.DIALECT,
  // @ts-expect-error
  port: process.env.DBPORT,
});
