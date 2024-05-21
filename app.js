const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
