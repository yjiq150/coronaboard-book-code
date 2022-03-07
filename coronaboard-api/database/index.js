const Sequelize = require('sequelize');

const config = {
  host: process.env.CORONABOARD_MYSQL_HOST || '127.0.0.1',
  port: 3306,
  database: 'coronaboard',
  user: 'coronaboard_admin',
  password: process.env.CORONABOARD_MYSQL_PASSWORD || 'yourpassword',
};

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
});

module.exports = {
  sequelize,
  GlobalStat: require('./global-stat.model')(sequelize),
  KeyValue: require('./key-value.model')(sequelize),
};
