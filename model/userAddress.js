const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

const UserAddress = sequelize.define('UserAddress', {
    country: { type: DataTypes.STRING, allowNull: false },
    states: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    street: { type: DataTypes.STRING },
    landmark: { type: DataTypes.STRING },
    houseNumber: { type: DataTypes.STRING },
    pinCode: { type: DataTypes.STRING }
}, { timestamps: true });

UserAddress.belongsTo(User, { foreignKey: 'userId' });

module.exports = UserAddress;
