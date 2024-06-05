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
const addInvoice= async (request, response) => {
    try {
        const {
            total_amount,
            is_subscribed,
            is_payment_done,
            subscription_id,
            alternate_address_id
        } = request.body;

       

        

        const insertQuery = await pool.query(
            'INSERT INTO invoice_table ( total_amount,is_subscribed,is_payment_done,subscription_id,alternate_address_id) VALUES ($1, $2, $3,$4,$5)',
            [  total_amount, is_subscribed, is_payment_done,subscription_id,alternate_address_id]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
module.exports = {
    addInvoice,
    
};