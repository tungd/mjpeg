
var fs = require('fs')

require('http').createServer(function (req, res) {
  var interval
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
}).listen(5000)
