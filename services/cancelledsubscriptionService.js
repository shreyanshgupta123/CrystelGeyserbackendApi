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
const createCancelledSubscription = async (request, response) => {
    try {
        const {
            price,
            user_id,
            purchased_date,
            reason
        } = request.body;

        const parsedPurchasedDate = new Date(purchased_date);
        if (isNaN(parsedPurchasedDate)) {
            return response.status(400).json({ error: 'Invalid purchasedDate format' });
        }

        // let nextMonthDate = new Date(parsedPurchasedDate); 

       
        // if (suscription_type === "9909ce77-02fe-49a5-840f-dad31e903a56") {
        //     nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
        // } else if (suscription_type === "7264f7c3-73b2-41c1-b0bc-83c28e19e97f") {
        //     nextMonthDate.setMonth(nextMonthDate.getMonth() + 6);
        // } else if (suscription_type === "e3f1d7db-fe68-4b82-8d02-6d7b9cd7f26d") {
        //     nextMonthDate.setMonth(nextMonthDate.getMonth() + 9);
        // } else if (suscription_type === "df8acba7-11bb-494d-b238-815c63ed4d33") {
        //     nextMonthDate.setMonth(nextMonthDate.getMonth() + 12);
        // } else {
        //     return response.status(400).json({ error: 'Invalid subscription_type' });
        // }

        // const expiredDate = nextMonthDate;
        // const validThroughDays = Math.floor((expiredDate - parsedPurchasedDate) / (1000 * 60 * 60 * 24));

        const cancelledDate = new Date();

        const insertQuery = await pool.query(
            'INSERT INTO canncelled_subscription ( price,user_id,purchased_date,cancelled_date,reason) VALUES ($1,$2,$3,$4,$5) RETURNING id',
            [ price,user_id,purchased_date,cancelledDate,reason]
        );

        const newSubscriptionId = insertQuery.rows[0].id;

        response.status(200).json({ message: 'Success', id: newSubscriptionId });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getCancelledSubscription = async (request, response) => {
    try {
        const subscriptionItems = await pool.query('SELECT * FROM canncelled_subscription');

        if (subscriptionItems.rows.length === 0) {
            return response.status(404).json({ error: 'No subscriptions' });
        }

        response.status(200).json(subscriptionItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getCancelledSubscriptionById = async (request, response) => {
    try {
        const subscriptionId = request.params.subscription_id;

        const existingOrder = await pool.query(
            'SELECT * FROM canncelled_subscription WHERE id = $1',
            [subscriptionId]
        );
        const subscriptionCheck = await pool.query(
            'SELECT id FROM subscription_table WHERE paused_subscription_id = $1',
            [orderId]
        );
        await pool.query(
            'UPDATE cancelled_subscription SET subscription_id = $1 WHERE id = $2',
            [subscriptionCheck.rows[0].id, subscriptionId]
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
    createCancelledSubscription,
getCancelledSubscription,
getCancelledSubscriptionById
};