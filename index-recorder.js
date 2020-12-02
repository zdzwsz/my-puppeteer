//testModel.js
const puppeteer = require('puppeteer');
const { record } = require('puppeteer-recorder');
let globalBrowser;
var width = 600;
var height = 500;
var options = {
    headless: true,
    args: [
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--single-process'
    ],
    //ignoreDefaultArgs: ["--enable-automation"]
    //executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
}
initPuppeteer();

async function initPuppeteer() {
    globalBrowser = await puppeteer.launch(options);
    testModelChangeVideo()
};
async function testModelChangeVideo() {
    try {
        const page = await globalBrowser.newPage();
        //page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
        //await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4298.0 Safari/537.36");
        //await page.setViewport({width: 1000, height: 1100});
        await record({
            ffmpeg: "ffmpeg",
            browser: globalBrowser,
            page: page,
            output: 'd:\\data\\output.webm', // 输出文件名称
            fps: 4, // 每秒多少帧 尽量小  
            frames: 50 * 4,  // 生成多少频视频 
            logEachFrame:true,
            prepare: async function (browser, page) {
                /* 生成视频前执行操作 */
                try {
                    await page.setViewport({width: width, height: height});
                    await page.goto('https://www.bilibili.com/video/BV1EK41137DU',{waitUntil: 'networkidle2'});
                    page.click('.bilibili-player-video-wrap');
                    //bilibili-player-video-wrap
                } catch (e) { }
            },
            render: async function (browser, page, frame) {
                /* 截取每一帧图片时运行 */
            },
        }).then(function () {
            console.log('finish');
            page.close();
            globalBrowser.close();
        })
       
    } catch (e) {
        console.log('ERROR ---------------------');
        console.log(e);
        page.close();
        globalBrowser.close();
    }
}

// const puppeteer = require('puppeteer');
// const Xvfb      = require('xvfb');
// var width       = 1280;
// var height      = 720;
// var xvfb        = new Xvfb({silent: true, xvfb_args: ["-screen", "0", `${width}x${height}x24`, "-ac"],});
// var options     = {
//   headless: false,
//   args: [
//     '--enable-usermedia-screen-capturing',
//     '--allow-http-screen-capture',
//     '--auto-select-desktop-capture-source=puppetcam',
//     '--load-extension=' + __dirname,
//     '--disable-extensions-except=' + __dirname,
//     '--disable-infobars',
//     `--window-size=${width},${height}`,
//   ],
// }

// async function main() {
//     xvfb.startSync()
//     var url = process.argv[2], exportname = process.argv[3]
//     if(!url){ url = 'http://tobiasahlin.com/spinkit/' }
//     if(!exportname){ exportname = 'spinner.webm' }
//     const browser = await puppeteer.launch(options)
//     const pages = await browser.pages()
//     const page = pages[0]
//     await page._client.send('Emulation.clearDeviceMetricsOverride')
//     await page.goto(url, {waitUntil: 'networkidle2'})
//     await page.setBypassCSP(true)

//     // Perform any actions that have to be captured in the exported video
//     await page.waitFor(8000)

//     await page.evaluate(filename=>{
//         window.postMessage({type: 'SET_EXPORT_PATH', filename: filename}, '*')
//         window.postMessage({type: 'REC_STOP'}, '*')
//     }, exportname)

//     // Wait for download of webm to complete
//     await page.waitForSelector('html.downloadComplete', {timeout: 0})
//     await browser.close()
//     xvfb.stopSync()
// }

// main()

//await page.evaluateOnNewDocument(() => { //在每个新页面打开前执行以下脚本
    // const newProto = navigator.__proto__;
    // delete newProto.webdriver;  //删除navigator.webdriver字段
    // navigator.__proto__ = newProto;
    // window.chrome = {};  //添加window.chrome字段，为增加真实性还需向内部填充一些值
    // window.chrome.app = { "InstallState": "hehe", "RunningState": "haha", "getDetails": "xixi", "getIsInstalled": "ohno" };
    // window.chrome.csi = function () { };
    // window.chrome.loadTimes = function () { };
    // window.chrome.runtime = function () { };
    // Object.defineProperty(navigator, 'userAgent', {  //userAgent在无头模式下有headless字样，所以需覆写
    //     get: () => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
    // });
    // Object.defineProperty(navigator, 'plugins', {  //伪装真实的插件信息
    //     get: () => [{
    //         "description": "Portable Document Format",
    //         "filename": "internal-pdf-viewer",
    //         "length": 1,
    //         "name": "Chrome PDF Plugin"
    //     }]
    // });
    // Object.defineProperty(navigator, 'languages', { //添加语言
    //     get: () => ["zh-CN", "zh", "en"],
    // });
    // const originalQuery = window.navigator.permissions.query; //notification伪装
    // window.navigator.permissions.query = (parameters) => (
    //     parameters.name === 'notifications' ?
    //         Promise.resolve({ state: Notification.permission }) :
    //         originalQuery(parameters)
    // )
//});
