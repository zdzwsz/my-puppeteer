var pserver = require("./HttpServer");
var { send, get } = require("./HttpClient");
var time = 100;
pserver.start();
var sender = function () {
    setTimeout(function () {
        send("12344", function () {
            time--;
            if(time>0){
                sender();
            }else{
                console.log("sender is over!!!!!!")
            }
        })
    }, 100)
}

var ll = 0;
var total = 0;
var geter = function () {
    setTimeout(function () {
        get(function (data) {
            console.log("{"+ll+"}"+data.length);
            ll++;
            total += data.length;
            if(data.length > 0){
                geter();
            }else{
                console.log("{total}"+ total);
                pserver.stop(function(){});
            }
        })
    }, 3000)
}

var over = function () {
    setTimeout(function () {
        if (time < 0) {
            clearTimeout(over);
            clearTimeout(geter);
            clearTimeout(sender);
            pserver.stop(function(){});
        } else {
            over();
        }
    }, 1000)
}
sender();
geter();
//over();