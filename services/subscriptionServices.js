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
const createSubscription = async (request, response) => {
    try {
        const {
            user_id,
            subscription_price,
            purchased_date,
            expired_date,
            subscription_type
        } = request.body;

      
        const purchasedDateParts = purchased_date.split('-');
        const expiredDateParts = expired_date.split('-');

        const purchasedDate = new Date(`${purchasedDateParts[2]}-${purchasedDateParts[1]}-${purchasedDateParts[0]}`);
        const expiredDate = new Date(`${expiredDateParts[2]}-${expiredDateParts[1]}-${expiredDateParts[0]}`);

       
        const validThroughDays = Math.floor((expiredDate - purchasedDate) / (1000 * 60 * 60 * 24));

        
        const validThroughInterval = `${validThroughDays} days`;

        const insertQuery = `
            INSERT INTO subscription (user_id, subscription_price, purchased_date, expired_date, valid_through, subscription_type)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;

        await pool.query(insertQuery, [
            user_id,
            subscription_price,
            purchasedDate.toISOString().split('T')[0], 
            expiredDate.toISOString().split('T')[0], 
            validThroughInterval,
            subscription_type
        ]);

        response.status(200).json({ message: 'Subscription created successfully' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getSubscription = async (request, response) => {
    try {
        const subscriptionItems = await pool.query('SELECT * FROM subscription');

        if (subscriptionItems.rows.length === 0) {
            return response.status(404).json({ error: 'No subscriptions' });
        }

        response.status(200).json(subscriptionItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteSubscription = async (request, response) => {
    try {
        const subscriptionId = request.params.subscription_id;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM subscription WHERE id = $1',
            [subscriptionId]
        );

       

        response.status(200).send('subscription deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    createSubscription,
    getSubscription,
    deleteSubscription
};