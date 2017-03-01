import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { ContinentInput } from './continentSchema';

export default {
    createContinent: {
        type: GraphQLBoolean,
        description: 'Create new continent based on name and code',
        args: {
            input: {
                type: new GraphQLNonNull(ContinentInput),
                description: 'The new input including an name, code'
            }
        },
        resolve(parent, args, {db}) {
            return db.models.continent.create({
                name: args.input.name,
                code: args.input.code
            });
        }
    }
}