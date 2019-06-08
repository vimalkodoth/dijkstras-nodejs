var express = require('express');
var router = express.Router();
let helpers = require('../utils/helpers');
var pathfinder = require('../utils/pathfinder');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
