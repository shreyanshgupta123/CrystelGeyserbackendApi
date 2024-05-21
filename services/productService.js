const pool = require('../config/database');

const getAllProducts = async () => {
    try {
        const productsQuery = await pool.query('SELECT * FROM products');
        return productsQuery.rows;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Rethrow the error to be handled in the controller or higher level
    }
};

const getAllProductReviews = async () => {
    try {
        const reviewsQuery = await pool.query('SELECT * FROM product_reviews');
        return reviewsQuery.rows;
    } catch (error) {
        console.error('Error fetching product reviews:', error);
        throw error; // Rethrow the error to be handled in the controller or higher level
    }
};

module.exports = {
    getAllProducts,
    getAllProductReviews
};
