const errorHandler = (block) => async (req, res) => {
  try {
    await block(req, res);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

const wrapWithErrorHandler = (obj) => {
  Object.keys(obj).forEach((key) => {
    obj[key] = errorHandler(obj[key]);
  });
  return obj;
};

module.exports = {
  wrapWithErrorHandler,
};
