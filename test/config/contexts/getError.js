class NoErrorThrownError extends Error {}

const getError = async (fn) => {
  try {
    await fn();

    throw new NoErrorThrownError();
  } catch (error) {
    return error;
  }
};

module.exports = { getError, NoErrorThrownError };
