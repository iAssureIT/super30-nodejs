const express = require('express');
const router = express.Router();


const UsersController = require('../controllers/users.js');

router.post('/post/signup', 	UsersController.signup);
router.post('/post/login', 	UsersController.login);

module.exports = router;
