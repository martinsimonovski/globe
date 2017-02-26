import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLScalarType
} from 'graphql';
import { toCursor, fromCursor } from './extra/cursorFunctions';
import { Kind } from 'graphql/language';

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
});

export const Cursor = new GraphQLScalarType({
  name: 'Cursor',
  serialize(value) {
    if (value.value) {
      return toCursor(value);
    } else {
      return null;
    }
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING ) {
      return fromCursor(ast.value);
    } else {
      return null;
    }
  },
  parseValue(value) {
    return fromCursor(value);
  },
});
