require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { Sequelize } = require("sequelize");
const app = express();
const port = process.env.PORT || 3400;
const jwt = require('jsonwebtoken');
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
app.delete('/products/:productid', async (request, response) => {
    try {
        const productId = request.params.productid;
        const deleteProductsReviewQuery = await pool.query(
            'DELETE FROM product_reviews WHERE product_id = $1',
            [productId]
        );
        const deleteProductyQuery = await pool.query(
            'DELETE FROM products WHERE id = $1',
            [productId]
        );
        response.status(200).send('product details deleted successfully');
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
            isLoggedIn,
            country,
            states,
            city,
            street,
            landmark,
            houseNumber,
            pinCode
        } = request.body;


        const existingUser = await pool.query(
            'SELECT * FROM user_details WHERE username = $1',
            [username]
        );

        if (existingUser.rows.length > 0) {
            return response.status(400).json({ error: 'Username already exists' });
        }


        const usersQuery = await pool.query(
            'INSERT INTO user_details (first_name, middle_name, last_name, age, gender, email, phone, phone2, username, password, birth_date, image,isLoggedIn) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13) RETURNING id',
            [firstName, middleName, lastName, age, gender, email, phone, phone2, username, password, birthDate, image, isLoggedIn]
        );

        const userId = usersQuery.rows[0].id;


        const addressQuery = await pool.query(
            'INSERT INTO user_address_ (user_id, country, states, city, street, landmark, housenumber, pincode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [userId, country, states, city, street, landmark, houseNumber, pinCode]
        );


        const token = jwt.sign({ userId }, 'your_secret_key', { expiresIn: '7d' });

        response.status(200).json({ message: 'Success', token });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/user-details', async (request, response) => {
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
});
app.get('/user-details/:userId', async (request, response) => {
    try {
        const userId = request.params.userId;
        const usersQuery = await pool.query('SELECT * FROM user_details');
        const addressQuery = await pool.query('SELECT * FROM user_address_');

        const users = usersQuery.rows.map(user => {
            const addresses = addressQuery.rows.filter(address => address.user_id === user.id);
            return {
                ...user,
                address: addresses
            };
        });
        const result=users.find(user=>user.id === userId)
    

        response.status(200).json(result);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
app.put('/user-details/:userId', async (request, response) => {
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


        const updateUserQuery = await pool.query(
            'UPDATE user_details SET first_name = $1, middle_name = $2, last_name = $3, age = $4, gender = $5, email = $6, phone = $7, phone2 = $8, username = $9, password = $10, birth_date = $11, image = $12, isLoggedIn = $13 WHERE id = $14',
            [firstName, middleName, lastName, age, gender, email, phone, phone2, username, password, birthDate, image, isLoggedIn, userId]
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
});
app.delete('/user-details/:userId', async (request, response) => {
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
});
app.get('/categories', async (request, response) => {
    try {
        const categoriesQuery = await pool.query('SELECT * FROM products_categories');
        

        response.status(200).json(categoriesQuery.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/categories', async (request, response) => {
    try {
        const {
            category_name,
            
        } = request.body;


        const existingCategory = await pool.query(
            'SELECT * FROM products_categories WHERE category_name = $1',
            [category_name]
        );

        if (existingCategory.rows.length > 0) {
            return response.status(400).json({ error: 'category already exists' });
        }


        const usersQuery = await pool.query(
            'INSERT INTO products_categories (category_name) VALUES ($1)',
            [category_name]
        );

        

        response.status(200).json({ message: 'Success'});
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
app.delete('/categories/:categoryId', async (request, response) => {
    try {
        const categoryId = request.params.categoryId;
        const deleteAddressQuery = await pool.query(
            'DELETE FROM products_categories WHERE id = $1',
            [categoryId]
        );






        response.status(200).send('category deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/categories/:categoryId', async (request, response) => {
    const categoryId = request.params.categoryId;

    try {
        const productQuery = await pool.query('SELECT * FROM products_categories WHERE id = $1', [categoryId]);
        if (productQuery.rows.length === 0) {
            return response.status(404).json({ error: 'Category not found' });
        }


        response.status(200).json(productQuery.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/products', async (request, response) => {
    try {
        const {
            productName,
            price,
            size,
            rating,
            bottles,
            image,
            description,
            category_id
           
        } = request.body;


        const existingUser = await pool.query(
            'SELECT * FROM products WHERE productName = $1',
            [productName]
        );

        if (existingUser.rows.length > 0) {
            return response.status(400).json({ error: 'product already exists' });
        }


        const usersQuery = await pool.query(
            'INSERT INTO products (productname, price, size, rating, bottles, image, description, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [productName, price, size, rating, bottles, image, description,  category_id]
        );

       

        response.status(200).json({ message: 'Success'});
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/products/category/:categoryId', async (request, response) => {
    const categoryId = request.params.categoryId;

    try {
        const productQuery = await pool.query('SELECT * FROM products WHERE category_id = $1', [categoryId]);
        if (productQuery.rows.length === 0) {
            return response.status(404).json({ error: 'Category not found' });
        }


        response.status(200).json(productQuery.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/cart', async (request, response) => {
    try {
        const {
            quantity,
            discount,
            delivery_charges,
            refundable_deposit,
            productid
        } = request.body;

        const existingProduct = await pool.query(
            'SELECT * FROM cart WHERE productid = $1',
            [productid]
        );

        if (existingProduct.rows.length > 0) {
            return response.status(400).json({ error: 'Product already exists in the cart' });
        }

        const priceResult = await pool.query(
            'SELECT price FROM products WHERE id = $1',
            [productid]
        );

        if (priceResult.rows.length === 0) {
            return response.status(404).json({ error: 'Product not found' });
        }

        const { price } = priceResult.rows[0];

        const insertQuery = await pool.query(
            'INSERT INTO cart (quantity, discount, delivery_charges, refundable_deposit, productid, product_price) VALUES ($1, $2, $3, $4, $5, $6)',
            [quantity, discount, delivery_charges, refundable_deposit, productid, price]
        );

        response.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/cart', async (request, response) => {
    try {
        const cartItems = await pool.query('SELECT * FROM cart');

        if (cartItems.rows.length === 0) {
            return response.status(404).json({ error: 'No items in the cart' });
        }

        response.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
app.put('/cart/:order_id', async (request, response) => {
    try {
        const { order_id } = request.params;
        const {
            quantity,
            discount,
            delivery_charges,
            refundable_deposit,
        } = request.body;

        const existingProduct = await pool.query(
            'SELECT * FROM cart WHERE order_id = $1',
            [order_id]
        );

        if (existingProduct.rows.length === 0) {
            return response.status(404).json({ error: 'Order not found in the cart' });
        }

        const updateQuery = `
            UPDATE cart
            SET quantity = $1,
                discount = $2,
                delivery_charges = $3,
                refundable_deposit = $4
            WHERE order_id = $5
        `;

        const values = [
            quantity !== undefined ? quantity : existingProduct.rows[0].quantity,
            discount !== undefined ? discount : existingProduct.rows[0].discount,
            delivery_charges !== undefined ? delivery_charges : existingProduct.rows[0].delivery_charges,
            refundable_deposit !== undefined ? refundable_deposit : existingProduct.rows[0].refundable_deposit,
            order_id
        ];

        console.log('Executing query with values:', values);

        await pool.query(updateQuery, values);

        response.status(200).json({ message: 'Order updated successfully in the cart' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
app.delete('/cart/:order_id', async (request, response) => {
    try {
        const { order_id } = request.params;

        const existingProduct = await pool.query(
            'SELECT * FROM cart WHERE order_id = $1',
            [order_id]
        );

        if (existingProduct.rows.length === 0) {
            return response.status(404).json({ error: 'Order not found in the cart' });
        }

        const deleteQuery = 'DELETE FROM cart WHERE order_id = $1';

        await pool.query(deleteQuery, [order_id]);

        response.status(200).json({ message: 'Order deleted successfully from the cart' });
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});




app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
