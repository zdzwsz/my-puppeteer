var http=require("http");
var sendUrl = "/send?url=";
var getUrl = "/get";
var options={
    hostname:"localhost",
    port:13000,
    method:"GET"
}
function send(str,cb){
    options.path = sendUrl+ str;
    var req=http.request(options,function(res){
        res.on("data",function(chunk){
            let data = chunk.toString();
            if(data ==="true"){
                cb();
            }
        });
        res.on("end",function(){
            //console.log("over");
        });
       // console.log(res.statusCode);
    });
    
    req.on("error",function(err){
        console.log(err.message);
    })
    req.end();
}

function get(cb){
    options.path = getUrl;
    var req=http.request(options,function(res){
        res.on("data",function(chunk){
            let data = chunk.toString();
            data = JSON.parse(data);
            cb(data);
        });
        res.on("end",function(){
            //console.log("over");
        });
        //console.log(res.statusCode);
    });
    
    req.on("error",function(err){
        console.log(err.message);
    })
    req.end();
}

module.exports = {send , get};


