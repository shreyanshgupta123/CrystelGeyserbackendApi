const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING },
    stock: { type: DataTypes.INTEGER },
    imageUrl: { type: DataTypes.STRING }
}, { timestamps: true });

module.exports = Product;
