// import { pool } from './db';
import express from 'express';
// import cors from 'cors';
import { graphql, GraphQLObjectType, GraphQLSchema, GraphQLString, } from 'graphql';
import { createHandler } from 'graphql-http';
// import { PoolClient } from 'pg';
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => 'world',
            },
        },
    }),
});
const root = {
    hello: () => {
        return 'Hello world!';
    },
};
const port = 3001;
// CORS is enabled for the selected origins
// let corsOptions = {
//   origin: ['http://localhost:3000', 'http://localhost:3001'],
// };
// let createCustomerCorsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'http://localhost:3001',
//     'http://localhost:3001/customer/create',
//   ],
// };
const app = express();
graphql({
    schema,
    source: '{ hello }',
    rootValue: root,
}).then((response) => {
    console.log(response);
});
// @ts-ignore
app.all('/graphql', createHandler({ schema, rootValue: root }));
// pool.connect(
//   (
//     err: Error | undefined,
//     client: PoolClient | undefined,
//     release: any
//   ) => {
//     if (err) {
//       return console.error('Error acquiring client', err.stack);
//     }
//     if (client === undefined) {
//       return console.error('Unable to connect to client');
//     }
//     client.query('SELECT NOW()', (err, result) => {
//       if (err) {
//         return console.error('Error executing query', err.stack);
//       }
//       console.log('Connected to Database !');
//     });
//     release();
//   }
// );
app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
//# sourceMappingURL=index.js.map