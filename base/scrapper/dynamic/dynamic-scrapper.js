import puppeteer from 'puppeteer';
import fs from 'fs';
// const CRAWL_URL = "https://search.naver.com/search.naver?ssc=tab.blog.all&sm=tab_jum&query=%EC%BB%A4%ED%94%BC";
const CRAWL_URL = "https://search.naver.com/search.naver?query=%EC%BB%A4%ED%94%BC";
const RESULT_DIR = "results";

// const CRAWL_URL = "https://map.naver.com/p/search/%EC%BB%A4%ED%94%BC/place/1906013465?placePath=/home?entry=pll&from=map&fromNxList=true&n_ad_group_type=10&n_query=%EC%BB%A4%ED%94%BC&fromPanelNum=2&timestamp=202508291141&locale=ko&svcName=map_pcv5&searchText=%EC%BB%A4%ED%94%BC&searchType=place&c=15.00,0,0,0,dh";

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const saveResults = (results) => {
    const resultDir = `${RESULT_DIR}/${new Date().toISOString()}.json`;
    fs.writeFileSync(resultDir, JSON.stringify(results, null, 2));
}

const getPlaceItems = async (page) => {
    const result = await page.evaluate(() => {
        // debugger;
        const items = document.querySelectorAll('.rdX0R .bSoi3');
        console.log(items);
        const result = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const url = item.querySelector("a").getAttribute("href");
            const name = item.querySelector('a .TYaxT').innerText;
            const category = item.querySelector('a .KCMnt').innerText;
            result.push({
                url,
                name,
                category
            });
        }
        return result;
    });
    // console.log(result);
    return result;
}

const calcIsNextPage = async (page) => {
    const isNextPage = await page.evaluate(() => {
        return document.querySelector('.cmm_pg_next').getAttribute('aria-disabled') === 'false';
    });
    return isNextPage;
}

const moveNextPage = async (page) => {
    await page.click('.cmm_pg_next');
    await wait(1000);
}

async function crawl() {
    const browser = await puppeteer.launch({ 
        headless: false,
        devtools: true 
    });
    try {
        const page = await browser.newPage();
        await page.goto(CRAWL_URL);
        // await page.waitForSelector('.iqAyT');
        await wait(2000);

        let results = [];

        // 플레이스 목록 가져오기
        const items = await getPlaceItems(page);
        results = results.concat(items);

        let isNextPage =  await calcIsNextPage(page);
        while (isNextPage) {
            await moveNextPage(page);
            const items = await getPlaceItems(page);
            console.log(items);
            isNextPage =  await calcIsNextPage(page);
            results = results.concat(items);
        }
        saveResults(results);

    } catch (error) {
        console.log(error);
    } finally {
        await browser.close(); 
    }
}

const DynamicScrapper = {
    crawl: crawl
}

export default DynamicScrapper;

