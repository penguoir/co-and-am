let express = require('express')
let router = express.Router()

router.get('/', function(req, res) {
  res.status(200)
  res.render('index')
})

module.exports = router
