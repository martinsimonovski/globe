import { GraphQLInt } from 'graphql';
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
    }
  };
}
