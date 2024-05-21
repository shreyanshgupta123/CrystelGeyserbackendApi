
const pool = require('../config/database'); 

const getAllProducts = async () => {
    const productsQuery = await pool.query('SELECT * FROM products');
    return productsQuery.rows;
};


const getAllProductReviews = async () => {
    const reviewsQuery = await pool.query('SELECT * FROM product_reviews');
    return reviewsQuery.rows;
};

module.exports = {
    getAllProducts,
    getAllProductReviews
};
