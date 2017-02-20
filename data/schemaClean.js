import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import sqlite from 'sqlite3';
import { promisify } from 'bluebird';

sqlite.verbose();
const db = new sqlite.Database('data/globe.sqlite3');

db.get = promisify(db.get);
db.all = promisify(db.all);

const ContinentType = new GraphQLObjectType({
  name: 'Continent',
  description: '...',

  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',

  fields: () => ({
    continent: {
      type: new GraphQLList(ContinentType),
      args: {
        id: {type: GraphQLInt }
      },
      resolve: (root, args) => {
        return db.all(`
          SELECT * FROM Continent
        `);
      }
    }
  })
});

export default new GraphQLSchema({
  query: QueryType
});
