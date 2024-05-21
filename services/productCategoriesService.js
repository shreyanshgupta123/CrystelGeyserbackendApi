const { Pool } = require('pg');
const config = require('../config/config');

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
const getAllCategories = async (request, response) => {
    try {
        const categoriesQuery = await pool.query('SELECT * FROM products_categories');
        

        response.status(200).json(categoriesQuery.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const createCategorie = async (request, response) => {
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
};
const deleteCategorie = async (request, response) => {
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
};
const getCategorieById = async (request, response) => {
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
};
const getProductByCategoryId = async (request, response) => {
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
};
module.exports = {
    getAllCategories,
    createCategorie,
    deleteCategorie,
    getCategorieById,
    getProductByCategoryId
};