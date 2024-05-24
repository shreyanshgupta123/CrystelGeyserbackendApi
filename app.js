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
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/productcategories', productCategoriesRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/currentorders', currentOrderRoutes);
app.use('/api/cancelledorders', cancelledOrderRoutes);
app.use('/api/deliveredorders', deliveredOrderRoutes);
app.use('/api/wishlist', wishlistRoutes);
// app.use('/api/users/:userId', userRoutes);

module.exports = app;
