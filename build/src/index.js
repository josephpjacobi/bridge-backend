import { buildSchema } from 'graphql';
import express from 'express'; // yarn add express
import { createHandler } from 'graphql-http/lib/use/express';
import { pool } from './db';
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`type Query { hello: String } `);
// The rootValue provides a resolver function for each API endpoint
const rootValue = {
    hello() {
        return 'Hello world!';
    },
};
const app = express();
app.all('/graphql', createHandler({
    schema: schema,
    rootValue: rootValue,
}));
pool.connect();
app.listen({ port: 4000 });
console.log('Listening to port 4000');
//# sourceMappingURL=index.js.map