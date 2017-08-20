var express = require('express');

var app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(require('./controllers'))
app.use(express.static(__dirname + '/public'))

exports.server = app.listen(process.env.PORT || 8080)

exports.close = function() {
  this.server.close()
}
