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
// const getAllUsers = async () => {
//     try {
//         const usersQuery = await pool.query('SELECT * FROM products');
//         return usersQuery.rows;
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         throw error;
//     }
// };


const getUserDetails = async (request, response) => {
    try {
        const usersQuery = await pool.query('SELECT * FROM user_details');
        const addressQuery = await pool.query('SELECT * FROM user_address_');

        const users = usersQuery.rows.map(user => {
            const addresses = addressQuery.rows.filter(address => address.user_id === user.id);
            return {
                ...user,
                address: addresses
            };
        });

        response.status(200).json(users);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getUserDetails
};

