import { Country, Abbrevation, Language, Currency, Timezone, CallingCode } from './connectors';
import sequelize from 'sequelize';


const resolvers = {
  Query: {
    country(root, args) {
      return Country.find({ where: args });
    },
    countries(root, args) {
      let where = {};
      let include = [];

      if(args.id != undefined){
        where.id = args.id;
      }

      if(args.name != undefined){
        where.name = args.name;
      }

      if(args.capital != undefined){
        where.capital = args.capital;
      }

      if ( args.language != undefined){
        include.push({
            model: Language,
            where: { shortCode: args.language},
        });
      }

      if ( args.currencies != undefined){
        include.push({
            model: Currency,
            where: { shortCode: args.currencies},
        });
      }

      if ( args.currencies != undefined){
        include.push({
            model: Currency,
            where: { shortCode: args.currencies},
        });
      }

      if ( args.timezones != undefined){
        include.push({
            model: Timezone,
            where: { shortCode: args.timezones},
        });
      }

      if ( args.callingCodes != undefined){
        include.push({
            model: CallingCode,
            where: { code: args.callingCodes},
        });
      }

      if ( args.abbrevations != undefined){
        include.push({
          model: Abbrevation,
          where: sequelize.or(
              {alpha3Code: args.abbrevations},
              {alpha2Code: args.abbrevations}
            )
        });
      }

      return Country.findAll({
        include: include,
        where: where
      });
    }
  },
  Country: {
    abbrevations(country) {
      return country.getAbbrevation();
    },
    languages( country ){
      return country.getLanguages().then( (result) => {
        var names = result.map(function(item) {
          return item.shortCode;
        });
        return names;
      });
    },
    currencies( country ) {
      return country.getCurrencies().then( (result) => {
        var names = result.map(function(item) {
          return item.shortCode;
        });
        return names;
      });
    },
    timezones( country ) {
      return country.getTimezones().then( (result) => {
        var names = result.map(function(item) {
          return item.shortCode;
        });
        return names;
      });
    },
    callingCodes( country ) {
      return country.getCallingCodes().then( (result) => {
        var names = result.map(function(item) {
          return item.code;
        });
        return names;
      });
    },
  },
  Viewer: {
    countries(country, args, ctx) {
      return Country.find({id: country.id})
    },
  },
  CountryConnection: {
    cursor() {
      return "...";
    },
    edges(container, args, ctx) {
      return container;
    }
  },
  CountryEdge: {
    node(edges, args, ctx) {
      return edges;
    }
  }
};

export default resolvers;
