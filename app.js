const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const productCategoriesRoutes = require('./routes/productCategoriesRoutes');
const cartRoutes = require('./routes/cartRoutes');
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
// app.use('/api/users/:userId', userRoutes);

module.exports = app;
