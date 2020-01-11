const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.js');

router.post('/post', EmployeeController.insert_employee);
router.get('/get/list', EmployeeController.get_employeeList);
router.get('/get/list/:highEdu', EmployeeController.get_empHighEduList);
router.get('/get/:empid', EmployeeController.get_oneEmployee);
router.delete('/delete/:empid', EmployeeController.delete_employee);


module.exports = router;
