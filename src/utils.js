const _ = require("lodash");

// Paging mapping
const paging = (_page = 0, limit = 20) => {
  const page = _page - 1;
  const offset = (page > 0 ? page : 0) * limit;
  return { offset, limit };
};

// Sort mapping
const ordering = (_sort = {}) => {
  const { asc = "", desc = "" } = _sort;
  const ascSort = asc
    .split(",")
    .map(field => (field.trim() ? `${field.trim()}` : ""));
  const descSort = desc
    .split(",")
    .map(field => (field.trim() ? `-${field.trim()}` : ""));
  return [...ascSort, ...descSort].join(" ");
};

module.exports = { paging, ordering };
