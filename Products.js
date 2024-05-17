require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { Sequelize } = require("sequelize");

const app = express();
const port = process.env.PORT || 3400;

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
    {
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false 
            }
        }
    }
);

sequelize.sync().then(() => { 
    console.log("Database is connected"); 
}).catch((err) => {
    console.error("Unable to connect to the database:", err);
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

testConnection();

app.get('/products', async (request, response) => {
    try {
        const productsQuery = await pool.query('SELECT * FROM products');
        const reviewsQuery = await pool.query('SELECT * FROM product_reviews');
        
        const products = productsQuery.rows.map(product => {
            const reviews = reviewsQuery.rows.filter(review => review.product_id === product.id);
            return {
                ...product,
                reviews: reviews 
            };
        });

        response.status(200).json(products);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/products/:productid', async (request, response) => {
    const productId = request.params.productid;

    try {
        const productQuery = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
        if (productQuery.rows.length === 0) {
            return response.status(404).json({ error: 'Product not found' });
        }

        const reviewsQuery = await pool.query('SELECT * FROM product_reviews WHERE product_id = $1', [productId]);
        const product = productQuery.rows[0];
        product.reviews = reviewsQuery.rows;

        response.status(200).json(product);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/products/name/:productname', async (request, response) => {
    const productName = request.params.productname.replace(/\s+/g, "").toLowerCase();

    try {
        const productQuery = await pool.query('SELECT * FROM products WHERE LOWER(REPLACE(productname, \' \', \'\')) = $1', [productName]);
        if (productQuery.rows.length === 0) {
            return response.status(404).json({ error: 'Product not found' });
        }

        const productId = productQuery.rows[0].id;
        const reviewsQuery = await pool.query('SELECT * FROM product_reviews WHERE product_id = $1', [productId]);
        const product = productQuery.rows[0];
        product.reviews = reviewsQuery.rows;

        response.status(200).json(product);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/user-details', async (request, response) => {
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
            userId,
            country,
            stete,
            city,
            street,
            landMark,
            houseNumber,
            pinCode
          } = request.body;
        const usersQuery = await pool.query('INSERT INTO user_details (first_name, middle_name, last_name, age, gender, email, phone, phone2, username, password, birth_date, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
        [firstName, middleName, lastName, age, gender, email, phone, phone2, username, password, birthDate, image]
      );
        const addressQuery = await pool.query('INSERT INTO user_address (user_id, country, stete, city, street, landmark, housenumber, pincode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [userId, country, stete, city, street, landMark, houseNumber, pinCode]
      );
        

        res.status(200).send('User added successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
