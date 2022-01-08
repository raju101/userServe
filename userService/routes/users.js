var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/api/signup', userController.create);

router.get('/api/login', userController.login);

module.exports = router;
