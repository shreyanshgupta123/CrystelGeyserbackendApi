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
const addNews = async (request, response) => {
    try {
        const {
            publisher_name,
            published_date,
            title,
            description
        } = request.body;

        const insertQuery = await pool.query(
            'INSERT INTO news_table (publisher_name,published_date,title,description) VALUES ($1,$2,$3,$4)',
            [publisher_name,published_date,title,description]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getNews = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM news_table');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No news' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getNewsById = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;

        const existingOrder = await pool.query(
            'SELECT * FROM news_table WHERE id = $1',
            [invoiceId]
        );

        if (existingOrder.rows.length === 0) {
            return response.status(404).json({ error: 'news not found' });
        }

        response.status(200).json(existingOrder.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteNews = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM news_table WHERE id = $1',
            [invoiceId]
        );

       

        response.status(200).send('news deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    addNews,
    getNews,
    getNewsById,
    deleteNews
};