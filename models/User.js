const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios'
});

module.exports = { User };
