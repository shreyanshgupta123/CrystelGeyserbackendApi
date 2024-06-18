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
const addCountry = async (request, response) => {
    try {
        const {
            country
        } = request.body;

        const insertQuery = await pool.query(
            'INSERT INTO countries (country) VALUES ($1)',
            [city]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getCountries = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM countries');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No countries' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getCountriesById = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;

        const existingOrder = await pool.query(
            'SELECT * FROM countries WHERE id = $1',
            [invoiceId]
        );

        if (existingOrder.rows.length === 0) {
            return response.status(404).json({ error: 'country not found' });
        }

        response.status(200).json(existingOrder.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteCountries = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM countries WHERE id = $1',
            [invoiceId]
        );

       

        response.status(200).send('country deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    addCountry,
    getCountries,
    getCountriesById,
    deleteCountries
};