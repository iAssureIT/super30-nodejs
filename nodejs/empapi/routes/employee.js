const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.js');

router.post('/post', EmployeeController.insert_employee);
router.get('/get', EmployeeController.get_employeeList);
router.delete('/delete/:empid', EmployeeController.delete_employee);


module.exports = router;
