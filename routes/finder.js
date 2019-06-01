var express = require('express');
var router = express.Router();

var pathfinder = require('../utils/pathfinder');


/* GET users listing. */
router.post('/finder', function(req, res, next) {
  let discount = true;
  let response = pathfinder.run("London", "Istanbul", '', discount);
  res.json(response);
});

module.exports = router;
