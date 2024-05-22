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
const addToCart = async (request, response) => {
    try {
        const {
            quantity,
            discount,
            delivery_charges,
            refundable_deposit,
            productid
        } = request.body;

        const existingProduct = await pool.query(
            'SELECT * FROM cart WHERE productid = $1',
            [productid]
        );

        if (existingProduct.rows.length > 0) {
            return response.status(400).json({ error: 'Product already exists in the cart' });
        }

        const priceResult = await pool.query(
            'SELECT price FROM products WHERE id = $1',
            [productid]
        );

        if (priceResult.rows.length === 0) {
            return response.status(404).json({ error: 'Product not found' });
        }

        const { price } = priceResult.rows[0];

        const insertQuery = await pool.query(
            'INSERT INTO cart (quantity, discount, delivery_charges, refundable_deposit, productid, product_price) VALUES ($1, $2, $3, $4, $5, $6)',
            [quantity, discount, delivery_charges, refundable_deposit, productid, price]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getCartItems = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM cart');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No items in the cart' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const updateCartItems = async (request, response) => {
    try {
        const { order_id } = request.params;
        const {
            quantity,
            discount,
            delivery_charges,
            refundable_deposit,
        } = request.body;

        const existingProduct = await pool.query(
            'SELECT * FROM cart WHERE order_id = $1',
            [order_id]
        );

        if (existingProduct.rows.length === 0) {
            return response.status(404).json({ error: 'Order not found in the cart' });
        }

        const updateQuery = `
            UPDATE cart
            SET quantity = $1,
                discount = $2,
                delivery_charges = $3,
                refundable_deposit = $4
            WHERE order_id = $5
        `;

        const values = [
            quantity !== undefined ? quantity : existingProduct.rows[0].quantity,
            discount !== undefined ? discount : existingProduct.rows[0].discount,
            delivery_charges !== undefined ? delivery_charges : existingProduct.rows[0].delivery_charges,
            refundable_deposit !== undefined ? refundable_deposit : existingProduct.rows[0].refundable_deposit,
            order_id
        ];

        console.log('Executing query with values:', values);

        await pool.query(updateQuery, values);

        response.status(200).json({ message: 'Order updated successfully in the cart' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteCartItems = async (request, response) => {
    try {
        const { order_id } = request.params;

        const existingProduct = await pool.query(
            'SELECT * FROM cart WHERE order_id = $1',
            [order_id]
        );

        if (existingProduct.rows.length === 0) {
            return response.status(404).json({ error: 'Order not found in the cart' });
        }

        const deleteQuery = 'DELETE FROM cart WHERE order_id = $1';

        await pool.query(deleteQuery, [order_id]);

        response.status(200).json({ message: 'Order deleted successfully from the cart' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    addToCart,
    getCartItems,
    updateCartItems,
    deleteCartItems
};