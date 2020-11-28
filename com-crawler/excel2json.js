var xlsx2json = require("node-xlsx");
var jsonWrite = require("../lib/JsonFile");
var list = xlsx2json.parse("./com-crawler/data/data.xlsx");

var jsonData = [];

var hstart = 2 //行
//sheel 循环  list.length
for (var i = 0; i < list.length; i++) {
    let sheel = list[i];
    let kind_ = "";
    let typecode_ = "";
    let typename_ = "" 
    for (var h = hstart; h < sheel.data.length; h++) {
        let kind = sheel.data[h][1];
        let typec = sheel.data[h][2]
        let typen = sheel.data[h][3]
        //console.log(kind !=="")
        if(kind){kind_ = kind;}else{kind = kind_;}
        if(typec){typecode_ = typec}else{typec = typecode_;}
        if(typen){typename_ = typen}else{typen = typename_;}

        let code = sheel.data[h][4];
        let name = sheel.data[h][5];
        jsonData.push({kind,typec,typen,code,name})
    }
}
console.log(jsonData.length)
jsonWrite(jsonData,"./com-crawler/data/company.json");