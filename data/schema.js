import { GraphQLObjectType,
         GraphQLID,
         GraphQLString,
         GraphQLNonNull,
         GraphQLList,
         GraphQLBoolean,
         GraphQLInt,
         GraphQLSchema } from 'graphql';
import { getCountries } from './getCountries';
import Cursor from '../Cursor';

const Country = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    capital: {
      type: new GraphQLNonNull(GraphQLString)
    },
  }),
});

export const PageInfo = new GraphQLObjectType({
  name: 'PageInfo',
  fields: {
    hasNextPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    hasPreviousPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  },
})

const CountryConnection = new GraphQLObjectType({
  name: 'CountryConnection',
  fields: () => ({
    edges: {
      type: new GraphQLList(CountryEdge),
      resolve(parent) {
        return parent.query;
      },
    },
    pageInfo: {
      type: new GraphQLNonNull(PageInfo),
      resolve(parent){
        return parent.pageInfo;
      }
    },
  }),
});

const CountryEdge = new GraphQLObjectType({
  name: 'CountryEdge',
  fields: () => ({
    cursor: {
      type: Cursor,
      resolve(parent) {
        return {
            value: parent.id.toString(),
        };
      },
    },
    node: {
      type: Country,
      resolve(parent) {
        return parent;
      }
    },
  }),
});

const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    allCountries: {
      type: CountryConnection,
      args: createConnectionArguments(),
      resolve(parent, args, { db }) {
        return getCountries(db, args);
      },
    },
  }),
});

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      viewer: {
        type: Viewer,
        resolve() {
          return {
            id: 'VIEWER_ID',
          };
        },
      },
    },
  }),
});

export function createConnectionArguments() {
  return {
    first: {
      type: GraphQLInt,
    },
    last: {
      type: GraphQLInt,
    },
    before: {
      type: Cursor,
    },
    after: {
      type: Cursor,
    }
  };
}

export default Schema;
