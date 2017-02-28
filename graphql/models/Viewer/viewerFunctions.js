import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import { Cursor, CriteriaType } from './../../types';

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
    },
    search: {
      type: new GraphQLList(GraphQLString)
    },
    criteria: {
      type: CriteriaType
    }
  }
}
