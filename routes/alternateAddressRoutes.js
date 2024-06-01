const express = require('express');
const router = express.Router();
   
    const {addAlternateAddress,  getAlternateAddress, deleteAlternateAddress,updateUserAddressDetails} = require('../services/alternateAddressServices');


router.post('/', addAlternateAddress);
router.get('/',  getAlternateAddress);
router.delete('/:address_id', deleteAlternateAddress);
router.put('/:address_id', updateUserAddressDetails);




module.exports = router;