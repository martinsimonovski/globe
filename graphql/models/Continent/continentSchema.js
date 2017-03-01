import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLList
} from 'graphql';
import { Country } from './../Country/countrySchema';

export const Continent = new GraphQLObjectType({
    name: 'Continent',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        code: {
            type: new GraphQLNonNull(GraphQLString)
        },
        // countries: {
        //     type: new GraphQLList(Country),
        //     resolve (parent) {
        //         return parent.getCountries();
        //     }
        // }
    })

});