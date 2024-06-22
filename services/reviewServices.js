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
const addReviews= async (request, response) => {
    try {
        const {
            customer,
            rating,
            comments,
            user_id,
            product_id,
            title,
            image_url
        } = request.body;

       

        

        const insertQuery = await pool.query(
            'INSERT INTO reviews_of_products (customer,rating,comments,user_id,product_id,title,image_url) VALUES ($1, $2,$3,$4,$5,$6,$7)',
            [ customer,rating,comments,user_id,product_id,title,image_url]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getReviews = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM reviews_of_products');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No subscriptions' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getReviewById = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;

        const existingOrder = await pool.query(
            'SELECT * FROM reviews_of_products WHERE id = $1',
            [invoiceId]
        );

        if (existingOrder.rows.length === 0) {
            return response.status(404).json({ error: 'subscription not found' });
        }

        response.status(200).json(existingOrder.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const updateReviews = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;
        const {
            customer,
            rating,
            comments,
            user_id,
            product_id
        } = request.body;

        const existingProduct = await pool.query(
            'SELECT * FROM reviews_of_products WHERE id = $1',
            [invoiceId]
        );

        if (existingProduct.rows.length === 0) {
            return response.status(404).json({ error: 'review not found' });
        }

        const updateQuery = `
            UPDATE reviews_of_products
            SET customer = $1, rating = $2,comments =$3,user_id=$4,product_id=$5
            WHERE id = $6
        `;

        const values = [
            customer !== undefined ? customer : existingProduct.rows[0].customer,
            rating !== undefined ? rating : existingProduct.rows[0].rating,
            comments !== undefined ? comments : existingProduct.rows[0].comments,
            user_id !== undefined ? user_id : existingProduct.rows[0].user_id,
            product_id !== undefined ? product_id : existingProduct.rows[0].product_id,
            invoiceId
        ];


        await pool.query(updateQuery, values);

        response.status(200).json({ message: 'review updated successfully' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteReview = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM reviews_of_products WHERE id = $1',
            [invoiceId]
        );

       

        response.status(200).send('review deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    addReviews,
    getReviews,
    getReviewById,
    updateReviews,
    deleteReview
};