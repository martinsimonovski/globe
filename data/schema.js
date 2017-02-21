import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import resolvers from './resolvers';
import schemaString from './schema.graphql';

const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers
});

export default schema;
