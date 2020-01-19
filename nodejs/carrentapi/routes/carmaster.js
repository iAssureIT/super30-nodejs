const express = require('express');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
	destination: function(req,res,cb){
		cb(null,'./uploads');
	},
	filename: function(req, file, cb){
		var originalname = file.originalname.split(".");
		cb(null, originalname[0] + new Date().toISOString() + "."+ originalname[1]);
	}
})

var upload 	 = multer({ storage : storage});


const CarMasterController = require('../controllers/carmaster.js');

router.post('/post', 	CarMasterController.insert_carMaster);
router.post('/post-image', upload.single("registrationPic")	,CarMasterController.upload_registrationPic);

router.post('/delete', 	CarMasterController.delete_carMaster);

router.get('/get/list', CarMasterController.get_carMaster_list);
router.get('/get/one/:carMaster_id', CarMasterController.get_oneCarMaster);


module.exports = router;
