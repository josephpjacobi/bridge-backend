// Filename - index.js

// Entry Point of the API Server
const express = require('express');
const cors = require('cors');

/* Creates an Express application.
   The express() function is a top-level
   function exported by the express module.
*/
const app = express();
const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bridgemarinebackend',
  password: 'postgres',
  dialect: 'postgres',
  port: 5432,
});

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
  // headers: [

  // ]
  // 'Access-Control-Request-Method': 'POST',
};

/* To handle the HTTP Methods Body Parser
   is used, Generally used to extract the
   entire body portion of an incoming
   request stream and exposes it on req.body
*/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Connected to Database !');
  });
});

app.get('/testdata', cors(corsOptions), (req, res, next) => {
  console.log('TEST DATA :');
  pool.query('Select * from Customers').then((customerData) => {
    console.log(customerData);
    res.send(customerData.rows);
  });
});

app.options('/customer/create', cors());
app.post(
  '/customer/create',
  cors(createCustomerCorsOptions),
  (req, res, next) => {
    console.log('REQ.BODY', req.body);

    const {
      firstName,
      lastName,
      address,
      homePhone,
      cellPhone,
      email,
    } = req.body;

    pool
      .query(
        `INSERT INTO Customers (firstName, lastName, address, homePhone, cellPhone, email) VALUES ('${firstName}', '${lastName}', '${address}', '${homePhone}', '${cellPhone}', '${email}') returning *`
        // `INSERT INTO Customers (firstName, lastName, address, homePhone, cellPhone, email) VALUES ('joe', 'jacobi', 'test', '1234567890', '1234567890', 'test@test.com')`
      )
      .then((customer) => {
        res.send(customer.rows);
      });
  }
);

// Require the Routes API
// Create a Server and run it on the port 3000
const server = app.listen(3001, function () {
  let host = server.address().address;
  let port = server.address().port;
  // Starting the Server at the port 3000
});
