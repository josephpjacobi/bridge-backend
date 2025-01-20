import 'dotenv/config';
// Connection string (or pg.Pool) for PostGraphile to use
export const database = process.env.DATABASE_URL || 'postgraphile';
// Database schemas to use
export const schemas = ['public'];
export const postgraphileOptions = {
    subscriptions: true,
    watchPg: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    showErrorStack: 'json',
    extendedErrors: ['hint', 'detail', 'errcode'],
    // appendPlugins: [require('@graphile-contrib/pg-simplify-inflector')],
    exportGqlSchemaPath: 'schema.graphql',
    graphiql: true,
    enhanceGraphiql: true,
    // allowExplain(req) {
    //   // TODO: customise condition!
    //   return true;
    // },
    enableQueryBatching: true,
    legacyRelations: 'omit',
    // pgSettings(req) {
    //   /* TODO */
    // },
};
//# sourceMappingURL=common.js.map