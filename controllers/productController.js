const productService = require('../services/productService');

exports.getProducts = async (req, res) => {
    try {
        const [products, reviews] = await Promise.all([
            productService.getAllProducts(),
            productService.getAllProductReviews()
        ]);

        if (!products || !reviews) {
            return res.status(404).json({ message: 'Products or reviews not found' });
        }

        const productsWithReviews = products.map(product => {
            const productReviews = reviews.filter(review => review.product_id === product.id);
            return {
                ...product,
                reviews: productReviews
            };
        });

        res.status(200).json(productsWithReviews);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
