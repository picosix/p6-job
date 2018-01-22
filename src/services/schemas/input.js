module.exports = `
  input FindBetween {
    gte: String
    lte: String,
    gt: String
    lt: String
  }

  input FindSort {
    asc: String,
    desc: String
  }
`;
