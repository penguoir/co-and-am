var express = require('express')
var router = express.Router()

router.use('/g', require('./game'))
router.use('/j', require('./join'))

router.get('/', function(req, res) {
  res.status(200)
  res.render('index')
})

module.exports = router
