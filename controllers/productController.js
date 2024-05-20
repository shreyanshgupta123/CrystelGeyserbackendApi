const productService = require('../services/productService');

exports.getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
