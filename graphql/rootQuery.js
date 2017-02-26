import { GraphQLObjectType } from 'graphql';
import viewer from './models/Viewer/viewerQuery';

const rootFields = Object.assign({},
  viewer
);

export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => rootFields
});
