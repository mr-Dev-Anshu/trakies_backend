// utils/pagination.js
export const paginate = async (
  model,
  { pipeline = null, query = {}, defaultLimit = 10 } = {}
) => {
  try {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || defaultLimit;
    const skip = (page - 1) * limit;

    const cleanQuery = { ...query };
    delete cleanQuery.page;
    delete cleanQuery.limit;

    let results, totalItems;

    if (pipeline) {
      const paginatedPipeline = [...pipeline, { $skip: skip }, { $limit: limit }];
      results = await model.aggregate(paginatedPipeline);
      const countPipeline = [...pipeline, { $count: "total" }];
      const countResult = await model.aggregate(countPipeline);
      totalItems = countResult.length > 0 ? countResult[0].total : 0;
    } else {
      results = await model
        .find(cleanQuery)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
      totalItems = await model.countDocuments(cleanQuery);
    }
    const totalPages = Math.ceil(totalItems / limit);
    return {
      results,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        limit,
      },
    };
  } catch (error) {
    throw new Error(`Pagination error: ${error.message}`);
  }
};