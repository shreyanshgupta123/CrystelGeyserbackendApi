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
// const createSubscription = async (request, response) => {
//     try {
//         const {
//             user_id,
//             subscription_price,
//             purchased_date,
//             expired_date,
//             subscription_type
//         } = request.body;

      
//         const purchasedDateParts = purchased_date.split('-');
//         const expiredDateParts = expired_date.split('-');

//         const purchasedDate = new Date(`${purchasedDateParts[2]}-${purchasedDateParts[1]}-${purchasedDateParts[0]}`);
//         const expiredDate = new Date(`${expiredDateParts[2]}-${expiredDateParts[1]}-${expiredDateParts[0]}`);

       
//         const validThroughDays = Math.floor((expiredDate - purchasedDate) / (1000 * 60 * 60 * 24));

        
//         const validThroughInterval = `${validThroughDays} days`;

//         const insertQuery = `
//             INSERT INTO subscription (user_id, subscription_price, purchased_date, expired_date, valid_through, subscription_type)
//             VALUES ($1, $2, $3, $4, $5, $6)
//         `;

//         await pool.query(insertQuery, [
//             user_id,
//             subscription_price,
//             purchasedDate.toISOString().split('T')[0], 
//             expiredDate.toISOString().split('T')[0], 
//             validThroughInterval,
//             subscription_type
//         ]);

//         response.status(200).json({ message: 'Subscription created successfully' });
//     } catch (error) {
//         console.error('Error executing query', error);
//         response.status(500).json({ error: 'Internal Server Error' });
//     }
// };
const createSubscription = async (request, response) => {
    try {
        const {
            user_id,
            price,
            subscription_type,
            subscription_category
        } = request.body;

        let nextMonthDate = new Date(); 

        if (subscription_type === "9909ce77-02fe-49a5-840f-dad31e903a56") {
            nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
        } else if (subscription_type === "7264f7c3-73b2-41c1-b0bc-83c28e19e97f") {
            nextMonthDate.setMonth(nextMonthDate.getMonth() + 6);
        } else if (subscription_type === "e3f1d7db-fe68-4b82-8d02-6d7b9cd7f26d") {
            nextMonthDate.setMonth(nextMonthDate.getMonth() + 9);
        } else if (subscription_type === "df8acba7-11bb-494d-b238-815c63ed4d33") {
            nextMonthDate.setMonth(nextMonthDate.getMonth() + 12);
        }

        const currentDate = new Date();
        const purchasedDate = currentDate; 
        const expiredDate = nextMonthDate; 

        const validThroughDays = Math.floor((expiredDate - purchasedDate) / (1000 * 60 * 60 * 24));
        const validThroughInterval = `${validThroughDays} days`;

        const insertQuery = `
            INSERT INTO subscription_details (user_id, price, purchased_date, expired_date, subscription_type,subscription_category)
            VALUES ($1, $2, $3, $4, $5,$6)
        `;

        await pool.query(insertQuery, [
            user_id,
            price,
            purchasedDate.toISOString().split('T')[0],
            expiredDate.toISOString().split('T')[0],
            subscription_type,
            subscription_category
        ]);
        const token = jwt.sign({ userId: user_id }, 'your_secret_key', { expiresIn: `${validThroughDays}d` });

        response.status(200).json({ message: 'Subscription created successfully',token:token });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSubscription = async (request, response) => {
    try {
        const subscriptionItems = await pool.query('SELECT * FROM subscription_details');

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
            'DELETE FROM subscription_details WHERE id = $1',
            [subscriptionId]
        );

       

        response.status(200).send('subscription deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getSubscriptionById = async (request, response) => {
    try {
        const subscriptionId = request.params.subscription_id;

        const existingOrder = await pool.query(
            'SELECT * FROM subscription_details WHERE id = $1',
            [subscriptionId]
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
    createSubscription,
    getSubscription,
    deleteSubscription,
    getSubscriptionById
};
