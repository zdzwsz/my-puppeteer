const puppeteer = require('puppeteer');
var { send, get } = require("./lib/HttpClient");

var time = 10;
var name_ = "test_";
get(function (data) {
    console.log(data.length);
    getHtml2Pdf(data, name_);
})

async function getHtml2Pdf(urls, name) {
    const browser = await puppeteer.launch({
    });
    for (let i = 0; i < urls.length; i++) {
        try {
            const page = await browser.newPage();
            await page.goto(urls[i]);
            
            divHandle = await page.$('#primary')
            //#post-744 > header > h1

            var d = new Date();
            var n = d.getTime();
            let filepath = "c:/book/" + name + n + ".pdf"
            await page.pdf({ path: filepath, format: 'A4' });
            console.log("index:{"+i + "} is over");
        } catch (e) {
            console.log(i + ":error");
        }
    }
    await browser.close();

}