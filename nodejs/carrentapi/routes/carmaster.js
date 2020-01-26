const express = require('express');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
	destination: function(req,res,cb){
		cb(null,'./uploads');
	},
	filename: function(req, file, cb){
		console.log("req = ",req);
		console.log("files = ",file);
		var originalname = file.originalname.split(".");
		cb(null, originalname[0] + new Date().toISOString() + "."+ originalname[1]);
	}
})

var upload 	 = multer({ storage : storage});


const CarMasterController = require('../controllers/carmaster.js');

router.post('/post', 	CarMasterController.insert_carMaster);
router.post('/post-regimage', upload.single("registrationPic")	,CarMasterController.upload_registrationPic);
router.post('/post-insimage', upload.array("insurancePics",12)	,CarMasterController.upload_insurancePic);

router.post('/delete', 	CarMasterController.delete_carMaster);
router.post('/delimage', CarMasterController.delete_carImage);

router.get('/get/list', CarMasterController.get_carMaster_list);
router.get('/get/one/:carMaster_id', CarMasterController.get_oneCarMaster);


module.exports = router;
