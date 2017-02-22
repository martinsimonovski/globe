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
    let skip = 0;;

    if (first && count > first) {
      limit = first;
    }

    if (last) {
      if (limit && limit > last) {
        skip = limit - last;
        limit = limit - skip;
      } else if (!limit && count > last) {
        skip = count - last;
      }
    }

    // if (skip)
    //   query.skip(skip);

    // if (limit)
    //   query.limit(limit);
    await query.findAndCountAll({offset: skip, limit: limit}).then((result) => {
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
