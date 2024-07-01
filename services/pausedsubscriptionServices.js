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
const createPausedSubscription = async (request, response) => {
    try {
        const {
            from_date,
            expired_date,
            user_id,
            subscription_id,
            is_paused
        } = request.body;

        
        const insertQuery = `
            INSERT INTO paused_subscriptions (from_date, expired_date, user_id, subscription_id,is_paused)
            VALUES ($1, $2, $3, $4,$5) RETURNING id
        `;

        const value=await pool.query(insertQuery, [
            from_date,
            expired_date,
            user_id,
            subscription_id,
            is_paused
        ]);

       
        const selectQuery = `
            SELECT  paused_days
            FROM paused_subscriptions
            WHERE subscription_id = $1
        `;

        const selectResult = await pool.query(selectQuery, [subscription_id]);
        const pausedDays = selectResult.rows.length > 0 ? selectResult.rows[0].paused_days : 0;

        
        const updateQuery = `
            UPDATE active_subscription
            SET new_expired_date = new_expired_date + INTERVAL '${pausedDays} days'

            WHERE id = $1
        `;
        await pool.query(updateQuery, [subscription_id]);
        
        const newSubscriptionId = value.rows[0].id;

        response.status(200).json({ message: 'Success', id: newSubscriptionId });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getPausedSubscription = async (request, response) => {
    try {
        const subscriptionItems = await pool.query('SELECT * FROM paused_subscriptions');

        if (subscriptionItems.rows.length === 0) {
            return response.status(404).json({ error: 'No subscriptions' });
        }

        response.status(200).json(subscriptionItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getPausedSubscriptionById = async (request, response) => {
    try {
        const subscriptionId = request.params.subscription_id;

        const existingOrder = await pool.query(
            'SELECT * FROM paused_subscriptions WHERE id = $1',
            [subscriptionId]
        );
        const subscriptionCheck = await pool.query(
            'SELECT id FROM subscription_table WHERE paused_subscription_id = $1',
            [subscriptionId]
        );

        if (existingOrder.rows.length === 0) {
            return response.status(404).json({ error: 'Order not found' });
        }
        await pool.query(
            'UPDATE paused_subscriptions SET subscription_id = $1 WHERE id = $2',
            [subscriptionCheck.rows[0].id, subscriptionId]
        );

        response.status(200).json(existingOrder.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deletePausedSubscription = async (request, response) => {
    try {
        const subscriptionId = request.params.subscription_id;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM paused_subscriptions WHERE id = $1',
            [subscriptionId]
        );

       

        response.status(200).send('subscription deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createPausedSubscription,
    getPausedSubscription,
    getPausedSubscriptionById,
    deletePausedSubscription
};