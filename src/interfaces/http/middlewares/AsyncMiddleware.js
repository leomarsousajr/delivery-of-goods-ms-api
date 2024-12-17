module.exports =
  () =>
  (fn) =>
  (...params) => {
    const ctx = params[0];
    return fn(...params).catch(ctx.next);
  };
