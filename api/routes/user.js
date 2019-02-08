const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/', UserController.user_get_all);

router.post('/signup', UserController.user_post_sign_up);

router.post('/login', UserController.user_post_login);

module.exports = router;