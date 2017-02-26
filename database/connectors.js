import Sequilize from 'sequelize';

const db = new Sequilize('globe', null, null, {
  dialect: 'sqlite',
  storage: './database/globe.sqlite',
});

const CountryModel = db.define('country', {
  name: { type: Sequilize.STRING },
  capital: { type: Sequilize.STRING },
});

const AbbrevationModel = db.define('abbrevation', {
  alpha3Code: { type: Sequilize.STRING },
  alpha2Code: { type: Sequilize.STRING },
});

CountryModel.hasOne(AbbrevationModel);
AbbrevationModel.belongsTo(CountryModel);

const CurrencyModel = db.define('currency', {
  shortCode: { type: Sequilize.STRING },
});

CountryModel.hasMany(CurrencyModel);
CurrencyModel.belongsTo(CountryModel);

const TimezoneModel = db.define('timezone', {
  shortCode: { type: Sequilize.STRING },
});

CountryModel.hasMany(TimezoneModel);
TimezoneModel.belongsTo(CountryModel);

const LanguageModel = db.define('language', {
  shortCode: { type: Sequilize.STRING },
});

CountryModel.hasMany(LanguageModel);
LanguageModel.belongsTo(CountryModel);

const CallingCodeModel = db.define('callingCode', {
  code: { type: Sequilize.STRING },
});

CountryModel.hasMany(CallingCodeModel);
CallingCodeModel.belongsTo(CountryModel);

export default db;
