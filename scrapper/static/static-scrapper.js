// const CRAWL_URL = "https://search.naver.com/search.naver?query=%EC%BB%A4%ED%94%BC&oquery=%EC%BB%A4%ED%94%BC";
const CRAWL_URL = "https://www.npmjs.com/package/cheerio";
import axios from "axios";
import fs from 'fs';
import * as cheerio from 'cheerio';

async function crawl() {
    console.log("crawl");
    const response = await axios.get(CRAWL_URL);
    const $ = cheerio.load(response.data);
    const title = $("title").text();
    const description = $("meta[name='description']").attr("content");
    const keywords = $("meta[name='keywords']").attr("content");
    const body = $("body").text();
    const packageName = $("h1.heading-element").text();
    const packageDescription = $("h5.heading-element").text();
    const resp = {
        title: title,
        description: description,
        keywords: keywords,
        body: body,
        packageName: packageName,
        packageDescription: packageDescription
    }
    return {
        resp: resp
    }
}

function save(respJson = {}) {
    let title = respJson.resp.title || 'crawl_results.json';
    fs.writeFile(title, JSON.stringify(respJson, null, 2), (err) => {
        if (err) {
            console.error('Error saving package.json:', err);
        } else {
            console.log('package.json saved successfully');
        }
    });
}

const StaticScrapper = {
    crawl: crawl,
    save: save,
}

export default StaticScrapper;
