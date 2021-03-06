import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import schema from './graphql/rootSchema';
import mutation from './graphql/rootMutation';
import db from './database/connectors';
import path from 'path';

process.env.NODE_ENV = 'development';
const PORT = 4000;
const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: schema,
  mutation: mutation,
  context: {
    db: db,
  },
})).use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => console.log(
  `Server is now running on http://localhost:${PORT}`
));
