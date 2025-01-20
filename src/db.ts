import { Pool } from 'pg';
import { dbConfig } from './config';

// @ts-expect-error
export const pool = new Pool(dbConfig);
