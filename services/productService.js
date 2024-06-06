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

const getAllProducts = async (request, response) => {
    console.log("hello")
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
};

const getProductsById = async (request, response) => {
    console.log("hello")
    try {
        const productId = request.params.productid;
        const productsQuery = await pool.query('SELECT * FROM products');
        const reviewsQuery = await pool.query('SELECT * FROM product_reviews');

        const products = productsQuery.rows.map(product => {
            const reviews = reviewsQuery.rows.filter(review => review.product_id === product.id);
            return {
                ...product,
                reviews: reviews
            };
        });
        const result = products.find(product => product.id === productId);
        console.log(result)
        response.status(200).json(result);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProductsById = async (request, response) => {
    try {
        const productId = request.params.productid;
        await pool.query(
            'DELETE FROM product_reviews WHERE product_id = $1',
            [productId]
        );
        await pool.query(
            'DELETE FROM products WHERE id = $1',
            [productId]
        );
        response.status(200).send('Product details deleted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const getProductsByName = async (request, response) => {
    const productName = request.params.productname.replace(/\s+/g, "").toLowerCase();

    try {
        
        const productQuery = await pool.query(
            'SELECT * FROM products WHERE LOWER(REPLACE(productname, \' \', \'\')) = $1', 
            [productName]
        );

        
        if (productQuery.rows.length === 0) {
            return response.status(404).json({ error: 'Product not found' });
        }

        const product = productQuery.rows[0];
        const productId = product.id;

       
        const reviewsQuery = await pool.query(
            'SELECT * FROM product_reviews WHERE product_id = $1', 
            [productId]
        );

       
        product.reviews = reviewsQuery.rows;

        
        response.status(200).json(product);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
const addProduct = async (request, response) => {
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
};
const getAllProductsInAscendingOrder = async (request, response) => {
    try {
        const productsQuery = await pool.query('SELECT * FROM products ORDER BY price ASC');
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
};

const getAllProductsInDescendingOrder = async (request, response) => {
    try {
        const productsQuery = await pool.query('SELECT * FROM products ORDER BY price DESC');
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
};
const getAllProductsInAscendingOrderByRating = async (request, response) => {
    try {
        const productsQuery = await pool.query('SELECT * FROM products ORDER BY rating ASC');
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
};

const getAllProductsInDescendingOrderByRating = async (request, response) => {
    try {
        const productsQuery = await pool.query('SELECT * FROM products ORDER BY rating DESC');
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
};    
const getAllProductsInDescendingOrderBySize = async (request, response) => {
    try {
        const productsQuery = await pool.query('SELECT * FROM products ORDER BY size DESC');
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
}; 
const getAllProductsInAscendingOrderBySize = async (request, response) => {
    try {
        const productsQuery = await pool.query('SELECT * FROM products ORDER BY size ASC');
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
}; 
const getAllProductsBySearch = async (request, response) => {
    const Search = request.params.search;

    try {
        let productsQueryText = 'SELECT * FROM products';
        let queryParams = [];

        if (Search) {
            productsQueryText += ' WHERE productname ILIKE $1';
            queryParams.push(`%${Search}%`);
        }

        productsQueryText += ' ORDER BY price DESC';

        const productsQuery = await pool.query(productsQueryText, queryParams);
        const reviewsQuery = await pool.query('SELECT * FROM product_reviews');

        const products = productsQuery.rows.map(product => {
            const reviews = reviewsQuery.rows.filter(review => review.product_id === product.id);
            return {
                ...product,
                reviews: reviews
            };
        });
        console.log(products)

        response.status(200).json(products);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    getAllProducts,
    getProductsById,
    deleteProductsById,
    getProductsByName,
    addProduct,
    getAllProductsInAscendingOrder,
    getAllProductsInDescendingOrder,
    getAllProductsInAscendingOrderByRating,
    getAllProductsInDescendingOrderByRating,
    getAllProductsInDescendingOrderBySize,
    getAllProductsInAscendingOrderBySize,
    getAllProductsBySearch

};
