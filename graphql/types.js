import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLScalarType,
  GraphQLEnumType
} from 'graphql';
import { toCursor, fromCursor } from './extra/cursorFunctions';
import { Kind } from 'graphql/language';
import makeEnumValues from './makeEnumValues';
import { ABBREVATION, LANGUAGE, TIMEZONE, CURRENCY, CALLINGCODE } from './../utils/constants';

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

export const CriteriaType = new GraphQLEnumType({
  name: 'CriteriaType',
  description: 'Search by field',
  values: makeEnumValues([
    ABBREVATION,
    LANGUAGE,
    TIMEZONE,
    CURRENCY,
    CALLINGCODE
  ])
});
