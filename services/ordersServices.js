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
const addOrders = async (request, response) => {
    try {
        const {
            cancelled_order_id,
            user_id,
           delivered_order_id,
           current_order_id
        } = request.body;

       

        

        const insertQuery = await pool.query(
            'INSERT INTO my_order ( cancelled_order_id,user_id, delivered_order_id, current_order_id) VALUES ($1, $2, $3, $4)',
            [  cancelled_order_id,user_id, delivered_order_id, current_order_id]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getOrders = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM my_order');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No orders' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const deleteOrders = async (request, response) => {
    try {
        const { order_id } = request.params;

        const existingProduct = await pool.query(
            'SELECT * FROM my_order WHERE id = $1',
            [order_id]
        );

        if (existingProduct.rows.length === 0) {
            return response.status(404).json({ error: 'Order not found ' });
        }

        const deleteQuery = 'DELETE FROM my_order WHERE id = $1';

        await pool.query(deleteQuery, [order_id]);

        response.status(200).json({ message: 'Order deleted successfully ' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addOrders,
    getOrders,
    deleteOrders
};