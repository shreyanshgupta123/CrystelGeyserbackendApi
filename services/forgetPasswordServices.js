// const { Pool } = require('pg');
// const config = require('../config/config');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const bcrypt = require('bcrypt');

// const pool = new Pool({
//     host: config.db.host,
//     user: config.db.user,
//     port: config.db.port,
//     password: config.db.password,
//     database: config.db.name,
//     ssl: {
//         require: true,
//         rejectUnauthorized: false
//     }
// });
// const forgetpassword = async (request, response) => {
//     const { email } = request.body;

//     try {
//         // Check if the user exists in the database
//         const userQuery = 'SELECT id, email FROM user_details WHERE email = $1';
//         const userResult = await pool.query(userQuery, [email]);

//         if (userResult.rows.length === 0) {
//             return response.status(404).json({ message: 'User not found' });
//         }

//         const user = userResult.rows[0];
//         const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

       
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: user.email,
//             subject: 'Password Reset',
//             text: `Click on the following link to reset your password: http://yourdomain.com/reset-password?token=${token}`
//         };
//         await transporter.sendMail(mailOptions);

//         response.status(200).json({ message: 'Password reset email sent' });
//     } catch (error) {
//         console.error('Error handling forgot-password request', error);
//         response.status(500).json({ error: 'Internal Server Error' });
//     }

// };
// module.exports = {
//     forgetpassword,
    
// };
require('dotenv').config();
const { Pool } = require('pg');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require('bcrypt');

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

const forgetpassword = async (request, response) => {
    const { email } = request.body;

    try {
        // Check if the user exists in the database
        const userQuery = 'SELECT id, email FROM user_details WHERE email = $1';
        const userResult = await pool.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return response.status(404).json({ message: 'User not found' });
        }

        const user = userResult.rows[0];
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send email using Infobip
        const emailBody = {
            "from": {
                "from": process.env.EMAIL_USER
            },
            "to": [{
                "email": user.email
            }],
            "subject": "Password Reset",
            "text": `Click on the following link to reset your password: http://yourdomain.com/reset-password?token=${token}`
        };

        const headers = {
            'Authorization': `App ${process.env.INFOBIP_API_KEY}`,
            'Content-Type': 'application/json'
        };

        const response = await axios.post('https://api.infobip.com/email/3/send', emailBody, { headers });

        response.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error handling forgot-password request', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    forgetpassword,
};
