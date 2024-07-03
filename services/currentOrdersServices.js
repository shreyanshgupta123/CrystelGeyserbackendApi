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
const addCurrentOrders = async (request, response) => {
    try {
        const {
            user_id,
            product_id,
            price,
            unit,
            payment_method
        } = request.body;

        const userResult = await pool.query(
            'SELECT id FROM user_details WHERE id = $1',
            [user_id]
        );
        const productResult = await pool.query(
            'SELECT id FROM products WHERE id = $1',
            [product_id]
        );

        if (userResult.rows.length === 0) {
            return response.status(404).json({ error: 'user not found' });
        }
        if (productResult.rows.length === 0) {
            return response.status(404).json({ error: 'product not found' });
        }

        const userid = userResult.rows[0].id;
        const productid = productResult.rows[0].id;

        const currentDate = new Date();
        const expectedDelivery = new Date(currentDate.setDate(currentDate.getDate() + 4));

        const insertQuery = await pool.query(
            'INSERT INTO current_order_details (user_id, product_id, price, unit, expected_delivery, payment_method) VALUES ($1, $2, $3, $4, $5, $6)',
            [userid, productid, price, unit, expectedDelivery, payment_method]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCurrentOrders = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM current_order_details');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No orders found' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteCurrentOrder = async (request, response) => {
    try {
        const { order_id } = request.params;

        const existingProduct = await pool.query(
            'SELECT * FROM current_order_details WHERE id = $1',
            [order_id]
        );

        if (existingProduct.rows.length === 0) {
            return response.status(404).json({ error: 'Order not found ' });
        }

        const deleteQuery = 'DELETE FROM current_order_details WHERE id = $1';

        await pool.query(deleteQuery, [order_id]);

        response.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getCurrentOrderById = async (request, response) => {
    try {
        const orderId = request.params.order_id;

        const existingOrder = await pool.query(
            'SELECT * FROM current_order_details WHERE id = $1',
            [orderId]
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
    addCurrentOrders,
    getCurrentOrders,
    deleteCurrentOrder,
    getCurrentOrderById
};
