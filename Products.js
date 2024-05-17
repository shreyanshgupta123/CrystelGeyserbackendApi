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

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
