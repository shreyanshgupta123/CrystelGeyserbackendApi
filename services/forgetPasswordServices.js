const { Pool } = require('pg');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto')

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
        const userQuery = 'SELECT id, email FROM user_details WHERE email = $1';
        const userResult = await pool.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return response.status(404).json({ message: 'User not found' });
        }

        const user = userResult.rows[0];
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

       
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: `Click on the following link to reset your password: http://crystelgeser/reset-password?token=${token}`
        };
        await transporter.sendMail(mailOptions);
        

        response.status(200).json({ message: 'Password reset email sent',token: token});
    } catch (error) {
        console.error('Error handling forgot-password request', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

};
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token and new password are required' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        console.log(decoded);

        const hashPassword = (password) => {
            return crypto.createHash('sha256').update(password).digest('hex');
        };

        const hashedPassword = hashPassword(newPassword);

        const updateQuery = 'UPDATE user_details SET password = $1 WHERE id = $2';
        await pool.query(updateQuery, [hashedPassword, decoded.userId]);

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(400).json({ error: 'Invalid or expired token' });
    }
};



module.exports = {
    forgetpassword,
    resetPassword
};
// require('dotenv').config();
// const { Pool } = require('pg');
// const config = require('../config/config');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const bcrypt = require('bcrypt');
// const FormData = require('form-data');

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
//         const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Create the email content
//         const emailText = `Click on the following link to reset your password: http://yourdomain.com/reset-password?token=${token}`;

//         // Use form-data to create the multipart/form-data payload
//         const form = new FormData();
//         form.append('from', 'goutham <gogoutham123@outlook.com>'); // Your verified sender email
//         form.append('to', email);
//         form.append('subject', 'Password Reset');
//         form.append('text', emailText);

//         // Send email using Infobip
//         try {
//             const infobipResponse = await axios.post('https://mm53dj.api.infobip.com/email/3/send', form, {
//                 headers: {
//                     ...form.getHeaders(),
//                     'Authorization': `App ${process.env.INFOBIP_API_KEY}`,
//                 },
//             });

//             // Log the response from Infobip
//             console.log('Infobip response status:', infobipResponse.status);
//             console.log('Infobip response data:', infobipResponse.data);

//             // Check the status of each message
//             infobipResponse.data.messages.forEach(message => {
//                 console.log('Message to:', message.to);
//                 console.log('Message ID:', message.messageId);
//                 console.log('Message status:', message.status);

//                 // Log detailed message status
//                 console.log('Message status group ID:', message.status.groupId);
//                 console.log('Message status group name:', message.status.groupName);
//                 console.log('Message status ID:', message.status.id);
//                 console.log('Message status name:', message.status.name);
//                 console.log('Message status description:', message.status.description);
//             });

//             response.status(200).json({ message: 'Password reset email sent', status: infobipResponse.data.messages[0].status });
//         } catch (infobipError) {
//             // Log the Infobip error response
//             if (infobipError.response) {
//                 console.error('Infobip error response status:', infobipError.response.status);
//                 console.error('Infobip error response data:', infobipError.response.data);
//             } else {
//                 console.error('Error sending request to Infobip:', infobipError.message);
//             }
//             response.status(500).json({ error: 'Error sending email via Infobip' });
//         }
//     } catch (error) {
//         console.error('Error handling forgot-password request', error);
//         response.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = {
//     forgetpassword,
// };
