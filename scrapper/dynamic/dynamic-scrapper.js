import puppeteer from 'puppeteer';
// const CRAWL_URL = "https://search.naver.com/search.naver?ssc=tab.blog.all&sm=tab_jum&query=%EC%BB%A4%ED%94%BC";
const CRAWL_URL = "https://search.naver.com/search.naver?query=%EC%BB%A4%ED%94%BC";

// const CRAWL_URL = "https://map.naver.com/p/search/%EC%BB%A4%ED%94%BC/place/1906013465?placePath=/home?entry=pll&from=map&fromNxList=true&n_ad_group_type=10&n_query=%EC%BB%A4%ED%94%BC&fromPanelNum=2&timestamp=202508291141&locale=ko&svcName=map_pcv5&searchText=%EC%BB%A4%ED%94%BC&searchType=place&c=15.00,0,0,0,dh";

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function crawl() {
    console.log("crawl");
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(CRAWL_URL);
    // await page.waitForSelector('.iqAyT');
    await wait(5000);
    
    // const content = await page.evaluate(() => {
    //     const contents = document.querySelectorAll(".title_area");
    //     return contents[0].innerText;
    // });
    // console.log(content);

    const mainPack = await page.evaluate(() => {
        return document.querySelector('#main_pack').innerText;
    });
    console.log(mainPack);
    // const content = await page.content();

    // console.log(content);
    await browser.close(); 
}

const DynamicScrapper = {
    crawl: crawl
}

export default DynamicScrapper;

