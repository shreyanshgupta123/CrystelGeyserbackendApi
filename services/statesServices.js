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
const addState = async (request, response) => {
    try {
        const {
            states
        } = request.body;

        const insertQuery = await pool.query(
            'INSERT INTO States_table (states) VALUES ($1)',
            [states]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getState = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM States_table');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No state' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getStatesById = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;

        const existingOrder = await pool.query(
            'SELECT * FROM States_table WHERE id = $1',
            [invoiceId]
        );

        if (existingOrder.rows.length === 0) {
            return response.status(404).json({ error: 'request not found' });
        }

        response.status(200).json(existingOrder.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteStates = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM States_table WHERE id = $1',
            [invoiceId]
        );

       

        response.status(200).send('review deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    addState,
    getState,
    getStatesById,
    deleteStates
};