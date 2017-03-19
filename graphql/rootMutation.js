import { GraphQLObjectType } from 'graphql';
import continent from './models/Continent/continentMutation';
import country from './models/Country/countryMutation';

const rootFields = Object.assign({},
    continent,
    country
);

export default new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => rootFields
});
