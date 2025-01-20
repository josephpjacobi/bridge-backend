import 'dotenv/config';
export const dbConfig = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
};
//# sourceMappingURL=config.js.map