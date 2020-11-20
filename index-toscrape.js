const puppeteer = require('puppeteer');
 
let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
 
    await page.goto('http://books.toscrape.com/');
 
    const result = await page.evaluate(() => {
        let data = []; // 初始化空数组来存储数据
        let elements = document.querySelectorAll('.product_pod'); // 获取所有书籍元素
 
        for (var element of elements){ // 循环
            let title = element.childNodes[5].innerText; // 获取标题
            let price = element.childNodes[7].children[0].innerText; // 获取价格
 
            data.push({title, price}); // 存入数组
        }
 
        return data; // 返回数据
    });
 
    browser.close();
    return result;
};
 
scrape().then((value) => {
    console.log(value); // Success!
});