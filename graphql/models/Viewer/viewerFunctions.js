import { GraphQLInt, GraphQLString } from 'graphql';
import { Cursor } from './../../types';

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
    },
    orderField: {
      type: GraphQLString
    },
    order: {
      type: GraphQLInt
    }
  };
}

export function createCountryConnectionArguments(){
  return {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    }
  }
}
