export async function getCountries(db, { first, last, before, after, orderField, order}) {
  const query =  db.models.country;
  let options = cursorOptions({}, before, after);
  options = orderOptions(options, orderField, order);

  return await applyPagination(
    query, options, first, last
  );
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
}

function cursorOptions(options, before, after){
  if (before || after){
    options.where = {
      id: {}
    };
    if(before){
      options.where.id.$lt = before;
    }

    if(after){
      options.where.id.$gt = after;
    }
  }

  return options;
}

function orderOptions(options, orderField, orderDirection){
  if(typeof orderField !== 'undefined' && orderField){
    options.order = orderField;
  } else {
    options.order = 'id';
  }

  if(typeof orderDirection !== 'undefined' && orderDirection == -1){
    options.order = options.order + ' DESC';
  } else {
    options.order = options.order + ' ASC';
  }
  return options;
}
