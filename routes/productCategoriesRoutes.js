const express = require('express');
const router = express.Router();
const { getAllCategories , createCategorie,deleteCategorie,getCategorieById,getProductByCategoryId} = require('../services/productCategoriesService');

router.get('/', getAllCategories);
router.post('/', createCategorie);
router.delete('/:categoryId', deleteCategorie);
router.get('/:categoryId', getCategorieById);
router.get('/category/:categoryId', getProductByCategoryId);


module.exports = router;