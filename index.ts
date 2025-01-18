import { pool } from './db';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PoolClient } from 'pg';

/* Creates an Express application. */
const app = express();
const port = 3001;

// CORS is enabled for the selected origins
let corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
};

let createCustomerCorsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3001/customer/create',
  ],
};

/* Body Parser is used to extract the
   entire body portion of an incoming
   request stream and exposes it on req.body
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

pool.connect(
  (
    err: Error | undefined,
    client: PoolClient | undefined,
    release: any
  ) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }

    client?.query('SELECT NOW()', (err, result) => {
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log('Connected to Database !');
    });

    release();
  }
);

// app.get('/testdata', cors(corsOptions), (req, res, next) => {
//   console.log('TEST DATA :');
//   pool.query('Select * from Customers').then((customerData) => {
//     console.log(customerData);
//     res.send(customerData.rows);
//   });
// });

app.options('/customer/create', cors());
// app.post(
//   '/customer/create',
//   cors(createCustomerCorsOptions),
//   (req, res, next) => {
//     console.log('REQ.BODY', req.body);

//     const {
//       firstName,
//       lastName,
//       address,
//       homePhone,
//       cellPhone,
//       email,
//     } = req.body;

//     pool
//       .query(
//         `INSERT INTO Customers (firstName, lastName, address, homePhone, cellPhone, email) VALUES ('${firstName}', '${lastName}', '${address}', '${homePhone}', '${cellPhone}', '${email}') returning *`
//         // `INSERT INTO Customers (firstName, lastName, address, homePhone, cellPhone, email) VALUES ('joe', 'jacobi', 'test', '1234567890', '1234567890', 'test@test.com')`
//       )
//       .then((customer) => {
//         res.send(customer.rows);
//       });
//   }
// );

// Require the Routes API
// Create a Server and run it on the port 3000
const server = app.listen(port, function () {
  console.log(
    `App listening on port ${port}`,
    `Server Address: ${server.address()}`
  );
});
