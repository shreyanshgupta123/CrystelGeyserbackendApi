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
const addAlternateAddress = async (request, response) => {
    try {
        const {
            user_id,
            country,
            states,
            city,
            street,
            landmark,
            housenumber,
            pincode,
            phone,
            phone2,
            name
        } = request.body;

        const insertQuery = await pool.query(
            'INSERT INTO alternate_address (user_id ,country,states,city,street,landmark,housenumber,pincode,phone,phone2,name) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
            [user_id, country, states,city,street,landmark,housenumber,pincode,phone,phone2,name]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getAlternateAddress = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM alternate_address');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No addresses' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteAlternateAddress = async (request, response) => {
    try {
        const addressId = request.params.address_id;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM alternate_address WHERE id = $1',
            [addressId]
        );

       

        response.status(200).send('item deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const updateUserAddressDetails = async (request, response) => {
    try {
        const addressId = request.params.address_id;
        const {
            country,
            states,
            city,
            street,
            landmark,
            housenumber,
            pincode,
            phone,
            phone2,
            name
        } = request.body;
        
        const updateAddressQuery = await pool.query(
            'UPDATE alternate_address SET country = $1, states = $2, city = $3, street = $4, landmark = $5, housenumber = $6, pincode = $7 ,phone  =$8 ,phone2 =$9,name=$10 WHERE id = $11',
            [country, states, city, street, landmark, housenumber, pincode,phone,phone2,name,addressId]
        );

        response.status(200).send('User address updated successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getAlternateAddressById = async (request, response) => {
    try {
        const orderId = request.params.address_id;

        const existingOrder = await pool.query(
            'SELECT * FROM alternate_address WHERE id = $1',
            [orderId]
        );

        if (existingOrder.rows.length === 0) {
            return response.status(404).json({ error: 'address not found' });
        }

        response.status(200).json(existingOrder.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addAlternateAddress,
    getAlternateAddress,
    deleteAlternateAddress,
    updateUserAddressDetails,
    getAlternateAddressById
};