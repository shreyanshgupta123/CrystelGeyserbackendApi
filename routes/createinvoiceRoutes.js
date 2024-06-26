const express = require('express');
const router = express.Router();
const { getInvoicePdf } = require('../services/createInvoicePdf');


// const invoice = {
//   shipping: {
//     name: "John Doe",
//     address: "1234 Main Street",
//     city: "San Francisco",
//     state: "CA",
//     country: "US",
//     postal_code: 94111
//   },
//   items: [
//     {
//       item: "TC 100",
//       description: "Toner Cartridge",
//       quantity: 2,
//       amount: 6000
//     },
//     {
//       item: "USB_EXT",
//       description: "USB Cable Extender",
//       quantity: 1,
//       amount: 2000
//     },
//     {
//       item: "USB_EX",
//       description: "USB Cable Extendere",
//       quantity: 1,
//       amount: 3000
//     }
//   ],
//   subtotal: 8000,
//   paid: 0,
//   invoice_nr: 1234
// };

// router.post('/', (req, res) => {
//   req.body = invoice; 
//   getInvoicePdf(req, res);
// });
router.post('/', (req, res) => {
  getInvoicePdf(req, res);
});

module.exports = router;
