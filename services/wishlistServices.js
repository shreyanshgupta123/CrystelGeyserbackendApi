const { Pool } = require('pg');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs"); 

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
const createWishlist = async (request, response) => {
    try {
        const {
            productid
        } = request.body;

        const existingProduct = await pool.query(
            'SELECT * FROM wishlist WHERE product_id = $1',
            [productid]
        );

        if (existingProduct.rows.length > 0) {
            return response.status(400).json({ error: 'Product already exists in the wishlist' });
        }

        

        const insertQuery = await pool.query(
            'INSERT INTO wishlist ( product_id) VALUES ($1)',
            [ productid]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getWishlist = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM wishlist');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No items' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteWishlist = async (request, response) => {
    try {
        const { order_id } = request.params;

        const existingProduct = await pool.query(
            'SELECT * FROM wishlist WHERE id = $1',
            [order_id]
        );

        if (existingProduct.rows.length === 0) {
            return response.status(404).json({ error: 'Order not found ' });
        }

        

        response.status(200).json({ message: 'item deleted successfully' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createWishlist,
    getWishlist,
    deleteWishlist
};