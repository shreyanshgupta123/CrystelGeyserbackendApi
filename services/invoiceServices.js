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
const addInvoice= async (request, response) => {
    try {
        const {
            total_amount,
            is_subscribed,
            is_payment_done,
            subscription_id,
            alternate_address_id
        } = request.body;

       

        

        const insertQuery = await pool.query(
            'INSERT INTO invoice_table ( total_amount,is_subscribed,is_payment_done,subscription_id,alternate_address_id) VALUES ($1, $2, $3,$4,$5)',
            [  total_amount, is_subscribed, is_payment_done,subscription_id,alternate_address_id]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getInvoice = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM invoice_table');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No orders' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getInvoiceById = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;

        const existingOrder = await pool.query(
            'SELECT * FROM invoice_table WHERE id = $1',
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
    addInvoice,
    getInvoice,
    getInvoiceById
};