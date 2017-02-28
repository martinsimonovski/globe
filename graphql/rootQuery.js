import { GraphQLObjectType } from 'graphql';
import viewer from './models/Viewer/viewerQuery';
import country from './models/Country/countryQuery';

const rootFields = Object.assign({},
  viewer,
  country
);

export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => rootFields
});
