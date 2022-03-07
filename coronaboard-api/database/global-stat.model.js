const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define(
    'GlobalStat',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      cc: {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      confirmed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      death: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      released: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tested: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      testing: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      negative: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'GlobalStat',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'ccWithDate',
          unique: true,
          fields: [{ name: 'cc' }, { name: 'date' }],
        },
      ],
    },
  );
};
