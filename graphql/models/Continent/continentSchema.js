import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInputObjectType
} from 'graphql';
import { Country } from './../Country/countrySchema';
import { Viewer } from './../Viewer/viewerSchema';

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
        countries: {
            type: new GraphQLList(Country),
            resolve (parent) {
                return parent.getCountries();
            }
        },
        viewer: {
          type: Viewer,
          resolve (parent) {
            return parent;
          }
        }
    })
});

export const createInput = new GraphQLInputObjectType({
    name: 'CreateInput',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        code: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
});

export const deleteInput = new GraphQLInputObjectType({
  name: 'DeleteInput',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  })
})
