const Product = require('../models/productModel');

const getAllProducts = async () => {
    return await Product.findAll();
};

// Additional service methods

module.exports = { getAllProducts };
