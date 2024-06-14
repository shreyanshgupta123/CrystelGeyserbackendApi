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
const addReturnJarRequest = async (request, response) => {
    try {
        const {
            number_of_cans,
            full_name,
            mobile_number,
            address,
            pincode,
            city,
            state,
            building_number,
            road_name,
            locality,
            alternate_mobile_number,
            landmark,
            user_id
        } = request.body;

        const insertQuery = await pool.query(
            'INSERT INTO return_jar_request (number_of_cans,full_name ,mobile_number,address,pincode,city,state,building_number,road_name,locality,alternate_mobile_number,landmark,user_id) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',
            [number_of_cans,full_name, mobile_number, address,pincode,city,state,building_number,road_name,locality,alternate_mobile_number,landmark,user_id]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getReturnJarRequest = async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM return_jar_request');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No requests' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const getReturnJarRequestById = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;

        const existingOrder = await pool.query(
            'SELECT * FROM return_jar_request WHERE id = $1',
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
const updateReturnJarRequests = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;
        const {
            number_of_cans,
            full_name,
            mobile_number,
            address,
            pincode,
            city,
            state,
            building_number,
            road_name,
            locality,
            alternate_mobile_number,
            landmark,
            user_id
        } = request.body;

        const existingProduct = await pool.query(
            'SELECT * FROM return_jar_request WHERE id = $1',
            [invoiceId]
        );

        if (existingProduct.rows.length === 0) {
            return response.status(404).json({ error: 'review not found' });
        }

        const updateQuery = `
            UPDATE return_jar_request
            SET number_of_cans = $1, full_name = $2,mobile_number =$3,address=$4,pincode=$5,city=$6,state=$7,building_number=$8,road_name=$9,locality=$10,alternate_mobile_number=$11,landmark=$12,user_id=$13
            WHERE id = $14
        `;

        const values = [
            number_of_cans !== undefined ? number_of_cans : existingProduct.rows[0].number_of_cans,
            full_name !== undefined ? full_name : existingProduct.rows[0].full_name,
            mobile_number !== undefined ? mobile_number : existingProduct.rows[0].mobile_number,
            address !== undefined ? address : existingProduct.rows[0].address,
            pincode !== undefined ? pincode : existingProduct.rows[0].pincode,
            city !== undefined ? city : existingProduct.rows[0].city,
            state !== undefined ? state : existingProduct.rows[0].state,
            building_number !== undefined ? building_number : existingProduct.rows[0].building_number,
            road_name !== undefined ? road_name : existingProduct.rows[0].road_name,
            locality !== undefined ? locality : existingProduct.rows[0].locality,
            alternate_mobile_number !== undefined ? alternate_mobile_number : existingProduct.rows[0].alternate_mobile_number,
            landmark !== undefined ? landmark : existingProduct.rows[0].landmark,
            user_id !== undefined ? user_id : existingProduct.rows[0].user_id,
            invoiceId
        ];


        await pool.query(updateQuery, values);

        response.status(200).json({ message: 'review updated successfully' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteReturnJarRequests = async (request, response) => {
    try {
        const invoiceId = request.params.invoice_id;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM return_jar_request WHERE id = $1',
            [invoiceId]
        );

       

        response.status(200).send('review deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    addReturnJarRequest,
    getReturnJarRequest,
    getReturnJarRequestById,
    updateReturnJarRequests
};