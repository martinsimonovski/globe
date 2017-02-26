import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const Abbrevation = new GraphQLObjectType({
  name: 'Abbrevation',
  fields: () => ({
    alpha2Code:{
      type: GraphQLString,
    },
    alpha3Code:{
      type: GraphQLString,
    }
  })
})
