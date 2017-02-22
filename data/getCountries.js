export async function getCountries(db, { first, last }) {
  const query = db.models.country;

  return await applyPagination(
    query, first, last
  );
}

async function applyPagination(query, first, last) {
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
