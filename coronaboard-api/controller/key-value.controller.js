const { KeyValue } = require('../database');
const { wrapWithErrorHandler } = require('../util');

async function get(req, res) {
  const { key } = req.params;
  if (!key) {
    res.status(400).json({ error: 'key is required' });
    return;
  }

  const result = await KeyValue.findOne({
    where: { key },
  });
  res.status(200).json({ result });
}

async function insertOrUpdate(req, res) {
  const { key, value } = req.body;
  if (!key || !value) {
    res.status(400).json({ error: 'key and value are required' });
    return;
  }

  await KeyValue.upsert({ key, value });

  res.status(200).json({ result: 'success' });
}

async function remove(req, res) {
  const { key } = req.params;
  if (!key) {
    res.status(400).json({ error: 'key is required' });
    return;
  }

  await KeyValue.destroy({
    where: { key },
  });

  res.status(200).json({ result: 'success' });
}

module.exports = wrapWithErrorHandler({
  get,
  insertOrUpdate,
  remove,
});
