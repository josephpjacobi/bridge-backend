import 'dotenv/config';

// Connection string (or pg.Pool) for PostGraphile to use
export const database: string =
  process.env.DATABASE_URL || 'postgraphile';

// Database schemas to use
export const schemas: string | string[] = ['public'];

export const port: number = Number(process.env.DBPORT) || 5432;

export const devOptions = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  showErrorStack: true,
  extendedErrors: ['hint', 'detail', 'errcode'],
  appendPlugins: [],
  exportGqlSchemaPath: 'schema.graphql',
  graphiql: true,
  enhanceGraphiql: true,
  // allowExplain(req) {
  //   // TODO: customise condition!
  //   return true;
  // },
  enableQueryBatching: true,
  // legacyRelations: 'omit',
  // pgSettings(req) {
  //   /* TODO */
  // },
};
