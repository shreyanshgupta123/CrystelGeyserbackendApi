const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const productCategoriesRoutes = require('./routes/productCategoriesRoutes');
const cartRoutes = require('./routes/cartRoutes');
const currentOrderRoutes = require('./routes/currentOrdersRoutes');
const cancelledOrderRoutes = require('./routes/cancelledOrdersRoutes');
const deliveredOrderRoutes = require('./routes/deliveredOrdersRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/ordersRoutes');
const historyOrderRoutes = require('./routes/ordersHistoryRoutes');
require('dotenv').config();
const cors = require('cors');

 const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api/products', productRoutes);

// const axios = require('axios');



// // Middleware to add Bearer token to requests for '/api/products'
// app.use('/api/products', async (req, res, next) => {
//     try {
//         // Replace '<insert_your_token_here>' with your actual token
//         const token = 'your_token_here';

//         // Set the authorization header with Bearer token
//         req.headers['Authorization'] = `Bearer ${token}`;

//         // Pass control to the next middleware or route handler
//         next();
//     } catch (error) {
//         console.error('Error adding Bearer token:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Define product routes

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);
app.use('/api/productcategories', productCategoriesRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/currentorders', currentOrderRoutes);
app.use('/api/cancelledorders', cancelledOrderRoutes);
app.use('/api/deliveredorders', deliveredOrderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/ordershistory', historyOrderRoutes);
// app.use('/api/users/:userId', userRoutes);

module.exports = app;
