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
const addRefferal= async (request, response) => {
    try {
        const {
            phonenumber,
            user_id,
        } = request.body;

       
        const insertQuery = await pool.query(
            'INSERT INTO refferal_table (phonenumber,user_id) VALUES ($1, $2)',
            [ phonenumber,user_id]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getRefferal = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM refferal_table');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No refferal' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getRefferalById = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;

        const existingOrder = await pool.query(
            'SELECT * FROM refferal_table WHERE id = $1',
            [invoiceId]
        );

        if (existingOrder.rows.length === 0) {
            return response.status(404).json({ error: 'refferal not found' });
        }

        response.status(200).json(existingOrder.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteRefferal = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM refferal_table WHERE id = $1',
            [invoiceId]
        );

       

        response.status(200).send('refferal deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    addRefferal,
    getRefferal,
    getRefferalById,
    deleteRefferal
};
