exports.getValues = (req, pagesize) => {
  let sort = req.query.sort;
  let paginate = req.query.paginate === "true";
  let p = req.query.p - 1;
  let filters = caseInsensitiveFilters(req.query);
  let operators = getOperators(sort, paginate, p, pagesize);

  return { operators, filters };
};

const caseInsensitiveFilters = (query) => {
  // break each separate query field into its' own $or statement (brand can be "leica" OR "sony" OR "nikon etc"),
  // join the fields with an $and statement (brand "leica" or brand "sony" AND category "compact" or category "rangefinder"),
  // make match for individual vals case insensitive ("NiKoN" will match "Nikon")
  const { sort, paginate, p, ...filters } = query;

  if (Object.keys(filters).length === 0) {
    return {};
  }
  let and = [];
  for (let field in filters) {
    let or = { $or: [] };
    filters[field].forEach((val) => {
      or["$or"].push({ [field]: { $regex: val, $options: `i` } });
    });
    and.push(or);
  }
  return { $and: and };
};

const getOperators = (sort, paginate, p, pagesize) => {
  let operators = [];
  if (sort) {
    let sortObj = {};
    sort[0].split(" ").forEach((s) => {
      s[0] === "-" ? (sortObj[s.substring(1)] = -1) : (sortObj[s] = 1);
    });
    operators.push({ $sort: sortObj });
  }
  operators.push({ $skip: p * pagesize });
  if (paginate) {
    operators.push({ $limit: pagesize });
  }

  return operators;
};
