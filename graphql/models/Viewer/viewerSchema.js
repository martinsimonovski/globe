import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';
import { createConnectionArguments } from './viewerFunctions';
import { CountryConnection } from './../Country/countrySchema';
import { getCountries } from './../Country/getCountries';

export const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    allCountries: {
      type: CountryConnection,
      args: createConnectionArguments(),
      resolve(parent, args, { db }) {
        return getCountries(db, args);
      },
    },
  }),
});
