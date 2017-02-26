import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';
import { PageInfo, Cursor } from './../../types';

export const Country = new GraphQLObjectType({
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

export const CountryConnection = new GraphQLObjectType({
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

export const CountryEdge = new GraphQLObjectType({
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
