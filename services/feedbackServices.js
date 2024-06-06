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
const addFeedback= async (request, response) => {
    try {
        const {
            is_delivered_as_expected,
            is_item_as_described_as_seller,
            comments,
            user_id,
            order_id
        } = request.body;

       

        

        const insertQuery = await pool.query(
            'INSERT INTO feedback_table ( is_delivered_as_expected,is_item_as_described_as_seller,comments,user_id,order_id) VALUES ($1, $2, $3,$4,$5)',
            [  is_delivered_as_expected, is_item_as_described_as_seller, comments,user_id,order_id]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getFeedback = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM feedback_table');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No feedback' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getFeedbackById = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;

        const existingOrder = await pool.query(
            'SELECT * FROM feedback_table WHERE id = $1',
            [invoiceId]
        );

        if (existingOrder.rows.length === 0) {
            return response.status(404).json({ error: 'Order not found' });
        }

        response.status(200).json(existingOrder.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    addFeedback,
    getFeedback,
    getFeedbackById
};