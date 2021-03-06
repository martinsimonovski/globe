import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import resolvers from './resolvers';

const schemaString = `
  type Country {
    id: Int!
    name: String
    capital: String
    abbrevations: Abbrevation
    languages: [String]
    currencies: [String]
    timezones: [String]
    callingCodes: [String]
  }

  type Abbrevation {
    id: Int!
    country: Country
    alpha2Code: String
    alpha3Code: String
  }
  
  type Query {
    countries(
      id: [Int],
      name: [String],
      capital: [String],
      language: [String],
      currencies: [String],
      abbrevations: [String],
      timezones: [String],
      callingCodes: [String]
    ): [Country]
    country(id: Int, name: String): Country
  }
`;


const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers
});

export default schema;
