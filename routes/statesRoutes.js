const express = require('express');
const router = express.Router();
const {addState,getState,getStatesById,deleteStates} = require('../services/statesServices');


router.post('/', addState);
router.get('/', getState);
router.get('/:invoice_id', getStatesById);

router.delete('/:invoice_id', deleteStates);



module.exports = router;