module.exports = (data) =>
  Object.freeze({
    values: () => Object.values(data),
    keys: () => Object.keys(data),
    key: (value) => Object.fromEntries(Object.entries(data).map((e) => e.reverse()))[value],
    ...data
  });
