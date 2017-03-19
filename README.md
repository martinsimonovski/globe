# globe

GraphQL server with countries in the whole world.
This is for learning and testing purposes.

## Examples ##

### Simple Query ###

```
query{
  country(id: 1){
    id
    name
  }
}
```
### Simple Pagination ###

```
query{
  viewer{
    allCountries(first:10, after: "MTA"){
      edges{
        cursor
        node{
          id
          name
        }
      }
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
```
### Simple Mutation ###

```
/* Query: */
mutation($continentId: ID!, $countries: [String]){
  updateCountry(input: {continentId: $continentId, name: $countries})
}

/* Query Variables: */
{
  "continentId": 1,
  countries: ["Algeria", "Angola"]
}
```
