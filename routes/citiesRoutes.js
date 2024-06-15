const express = require('express');
const router = express.Router();
const {addCity,getReturnJarRequest,getCitiesById,deleteCities} = require('../services/citiesServices');


router.post('/', addCity);
router.get('/', getReturnJarRequest);
router.get('/:invoice_id', getCitiesById);

router.delete('/:invoice_id', deleteCities);



module.exports = router;