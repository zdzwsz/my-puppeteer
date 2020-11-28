const puppeteer = require('puppeteer');
const base_url = "https://aiqicha.baidu.com"
const relation_url = "/relations?pid=@pid@"
const compinfo_url = "/detail/compinfo?pid=@pid@"

let main = (async (browser) => {
    const page = await browser.newPage();
    await page.goto(base_url);
    let title = await page.title();
    console.log(title);
    const input_select = '#aqc-search-input';
    const companyName = '广东飞企互联科技股份有限公司';
    await page.type(input_select, companyName, { delay: 10 });
    await page.keyboard.press('Enter');
    await page.waitFor(3000);
    const BRANDS_INFO_SELECTOR = 'div.company-list';
    const divHandle = await page.$(BRANDS_INFO_SELECTOR);
    const brands = await page.evaluate(sel => {
        let list = sel.querySelector("h3")
        return list.childNodes[0].getAttribute("href");
    }, divHandle);
    return brands;
});

let compinfo = (async (browser, url) => {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(3000);
    const divHandle = await page.$("#basic-business");
    const brands = await page.evaluate((sel) => {
        let table = sel.querySelector("table.zx-detail-basic-table")
        function getTableValue(table) {
            let data=[]
            let rows = table.rows;
            for (let i = 0; i < rows.length; i++) {
                let cells = rows[i].cells;
                let rdata=[];
                for(let j = 0;j<cells.length;j++){
                    rdata.push(cells[j].innerText);
                }
                data.push(rdata);
            }
            return data;
        }
        return getTableValue(table);
    }, divHandle);
    return brands;
});
//找寻企业关系 //invest-node 对外投资  // branch-node 分支机构  // investor-node 投资方 // directors-node 高管
let relation = (async (browser, url) => {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(3000);
    const divHandle = await page.$("svg.chart-relation");
    const brands = await page.evaluate((sel) => {
        let invest_nodes = Array.from(sel.querySelectorAll(".invest-node"))
        const invest = invest_nodes.map(v => {
            let a = v.querySelector("text");
            return a.textContent;

        });
        let branch_nodes = Array.from(sel.querySelectorAll(".branch-node"))
        const branch = branch_nodes.map(v => {
            let a = v.querySelector("text");
            return a.textContent;
        });
        let investor_nodes = Array.from(sel.querySelectorAll(".investor-node"))
        const investor = investor_nodes.map(v => {
            let a = v.querySelector("text");
            return a.textContent;
        });
        let directors_nodes = Array.from(sel.querySelectorAll(".directors-node"))
        const directors = directors_nodes.map(v => {
            let a = v.querySelector("text");
            return a.textContent;
        });
        return {invest,branch,investor,directors}
    }, divHandle);
    return brands;
})

let start = async () => {
    const browser = await (puppeteer.launch({ headless: true }));
    let url = await main(browser);
    let value = base_url + url;
    let pid_temps = url.split("=")
    let pid = pid_temps[1];
    console.log(pid);
    let cominfo = await compinfo(browser, value)
    //console.log(value);
    url = relation_url.replace("@pid@",pid)
    value = base_url + url;
    relation = await relation(browser, value)
    cominfo.relation = relation;
    console.log(cominfo);
    browser.close();
}



start();



