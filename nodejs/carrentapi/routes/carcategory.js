const express = require('express');
const router = express.Router();


const CarCatgController = require('../controllers/carcategory.js');

router.post('/post', 	CarCatgController.insert_carCategory);
router.post('/delete', 	CarCatgController.delete_carCategory);

router.get('/get/list', CarCatgController.get_carCategory_list);
router.get('/get/list/atoz', CarCatgController.get_carCategory_list_atoz);
router.get('/get/one/:catg_id', CarCatgController.get_oneCarCategory);


module.exports = router;
