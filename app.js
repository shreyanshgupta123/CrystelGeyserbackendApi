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
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const alternateAddressRoutes = require('./routes/alternateAddressRoutes');
const pausedSubcriptionRoutes = require('./routes/pausedSubscriptionRoutes');
const forgetpasswordRoutes = require('./routes/forgetPasswordRoutes');
const discountRoutes = require('./routes/discountroutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const activesubscriptionRoutes = require('./routes/activesubscriptionRoutes');
const cancelledscriptionRoutes = require('./routes/cancelledsubscriptionRoutes');
const allSubscriptionRoutes = require('./routes/AllsubscriptionRoutes');
require('dotenv').config();
const cors = require('cors');

 const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const accessToken = jwt.sign({ username: username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ accessToken });
// });

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
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/alternateaddress', alternateAddressRoutes);
app.use('/api/pausedsubscription', pausedSubcriptionRoutes);
app.use('/api/forgetpassword', forgetpasswordRoutes);
app.use('/api/discount', discountRoutes);
app.use('/api/invoice', invoiceRoutes);activesubscriptionRoutes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/activesubscription', activesubscriptionRoutes);
app.use('/api/cancelledsubscription', cancelledscriptionRoutes);
app.use('/api/allsubscriptions', allSubscriptionRoutes);
// app.use('/api/users/:userId', userRoutes);

module.exports = app;
