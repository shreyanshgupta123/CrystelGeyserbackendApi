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
const getDiscounts = async (request, response) => {
    try {
        const subscriptionItems = await pool.query('SELECT * FROM discount_table');

        if (subscriptionItems.rows.length === 0) {
            return response.status(404).json({ error: 'No discount' });
        }

        response.status(200).json(subscriptionItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const createDiscount = async (request, response) => {
    try {
        const {
           months,
            discount
        } = request.body;

        

        const insertQuery = await pool.query(
            'INSERT INTO discount_table ( months,discount) VALUES ($1,$2)',
            [ months,discount]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const updateDiscount = async (request, response) => {
    try {
        const { order_id } = request.params;
        const { months, discount } = request.body;

        const existingProduct = await pool.query(
            'SELECT * FROM discount_table WHERE id = $1',
            [order_id]
        );

        if (existingProduct.rows.length === 0) {
            return response.status(404).json({ error: 'discount not found in the cart' });
        }

        const updateQuery = `
            UPDATE discount_table
            SET months = $1, discount = $2
            WHERE id = $3
        `;

        const values = [
            months !== undefined ? months : existingProduct.rows[0].months,
            discount,
            order_id
        ];

        console.log('Executing query with values:', values);

        await pool.query(updateQuery, values);

        response.status(200).json({ message: 'discount updated successfully' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deletediscount = async (request, response) => {
    try {
        const discountId = request.params.discount_id;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM discount_table WHERE id = $1',
            [discountId]
        );

       

        response.status(200).send('discount deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getDiscountById = async (request, response) => {
    try {
        const discountId = request.params.discount_id;

        const existingOrder = await pool.query(
            'SELECT * FROM discount_table WHERE id = $1',
            [discountId]
        );

        if (existingOrder.rows.length === 0) {
            return response.status(404).json({ error: 'discount not found' });
        }

        response.status(200).json(existingOrder.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    getDiscounts,
    createDiscount,
    updateDiscount,
    deletediscount,
    getDiscountById
};