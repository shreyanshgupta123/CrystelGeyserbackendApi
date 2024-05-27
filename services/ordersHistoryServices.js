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
const addOrdersHistory = async (request, response) => {
    try {
        const {
            user_id,
          product_id,
           type_of_order
        } = request.body;

       

        

        const insertQuery = await pool.query(
            'INSERT INTO orders_history ( user_id,product_id, type_of_order) VALUES ($1, $2, $3)',
            [  user_id, product_id, type_of_order]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getOrdersHistory = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM orders_history');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No orders' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const deleteOrdersHistory = async (request, response) => {
    try {
        const { order_id } = request.params;

        const existingProduct = await pool.query(
            'SELECT * FROM orders_history WHERE id = $1',
            [order_id]
        );

        if (existingProduct.rows.length === 0) {
            return response.status(404).json({ error: 'Order not found ' });
        }

        const deleteQuery = 'DELETE FROM orders_history WHERE id = $1';

        await pool.query(deleteQuery, [order_id]);

        response.status(200).json({ message: 'Order deleted successfully ' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addOrdersHistory,
    getOrdersHistory,
    deleteOrdersHistory
};