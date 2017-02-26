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
