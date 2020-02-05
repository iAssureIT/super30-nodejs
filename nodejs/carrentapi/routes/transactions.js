const express = require('express');
const router = express.Router();
const Auth = require('../middleware/check-auth.js');


const TransController = require('../controllers/transactions.js');

router.get('/get/report1', Auth.CheckAuth,	TransController.get_report1);

module.exports = router;
