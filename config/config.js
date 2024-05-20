require('dotenv').config();

const config = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    port: process.env.PORT || 3400
};

module.exports = config;
