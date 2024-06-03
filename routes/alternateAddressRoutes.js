const express = require('express');
const router = express.Router();
   
    const {addAlternateAddress,  getAlternateAddress, deleteAlternateAddress,updateUserAddressDetails,getAlternateAddressById} = require('../services/alternateAddressServices');


router.post('/', addAlternateAddress);
router.get('/',  getAlternateAddress);
router.get('/:address_id', getAlternateAddressById);
router.delete('/:address_id', deleteAlternateAddress);
router.put('/:address_id', updateUserAddressDetails);




module.exports = router;