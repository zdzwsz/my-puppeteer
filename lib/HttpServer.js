
var http = require('http');
const { start } = require('repl');
const urlib = require("url");
var server = http.createServer()
var urls=[]
var qserver = {
  init(){
    server.on('request', function (req, res) {
      var urlObj = urlib.parse(req.url,true);
      //console.log(urlObj)
      if (urlObj.pathname === '/send') {
        urls.push(urlObj.query.url)
        res.end("true")
      } else if (urlObj.pathname === '/get') {
        if(urls.length>= 20){
          let urlss = urls.splice(0,20);
          res.end(JSON.stringify(urlss))
        }else{
          res.end(JSON.stringify(urls))
          urls=[];
        }
      } else {
        res.end("false")
      }
    })
  },

  start(){
    this.init();
    let port = 13000
    server.listen(port, function () {
      console.log('start : ',port);
    })
  },

  stop(cb){
    server.close(cb);
  }
  
}

module.exports = qserver;