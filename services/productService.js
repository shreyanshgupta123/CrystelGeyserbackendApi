const { Pool } = require('pg');
const config = require('../config/config');

const pool = new Pool({
    host: config.db.host,
    user: config.db.user,
    port: config.db.port,
    password: config.db.password,
    database: config.db.name,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});

const getAllProducts = async () => {
    try {
        const productsQuery = await pool.query('SELECT * FROM products');
        return productsQuery.rows;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

const getAllProductReviews = async () => {
    try {
        const reviewsQuery = await pool.query('SELECT * FROM product_reviews');
        return reviewsQuery.rows;
    } catch (error) {
        console.error('Error fetching product reviews:', error);
        throw error;
    }
};

module.exports = {
    getAllProducts,
    getAllProductReviews
    
};
