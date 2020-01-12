const express = require('express');
const router = express.Router();

const StudentControllers = require('../controllers/students.js');
router.post("/api/students/post", StudentControllers.insert_student);
router.get("/api/students/get/list", StudentControllers.students_list);
router.get("/api/students/get/one/:student_id", StudentControllers.one_student);


module.exports = router;