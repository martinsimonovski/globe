import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { Country } from './countrySchema';

export default {
  country: {
    type: Country,
    args: {
      id: {
        type: GraphQLInt,
        description: 'The ID of the country'
      },
      name: {
        type: GraphQLString,
        description: 'The Name of the country, must be correct and is case insensitive'
      },
      capital: {
        type: GraphQLString,
        description: 'The Capital of the country, must be correct and is case insensitive'
      }
    },
    resolve (parent, args, {db}) {
      return db.models.country.find({ where: args });
    },
  }
}
