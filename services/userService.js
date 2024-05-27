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
const createUserDetails = async (request, response) => {
    try {
        const {
            firstName,
            lastName,
            middleName,
            age,
            gender,
            email,
            phone,
            phone2,
            username,
            password,
            birthDate,
            image,
            isLoggedIn,
            country,
            states,
            city,
            street,
            landmark,
            houseNumber,
            pinCode
        } = request.body;

       
        const existingUsername = await pool.query(
            'SELECT * FROM user_details WHERE username = $1',
            [username]
        );
        const existingEmail = await pool.query(
            'SELECT * FROM user_details WHERE email = $1',
            [email]
        );
        const existingPhone = await pool.query(
            'SELECT * FROM user_details WHERE phone = $1',
            [phone]
        );

        if (existingUsername.rows.length > 0 ) {
            return response.status(400).json({ error: 'Username already exists' });
        }

       
        

        if (existingEmail.rows.length > 0) {
            return response.status(400).json({ error: 'Email already exists' });
        }

        
      

        if (existingPhone.rows.length > 0) {
            return response.status(400).json({ error: 'Phone already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);
        const dateOnly = new Date(birthDate).toISOString().split('T')[0];
        console.log(dateOnly)
        const usersQuery = await pool.query(
            `INSERT INTO user_details 
            (first_name, middle_name, last_name, age, gender, email, phone, phone2, username, password, birth_date, image, isLoggedIn) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
            [firstName, middleName, lastName, age, gender, email, phone, phone2, username, hashedPassword, dateOnly, image, isLoggedIn]
        );

        const userId = usersQuery.rows[0].id;

        const addressQuery = await pool.query(
            `INSERT INTO user_address_ 
            (user_id, country, states, city, street, landmark, housenumber, pincode) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [userId, country, states, city, street, landmark, houseNumber, pinCode]
        );

        // const token = jwt.sign({ userId }, 'your_secret_key', { expiresIn: '7d' });

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUserDetails = async (request, response) => {
    try {
        const userId = request.params.userId;
        const {
            firstName,
            lastName,
            middleName,
            age,
            gender,
            email,
            phone,
            phone2,
            username,
            password,
            birthDate,
            image,
            isLoggedIn,
            country,
            states,
            city,
            street,
            landmark,
            houseNumber,
            pinCode
        } = request.body;
        const formattedBirthDate = new Date(birthDate).toISOString().slice(0, 10);
        const updateUserQuery = await pool.query(
            'UPDATE user_details SET first_name = $1, middle_name = $2, last_name = $3, age = $4, gender = $5, email = $6, phone = $7, phone2 = $8, username = $9, password = $10, birth_date = $11, image = $12, isLoggedIn = $13 WHERE id = $14',
            [firstName, middleName, lastName, age, gender, email, phone, phone2, username, password, formattedBirthDate, image, isLoggedIn, userId]
        );

        const updateAddressQuery = await pool.query(
            'UPDATE user_address_ SET country = $1, states = $2, city = $3, street = $4, landmark = $5, housenumber = $6, pincode = $7 WHERE user_id = $8',
            [country, states, city, street, landmark, houseNumber, pinCode, userId]
        );

        response.status(200).send('User details updated successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteUserDetails = async (request, response) => {
    try {
        const userId = request.params.userId;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM user_address_ WHERE user_id = $1',
            [userId]
        );

        const deleteUserQuery = await pool.query(
            'DELETE FROM user_details WHERE id = $1',
            [userId]
        );

        response.status(200).send('User details deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getUserDetailsById = async (request, response) => {
    try {
        const userId = request.params.userId;
        const usersQuery = await pool.query('SELECT * FROM user_details');
        const addressQuery = await pool.query('SELECT * FROM user_address_');

        const users = usersQuery.rows.map(user => {
            const addresses = addressQuery.rows.filter(address => address.user_id === user.id);
            return {
                ...user,
                // birthdate: user.birthdate.toISOString().split('T')[0],
                address: addresses
            };
        });
        const result=users.find(user=>user.id === userId)
    

        response.status(200).json(result);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getUserDetailsByName = async (request, response) => {
    try {
        const { username, password } = request.body; 

        
        let userResult = await pool.query('SELECT * FROM user_details WHERE username = $1', [username]);

       
        if (userResult.rows.length === 0) {
            userResult = await pool.query('SELECT * FROM user_details WHERE email = $1', [username]);
        }

        
        if (userResult.rows.length === 0) {
            return response.status(400).json({ error: 'User not found' });
        }

        const user = userResult.rows[0];
        const hashedPassword = user.password;

        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (isMatch) {
            const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '7d' });
            return response.status(200).json({ message: 'Success', token ,userId: user.id});
        } else {
            return response.status(400).json({ error: 'Invalid credentials' });
        }

    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};





module.exports = {
    getUserDetails,
    createUserDetails,
    updateUserDetails,
    deleteUserDetails,
    getUserDetailsById,
    getUserDetailsByName
};

