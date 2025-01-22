import { buildSchema } from 'graphql';
import express from 'express'; // yarn add express
import { createHandler } from 'graphql-http/lib/use/express';
import { pool } from './db';
import { postgraphile } from 'postgraphile';
import { database, devOptions, schemas } from './common';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(
  `type Query { allMarinas: String, marina: String }`
);

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  allMarinas() {
    return pool.query(`Select * from marinas;`);
  },
  marina() {
    return 'Here is only one marina';
  },
};

const middleware = postgraphile(database, schemas, devOptions);

const app = express();
app.use(middleware);

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: rootValue,
  })
);

pool.connect();

app.listen({ port: 4000 });
console.log('Listening to port 4000');
