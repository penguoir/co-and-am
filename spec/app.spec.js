var app = require('../app')
var http = require('http')

var port = process.env.PORT || 8080

describe('Server', function () {
  beforeAll(function (done) {
    app.server
    done()
  })

  it('should show the home screen', function (done) {
    http.get(`http://localhost:${port}`, function(res) {
      expect(res.statusCode).toBe(200)
      done()
    })
  })

  it('should load css files', function (done) {
    http.get(`http://localhost:${port}/css/main.css`, function (res) {
      expect(res.statusCode).toBe(200)
      done()
    })
  })

  afterAll(function (done) {
    app.close()
    done()
  })

})
