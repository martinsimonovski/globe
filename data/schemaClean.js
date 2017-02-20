import { graphql,
         GraphQLSchema,
         GraphQLObjectType,
         GraphQLInt,
         GraphQLID,
         GraphQLString,
         GraphQLList,
         GraphQLNonNull,
         GraphQLBoolean } from 'graphql';

const Continent = new GraphQLObjectType({
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

/*
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
*/
const PageInfo = new GraphQLObjectType({
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

const ContinentConnection = new GraphQLObjectType({
  name: 'ContinentConnection',
  fields: () => ({
    edges: {
      type: new GraphQLList(ContinentEdge),
      resolve(parent) {
        return parent.query.then((result) => result);
      },
    },
    pageInfo: {
      type: new GraphQLNonNull(PageInfo),
    },
  }),
});

const ContinentEdge = new GraphQLObjectType({
  name: 'ContinentEdge',
  fields: () => ({
    cursor: {
      type: GraphQLString,
    },
    node: {
      type: Continent,
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
    allContinents: {
      type: ContinentConnection,
      resolve(parent, args, {db} ){
        return {
          query: db.all(`
            SELECT * FROM Continent
          `)
        };
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

export default Schema;
