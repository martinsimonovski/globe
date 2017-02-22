import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import schema from './data/schema';
import db from './data/connectors';

const PORT = 8080;
const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: schema,
  context: {
    db: db,
  },
})).use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => console.log(
  `Server is now running on http://localhost:${PORT}`
));
