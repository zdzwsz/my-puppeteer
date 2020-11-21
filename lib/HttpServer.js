
var http = require('http')
const urlib = require("url");
var server = http.createServer()
var urls=[]
server.on('request', function (req, res) {
  var urlObj = urlib.parse(req.url,true);
  //console.log(urlObj)
  if (urlObj.pathname === '/send') {
    urls.push(urlObj.query.url)
    res.end("true")
  } else if (urlObj.pathname === '/get') {
    res.end(JSON.stringify(urls))
    urls=[];
  } else {
    res.end("false")
  }
})
server.listen(13000, function () {
  console.log('服务器启动成功，可以访问了。。。')
})

module.exports = server;