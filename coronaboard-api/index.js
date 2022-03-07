const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./database');

const globalStatController = require('./controller/global-stat.controller');
const keyValueController = require('./controller/key-value.controller');

async function launchServer() {
  const app = express();

  // Content-Type이 application/json인 HTTP요청의 body를 파싱할 수 있게 해줍니다.
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.json({ message: 'Hello CoronaBoard!' });
  });

  app.get('/global-stats', globalStatController.getAll);
  app.post('/global-stats', globalStatController.insertOrUpdate);
  app.delete('/global-stats', globalStatController.remove);

  app.get('/key-value/:key', keyValueController.get);
  app.post('/key-value', keyValueController.insertOrUpdate);
  app.delete('/key-value/:key', keyValueController.remove);

  try {
    await sequelize.sync();
    // only for dev
    // sequelize.sync({ force: true });
    console.log('Database is ready!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error);
    process.exit(1);
  }

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
}

launchServer();
