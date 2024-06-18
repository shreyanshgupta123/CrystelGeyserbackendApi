const express = require('express');
const router = express.Router();
const {addCountry,getCountries,getCountriesById,deleteCountries} = require('../services/countriesServices');


router.post('/', addCountry);
router.get('/', getCountries);
router.get('/:invoice_id', getCountriesById);

router.delete('/:invoice_id', deleteCountries);



module.exports = router;