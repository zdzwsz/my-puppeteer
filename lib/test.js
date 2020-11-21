var server = require("./HttpServer");
var { send, get } = require("./HttpClient");
var time = 10;
var sender = function () {
    setTimeout(function () {
        send("12344", function () {
            time--;
            sender();
        })
    }, 1000)
}

var geter = function () {
    setTimeout(function () {
        get(function (data) {
            console.log(data);
            geter();
        })
    }, 10000)
}

var over = function () {
    setTimeout(function () {
        if (time < 0) {
            clearTimeout(over);
            clearTimeout(geter);
            clearTimeout(sender);
            server.close(function(){
                console.log("server close");
           });
        } else {
            over();
        }
    }, 1000)
}
sender();
geter();
over();