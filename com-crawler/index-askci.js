const puppeteer = require('puppeteer');
const fs = require('fs');
const jsonData = require('./data/company.json');
var jsonWrite = require("../lib/JsonFile");

const base_save_path = "./com-crawler/data/com-data/";

const isTest = false;
let dlength = jsonData.length;
if (isTest) {
    dlength = 10;
}

var summary_url_t = "https://s.askci.com/stock/summary/@@/";
var holding_url_t = "https://s.askci.com/stock/summary/@@/holding/";
var employee_url_t = "https://s.askci.com/stock/summary/@@/employee/"
var executives_url_t = "https://s.askci.com/stock/executives/@@/"
var equity_url_t = "https://s.askci.com/stock/equity/@@/"

//start

let start = async () => {
    const browser = await puppeteer.launch({ headless: true });
    for (var i = 0; i < dlength; i++) {
        let d = jsonData[i];
        if(is_crawler(d.code))continue;
        let summary_url = summary_url_t.replace("@@", d.code);
        let holding_url = holding_url_t.replace("@@", d.code);
        let employee_url = employee_url_t.replace("@@", d.code);
        let executives_url = executives_url_t.replace("@@", d.code);
        let equity_url = equity_url_t.replace("@@", d.code);
        let one_comp = await once(browser, summary_url, holding_url, employee_url, executives_url, equity_url);
        if(one_comp!=null){
            jsonWrite(one_comp, base_save_path + d.code + ".json");
        }
    }
    browser.close();
};

let is_crawler = function (code) {
    let filePath = base_save_path + code + ".json";
    return fs.existsSync(filePath)
}

//一个企业
let once = async (browser, summary_url, holding_url, employee_url, executives_url, equity_url) => {
    try{
        const page = await browser.newPage();
        await page.goto(summary_url);
        let sd = await summary(page);
        await page.goto(holding_url);
        let hd = await holding(page);
        await page.goto(employee_url);
        let ed = await employee(page);
        await page.goto(executives_url);
        let xd = await executives(page);
        await page.goto(equity_url);
        let yd = await equity(page);
        await page.close();
        return { sd, hd, ed, xd, yd };
    }catch(e){
        console.log("error:"+summary_url);
    }
    return null;
};



let summary = async (page) => {
    const BRANDS_INFO_SELECTOR = '.right_f_c_table';
    const brands = await page.evaluate(sel => {
        const ulList = Array.from($(sel).find('table tbody tr'));
        const ctn = ulList.map(v => {
            const text = v.innerText.replace(/\s/g, '');
            const arr = text.split("：");
            return { k: arr[0], v: arr[1] }
        });
        return ctn;
    }, BRANDS_INFO_SELECTOR);
    return brands
};

let holding = async (page) => {
    const BRANDS_INFO_SELECTOR = '.right_f_d_table';
    const brands = await page.evaluate(sel => {
        const trList = Array.from($(sel).find('table tbody tr'));
        const ctn = trList.map(v => {
            const tdList = Array.from($(v).find('td'));
            return tdList.map(d => {
                return d.innerText;
            });
        });
        return ctn;
    }, BRANDS_INFO_SELECTOR);
    return brands
};

let employee = async (page) => {
    const BRANDS_INFO_SELECTOR = '.right_f_d_table';
    const brands = await page.evaluate(sel => {
        const trList = Array.from($(sel).find('table tbody tr'));
        const ctn = trList.map(v => {
            const tdList = Array.from($(v).find('td'));
            return tdList.map(d => {
                return d.innerText;
            });
        });
        return ctn;
    }, BRANDS_INFO_SELECTOR);
    return brands
};

//right_f_d_table mg_tone
let executives = async (page) => {
    const BRANDS_INFO_SELECTOR = '.right_f_d_table';
    const brands = await page.evaluate(sel => {
        const trList = Array.from($(sel).find('table tbody tr'));
        const ctn = trList.map(v => {
            const tdList = Array.from($(v).find('td'));
            return tdList.map(d => {
                return d.innerText;
            });
        });
        return ctn;
    }, BRANDS_INFO_SELECTOR);
    return brands
};

let equity = async (page) => {
    const BRANDS_INFO_SELECTOR = '.FengTabCon_0';
    const brands = await page.evaluate(sel => {
        const trList = Array.from($(sel).find('table tbody tr'));
        const ctn = trList.map(v => {
            const tdList = Array.from($(v).find('td'));
            return tdList.map(d => {
                return d.innerText;
            });
        });
        return ctn;
    }, BRANDS_INFO_SELECTOR);
    return brands
};


start().then(() => {
    console.log("over");
});