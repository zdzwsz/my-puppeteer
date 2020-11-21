var http=require("http");

var options={
    hostname:"localhost",
    port:13000,
    path:"/send?url=123",
    method:"GET",
    headers:{
    }
}

var req=http.request(options,function(res){
    res.on("data",function(chunk){
        console.log(chunk.toString());
    });
    res.on("end",function(){
        console.log("over");
    });
    console.log(res.statusCode);
});

req.on("error",function(err){
    console.log(err.message);
})
req.end();