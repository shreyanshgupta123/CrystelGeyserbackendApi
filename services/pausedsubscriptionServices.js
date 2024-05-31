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
            subscription_id
        } = request.body;

        // Insert into paused_subscription
        const insertQuery = `
            INSERT INTO paused_subscription (from_date, expired_date, user_id, subscription_id)
            VALUES ($1, $2, $3, $4)
        `;

        await pool.query(insertQuery, [
            from_date,
            expired_date,
            user_id,
            subscription_id
        ]);

        // Retrieve the total paused days for the given subscription_id
        const selectQuery = `
            SELECT  paused_days
            FROM paused_subscription
            WHERE subscription_id = $1
        `;

        const selectResult = await pool.query(selectQuery, [subscription_id]);
        const pausedDays = selectResult.rows.length > 0 ? selectResult.rows[0].paused_days : 0;

        // Update expired_date in details_of_subscription
        const updateQuery = `
            UPDATE details_of_subscription
            SET new_expired_date = new_expired_date + INTERVAL '${pausedDays} days'

            WHERE id = $1
        `;

        await pool.query(updateQuery, [subscription_id]);

        response.status(200).json({ message: 'Subscription created successfully' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createPausedSubscription
};