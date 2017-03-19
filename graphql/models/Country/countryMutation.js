import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { updateInput } from './countrySchema';

export default {
  updateCountry: {
    type: GraphQLBoolean,
    description: 'Update the continent of a country',
    args: {
      input: {
        type: new GraphQLNonNull(updateInput),
        description: 'The input contains the id || name and continentId'
      }
    },
    resolve(parent, args, {db}) {
      if ( args.input.id != undefined){
        return db.models.country.update({
            continentId: args.input.continentId
          }, { where: {
              id: args.input.id
            }
        });
      } else if ( args.input.name != undefined) {
        return db.models.country.update({
            continentId: args.input.continentId
          }, { where: {
              name: args.input.name
            }
        });
      } else {
        return false;
      }
    }
  }
}
