const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    middleName: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    gender: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING },
    phone2: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    birthDate: { type: DataTypes.DATE },
    image: { type: DataTypes.STRING },
    isLoggedIn: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { timestamps: true });

module.exports = User;
