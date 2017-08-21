var express = require('express')
var game = require('../models/game')
var router = express.Router()

router.get('/', function(req, res) {
  res.status(200)
  res.render('join')
})

module.exports = router;
