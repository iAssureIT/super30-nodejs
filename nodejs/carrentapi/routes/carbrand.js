const express = require('express');
const router = express.Router();


const CarBrandController = require('../controllers/carbrand.js');

router.post('/post', 	CarBrandController.insert_carBrand);
router.post('/delete', 	CarBrandController.delete_carBrand);

router.get('/get/list', CarBrandController.get_carBrand_list);
router.get('/get/list/atoz', CarBrandController.get_carBrand_list_atoz);
router.get('/get/one/:brand_id', CarBrandController.get_oneCarBrand);


module.exports = router;
