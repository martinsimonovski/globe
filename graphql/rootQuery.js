import { GraphQLObjectType } from 'graphql';
import viewer from './models/Viewer/viewerQuery';
import country from './models/Country/countryQuery';
import continent from './models/Continent/continentQuery';

const rootFields = Object.assign({},
  viewer,
  country,
  continent
);

export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => rootFields
});
