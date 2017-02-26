/*
needs revork
*/
import fs from 'fs';
import sequelize from 'sequelize';
import { Country, Abbrevation, Currency, Timezone, Language, CallingCode, db } from './data/connectors';
const countries = JSON.parse(fs.readFileSync('data/countries.json'));

db.sync({ force: true }).then(() => {
  countries.forEach(function(element) {
    return Country.create({
      name: element.name,
      capital: element.capital,
    }).then( (country) => {
      country.createAbbrevation({
          alpha3Code: element.abbrevation.alpha3Code,
          alpha2Code: element.abbrevation.alpha2Code,
      });

      element.currencies.forEach(function(currency) {
        country.createCurrency({
          shortCode: currency
        });
      });

      element.timezones.forEach(function(timezone) {
        country.createTimezone({
          shortCode: timezone
        });
      });

      element.languages.forEach(function(language) {
        country.createLanguage({
          shortCode: language
        });
      });

      element.callingCodes.forEach(function(callingCode) {
        country.createCallingCode({
          code: callingCode
        });
      });

      return country;
    });
  });
});
