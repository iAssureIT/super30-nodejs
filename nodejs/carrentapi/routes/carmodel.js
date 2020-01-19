const express = require('express');
const router = express.Router();


const CarModelController = require('../controllers/carmodel.js');

router.post('/post', 	CarModelController.insert_carModel);
router.post('/delete', 	CarModelController.delete_carModel);

router.get('/get/list', CarModelController.get_carModel_list);
router.get('/get/list/atoz/:brand', CarModelController.get_carModel_list_atoz);
router.get('/get/one/:model_id', CarModelController.get_oneCarModel);


module.exports = router;
