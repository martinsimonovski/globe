import { GraphQLObjectType } from 'graphql';
import continent from './models/Continent/continentMutation';

const rootFields = Object.assign({},
    continent
);

export default new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => rootFields
});