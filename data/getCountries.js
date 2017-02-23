export async function getCountries(db, { first, last, before, after }) {
  const query =  db.models.country;

  return await applyPagination(
    query, first, last, before, after
  );
}

async function applyPagination(query, first, last, before, after) {
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
    let options = {
      offset: skip,
      limit: limit
    }

    if (before || after){
      options.where = {
        id: {

        }
      };
      if(before){
        options.where.id.$lt = before;
      }

      if(after){
        options.where.id.$gt = after;
      }
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
}
