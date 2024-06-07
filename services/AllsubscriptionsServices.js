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
const createSubscription = async (request, response) => {
    try {
        const {
            user_id,
            active_subscription_id,
            cancelled_subscription_id,
            paused_subscription_id
        } = request.body;

       

        const insertQuery = await pool.query(
            'INSERT INTO subscription_table (  active_subscription_id,user_id,cancelled_subscription_id,paused_subscription_id) VALUES ($1,$2,$3,$4)',
            [ active_subscription_id,user_id,cancelled_subscription_id,paused_subscription_id]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getAllSubscription = async (request, response) => {
    try {
        const subscriptionItems = await pool.query('SELECT * FROM subscription_table');

        if (subscriptionItems.rows.length === 0) {
            return response.status(404).json({ error: 'No subscriptions' });
        }

        response.status(200).json(subscriptionItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    createSubscription,
    getAllSubscription

};