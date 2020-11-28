const fs = require('fs');

function wirte(arrayData,fileName){
    let writerStream = fs.createWriteStream(fileName);
    writerStream.write(JSON.stringify(arrayData), 'UTF8');
    writerStream.end();
}

module.exports = wirte;
