const express = require('express');
const router = express.Router();
const redis = require("redis");
const mostFrequentController = require("../controllers/most-frequentController");

/* GET most frequent users listing. */
router.get('/', function (req, res, next) {

    mostFrequentController.getUsers(req, res, next);

});

module.exports = router;