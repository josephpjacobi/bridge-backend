var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from 'node:fs';
import csvParser from 'csv-parser';
import { pool } from './src/db';
// Tried to create a factory function for creating marinas
// ====================================
// The path to write the csv file to
// const output = './data/output.csv';
// // Create a stream to write to the csv file
// const stream = fs.createWriteStream(output);
// // Functions for creating data
// const createMarina = () => ({
//   name: 'Bridge Marina',
//   address: '40 Ludlam Ave',
//   city: 'Bayville',
//   state: 'NY',
//   zipCode: '11709',
// });
// // Help functions
// /**
//  *   helper function to create a single string that includes each value seperated by a comma and end the the string with a line break
//  */
// const convertDataToCsvEntry = (data: Marina) =>
//   `${Object.values(data).join()}\n`;
// const writeToCsvFile = async () => {
//   const marinaData = createMarina();
//   stream.write(convertDataToCsvEntry(marinaData), 'utf-8');
//   stream.end();
// };
// ====================================
const rows = [];
fs.createReadStream('./data/marinas.csv')
    .pipe(csvParser())
    .on('data', (row) => {
    rows.push(row);
})
    .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO marinas (name, address, city, state, zip_code) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    pool.connect((err, client, done) => {
        if (err)
            throw err;
        if (client === undefined) {
            return console.error('Unable to connect to client');
        }
        try {
            // loop over the lines stored in the csv file
            // rows.forEach(async (row) => {
            // const rowValues = Object.values(row);
            // For each line we run the insert query with the row providing the column values
            client.query('INSERT INTO marinas (name, address, city, state, zip_code) VALUES ("test", "test", "test", "test", "test") RETURNING *;', (err, res) => {
                if (err) {
                    console.log(err.stack);
                }
                else {
                    // console.log('inserted ' + res.rowCount + ' row:', row);
                }
            });
            // });
        }
        finally {
            done();
        }
    });
}));
//# sourceMappingURL=seed.js.map