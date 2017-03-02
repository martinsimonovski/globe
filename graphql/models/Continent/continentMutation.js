import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { createInput, deleteInput } from './continentSchema';

export default {
    createContinent: {
        type: GraphQLBoolean,
        description: 'Create new continent based on name and code',
        args: {
            input: {
                type: new GraphQLNonNull(createInput),
                description: 'The new input including an name, code'
            }
        },
        resolve(parent, args, {db}) {
            return db.models.continent.create({
                name: args.input.name,
                code: args.input.code
            });
        }
    },
    deleteContinent: {
      type: GraphQLBoolean,
      description: 'Delete continent based on id',
      args: {
        input: {
          type: new GraphQLNonNull(deleteInput),
          description: 'The input includes the id'
        }
      },
      resolve(parent, args, {db}){
        return db.models.continent.destroy({
          where: args.input
        });
      }
    },
}
