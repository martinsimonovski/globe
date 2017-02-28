import { ABBREVATION, LANGUAGE, TIMEZONE, CURRENCY, CALLINGCODE } from './../../../utils/constants';

export async function getCountries(db, { first, last, before, after, orderField, order,
          id, name, capital, search, criteria}) {
  const query =  db.models.country;

  let options = whereOptions({}, {id, name});
  options = searchOptions({}, db, {search, criteria})
  options = cursorOptions(options, before, after);
  options = orderOptions(options, query, orderField, order);

  return await applyPagination(
    query, options, first, last
  );
}

function whereOptions(options, args){
  options.where = {};

  if(args.id != undefined){
      options.where.id = args.id;
  }

  if(args.name != undefined){
    options.where.name = args.name;
  }

  if(args.capital != undefined){
    where.capital = args.capital;
  }

  return options;
}

function searchOptions(options, db, args){
  let include = [];

  if ( args.search == undefined)
    return options;

  if (args.criteria == undefined)
    return options;

  if (args.criteria == LANGUAGE || args.criteria == CURRENCY || args.criteria == TIMEZONE){
    include.push({
        model: db.models[args.criteria],
        where: { shortCode: args.search},
    });
  } else if ( args.criteria == CALLINGCODE ) {
    include.push({
        model: db.models.callingCode,
        where: { code: args.search},
    });
  } else if ( args.criteria == ABBREVATION ) {
    include.push({
        model: db.models.abbrevation,
        where: {
          $or:[
              {alpha3Code: args.search},
              {alpha2Code: args.search}
            ]
        }
      });
  }

  options.include = include;

  return options;
}

function cursorOptions(options, before, after){
  if (before || after){

    options.where.id = {};
    if(before){
      options.where.id.$lt = before;
    }

    if(after){
      options.where.id.$gt = after;
    }
  }

  return options;
}

function orderOptions(options, query, orderField, orderDirection){
  let order = [];

  if(typeof orderField !== 'undefined' && orderField){
    order.push(orderField);
  } else {
    order.push('id');
  }

  if(typeof orderDirection !== 'undefined' && orderDirection == -1){
    order.push('DESC');
  } else {
    order.push('ASC');
  }

  options.order = [order];
  return options;
}

async function applyPagination(query, options, first, last) {
  let count;

  if ( first || last ) {
    count = await query.findAndCountAll().then((result) => {
      return result.count;
    });

    let limit = 0;
    let skip = 0;

    if (first && count > first) {
      limit = first;
    }

    if (last) {
      if (limit && limit > last) {
        skip = limit - last;
        limit = limit - skip;
      } else if (!limit && count > last) {
        skip = count - last;
        limit = count - skip;
      }
    }

    // offset can't be used without limit > 0
    options.offset = skip;
    options.limit = limit;
  }

  await query.findAndCountAll(options).then((result) => {
    query = result.rows;
  });

  return {
    query: query,
    pageInfo: {
      hasNextPage: Boolean(first && count > first),
      hasPreviousPage: Boolean(last && count > last),
    }
  }
}
