const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.js');

router.post('post', (req,res,next)=>{
						console.log("I am inside insert_employee function");
						console.log("request = ",req);
					}
);

// router.get('/get',function());
// router.put('/put',function());
// router.patch('/patch',function());



module.exports = router;