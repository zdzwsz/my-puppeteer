const puppeteer = require('puppeteer');
var { send, get } = require("./lib/HttpClient");

var main_urls = []
var base_url = "https://XXX";
var base_url1 = "https://xxxxx";
function createUrl(){
   for(let i = 1;i<8;i++){
     main_urls.push(base_url+i);
   }
   main_urls.push(base_url1);
   main_urls.push(base_url1+"/page/2");
}
var lengths = 0;
function worker(time){
    setTimeout(() => {
        scrape().then((value) => {
            value.forEach(function (href) {
                send(href, function () { });
            })
            console.log(value.length);
            lengths ++;
            if(lengths < main_urls.length){
                worker(5000)
            }
        });
    }, time);
};


let scrape = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(main_urls[lengths]);

    const result = await page.evaluate(() => {
        let data = []; // 初始化空数组来存储数据
        let elements = document.querySelectorAll('.entry-content'); // 获取所有书籍元素

        for (var element of elements) { // 循环
            let node = element.childNodes[1];
            let href = node.getAttribute("href"); // 获取标题
            //send(href,function(){});
            data.push(href); // 存入数组
        }

        return data; // 返回数据
    });

    browser.close();
    return result;
};

//start
createUrl();
worker(10);
    
