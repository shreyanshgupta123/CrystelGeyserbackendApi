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
            productid,
            userid
        } = request.body;

        const existingProduct = await pool.query(
            'SELECT * FROM products_wishlist WHERE product_id = $1 AND user_id=$2',
            [productid,userid]
        );

        if (existingProduct.rows.length > 0) {
            return response.status(400).json({ error: 'Product already exists in the wishlist' });
        }

        

        const insertQuery = await pool.query(
            'INSERT INTO products_wishlist ( product_id,user_id) VALUES ($1,$2)',
            [ productid,userid]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
// const getWishlist = async (request, response) => {
    
//     try {
//         const cartItems = await pool.query('SELECT * FROM products_wishlist');

//         if (cartItems.rows.length === 0) {
//             return response.status(404).json({ error: 'No items' });
//         }

//         response.status(200).json(cartItems.rows);
//     } catch (error) {
//         console.error('Error executing query', error);
//         response.status(500).json({ error: 'Internal Server Error' });
//     }
// };
const getWishlist = async (request, response) => {
    try {
        const token = request.headers['authorization'];
        if (!token) {
            return response.status(401).json({ error: 'Access denied, no token provided' });
        }

        // Verify the token
        try {
            const decoded = jwt.verify(token, "KG3BHEdzNMrVSA3vNVo4bxUvoXyYQ9Rt");

            // Proceed with querying the database
            const cartItems = await pool.query('SELECT * FROM products_wishlist');

            if (cartItems.rows.length === 0) {
                return response.status(404).json({ error: 'No items' });
            }

            response.status(200).json(cartItems.rows);
        } catch (error) {
            return response.status(400).json({ error: 'Invalid token' });
        }
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteWishlist = async (request, response) => {
    try {
        const orderId = request.params.order_id;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM products_wishlist WHERE id = $1',
            [orderId]
        );

       

        response.status(200).send('item deleted successfully');
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