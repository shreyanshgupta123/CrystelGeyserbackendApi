const express = require('express');
const router = express.Router();
   
    const {addAlternateAddress,  getAlternateAddress, deleteAlternateAddress} = require('../services/alternateAddressServices');


router.post('/', addAlternateAddress);
router.get('/',  getAlternateAddress);
router.delete('/:address_id', deleteAlternateAddress);




module.exports = router;