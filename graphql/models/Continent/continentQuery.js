import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { Continent } from './continentSchema';

export default {
    continent: {
        type: Continent,
        args: {
            id: {
                type: GraphQLInt,
                description: 'The ID of the country'
            },
            name: {
                type: GraphQLString,
                description: 'The Name of the Continent, must be correct and is case insensitive'
            },
            code: {
                type: GraphQLString,
                description: 'The Code of the Continent, must be correct and is case insensitive'
            }
        },
        resolve (parent, args, {db}) {
            return db.models.continent.find({ where: args });
        },
    }
}
