
var handlers = {
  '/html': function (req, res) {
    // TODO
  }
  , '/jpeg': function (req, res) {
    // TODO
  }
  , '/mjpeg': function (req, res) {
    var interval
      , fs = require('fs')
      , boundary = 'hello'
      , current = 0
      , frames = 250

    res.writeHead(200, {
      'Content-Type': 'multipart/x-mixed-replace;boundary=' + boundary
    })

    interval = setInterval(function() {
      res.write('--' + boundary + "\n")
      res.write("Content-Type: image/jpeg\n\n")
      res.write(fs.readFileSync("img/" + (current % 16 + 1) + ".jpg"))
      current += 1

      if (current >= frames) {
        clearInterval(interval)
        res.end()
      }
    }, 1000 / 25)
  }
  , '/': function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end("Hello, world!")
  }
}

require('http').createServer(function (req, res) {
  (handlers[ req.url ] || handlers['/'])(req, res)
}).listen(5000)
