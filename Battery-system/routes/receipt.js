const express = require('express');
const router = express.Router();
const receiptControllers = require('../controllers/receiptControllers');

router.get('/receipt', receiptControllers);

module.exports = router;
