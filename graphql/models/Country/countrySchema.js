import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql';
import { PageInfo, Cursor } from './../../types';
import { Abbrevation } from './../Abbrevation/AbbrevationSchema';

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
    abbrevations: {
        type: Abbrevation,
        resolve (parent) { //parent is 1 Country of sequelize model
          return parent.getAbbrevation();
        }
    },
    languages: {
      type: new GraphQLList(GraphQLString),
      resolve (parent) { //parent is 1 Country of sequelize model
        return parent.getLanguages().then( (result) => {
          var names = result.map(function(item) {
            return item.shortCode;
          });
          return names;
        });
      }
    },
    currencies: {
      type: new GraphQLList(GraphQLString),
      resolve (parent) { //parent is 1 Country of sequelize model
        return parent.getCurrencies().then( (result) => {
          var names = result.map(function(item) {
            return item.shortCode;
          });
          return names;
        });
      }
    },
    timezones: { //parent is 1 Country of sequelize model
      type: new GraphQLList(GraphQLString),
      resolve (parent) {
        return parent.getTimezones().then( (result) => {
          var names = result.map(function(item) {
            return item.shortCode;
          });
          return names;
        });
      }
    },
    callingCodes: {
      type: new GraphQLList(GraphQLString),
      resolve (parent) { //parent is 1 Country of sequelize model
        return parent.getCallingCodes().then( (result) => {
          var names = result.map(function(item) {
            return item.code;
          });
          return names;
        });
      },
    },
  }),
});

export const CountryConnection = new GraphQLObjectType({
  name: 'CountryConnection',
  fields: () => ({
    edges: {
      type: new GraphQLList(CountryEdge),
      resolve(parent, args) {
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
