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
const addSubscriptionsOfUsers= async (request, response) => {
    try {
        const {
            user_id,
            subscription_id
        } = request.body;

       

        

        const insertQuery = await pool.query(
            'INSERT INTO invoice_subscriptions (user_id,subscription_id) VALUES ($1, $2)',
            [ user_id,subscription_id]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getSubscriptionsOfUsers = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM invoice_subscriptions');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No subscriptions' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getSubscriptionsOfUsersById = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;

        const existingOrder = await pool.query(
            'SELECT * FROM invoice_subscriptions WHERE id = $1',
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
const updateSubscriptionsOfUsers = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;
        const {
            user_id,
            subscription_id
        } = request.body;

        const existingProduct = await pool.query(
            'SELECT * FROM invoice_subscriptions WHERE id = $1',
            [invoiceId]
        );

        if (existingProduct.rows.length === 0) {
            return response.status(404).json({ error: 'subscription not found' });
        }

        const updateQuery = `
            UPDATE invoice_subscriptions
            SET user_id = $1, subscription_id = $2
            WHERE id = $3
        `;

        const values = [
            user_id !== undefined ? user_id : existingProduct.rows[0].user_id,
            subscription_id !== undefined ? subscription_id : existingProduct.rows[0].subscription_id,
            invoiceId
        ];


        await pool.query(updateQuery, values);

        response.status(200).json({ message: 'subscription updated successfully' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteSubscriptionsOfUsers = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM invoice_subscriptions WHERE id = $1',
            [invoiceId]
        );

       

        response.status(200).send('subscription deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    addSubscriptionsOfUsers,
    getSubscriptionsOfUsers,
    getSubscriptionsOfUsersById,
    updateSubscriptionsOfUsers,
    deleteSubscriptionsOfUsers
};