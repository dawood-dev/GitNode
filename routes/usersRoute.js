const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', function (req, res, next) {

    UsersController.getUsers(req, res, next);

});

module.exports = router;