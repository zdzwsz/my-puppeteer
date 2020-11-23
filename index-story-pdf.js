const puppeteer = require('puppeteer');
var { send, get } = require("./lib/HttpClient");
const { start } = require('./lib/HttpServer');

//var time = 10;
var name_ = "test_";

function startPdf(time) {
    setTimeout(() => {
        get(function (data) {
            console.log(data.length);
            getHtml2Pdf(data, name_).then(function(){
                if (data.length > 0) {
                    startPdf(1000)
                } else {
                    console.log("=====================over==============");
                }
            });
        })
    }, time);
}


async function getHtml2Pdf(urls, name) {
    const browser = await puppeteer.launch({
    });
    for (let i = 0; i < urls.length; i++) {
        try {
            const page = await browser.newPage();
            await page.goto(urls[i]);
            let divHandle = await page.$('#secondary')
            await page.evaluate((el, value) => el.setAttribute('style', value),
                divHandle,
                'display: none'
            )
            divHandle = await page.$('#primary')
            await page.evaluate((el, value) => el.setAttribute('style', value),
                divHandle,
                'width:1000px;font-size:32px;'
            )

            divHandle = await page.$('.entry-footer')
            await page.evaluate((el, value) => el.setAttribute('style', value),
                divHandle,
                'display: none'
            )
            var d = new Date();
            var n = d.getTime();
            let filepath = "c:/book/" + name + n + ".pdf"
            await page.pdf({ path: filepath, format: 'A4' });
            console.log("index:{" + i + "} is over");
        } catch (e) {
            console.log(i + ":error");
        }
    }
    await browser.close();

}
//start
startPdf(10);