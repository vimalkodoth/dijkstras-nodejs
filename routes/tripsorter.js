var express = require('express');
var router = express.Router();

var pathfinder = require('../utils/pathfinder');
var helpers = require('../utils/helpers')


router.post('/', function(req, res, next) {
  let discount = true;
  if(!req.body.fromVal || !req.body.toVal || !req.body.toVal){
    res.json({
      code:'Provide valid inputs'
    });
  } else {
    let response = pathfinder.run(req.body.fromVal, req.body.toVal, req.body.option, req.body.discount);
    res.json(response);
  }
});

router.get('/destinations', function(req, res){
  let fromList = helpers.getDepartures() || [], toList = helpers.getArrivals() || [];
  res.json({
    fromList,
    toList
  });
});

module.exports = router;
