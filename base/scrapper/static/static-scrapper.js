// const CRAWL_URL = "https://search.naver.com/search.naver?query=%EC%BB%A4%ED%94%BC&oquery=%EC%BB%A4%ED%94%BC";
// const CRAWL_URL = "https://www.npmjs.com/package/cheerio";
import axios from "axios";
import fs from 'fs';
import * as cheerio from 'cheerio';

const saveDir = 'crawl_results';

async function crawl(crawlUrl) {
    console.log("crawl");
    const response = await axios.get(crawlUrl);
    const $ = cheerio.load(response.data);
    const title = $("title").text();
    const description = $("meta[name='description']").attr("content");
    const keywords = $("meta[name='keywords']").attr("content");
    const packageName = $("h1.heading-element").text();
    const packageDescription = $("h5.heading-element").text();
    const resp = {
        title: title,
        description: description,
        keywords: keywords,
        packageName: packageName,
        packageDescription: packageDescription
    }
    return {
        resp: resp
    }
}

function save(respJson = {}) {
    let fileName = `${respJson.resp.title}.json` || 'crawl_results.json';
    let fullPath = `${saveDir}/${fileName}`;
    fs.writeFile(fullPath, JSON.stringify(respJson, null, 2), (err) => {
        if (err) {
            console.error('Error saving package.json:', err);
        } else {
            console.log('package.json saved successfully');
        }
    });
}

async function sample() {
    const packages = [
        "cheerio",
        "lodash",
        "axios",
        "request",
        "superagent",
        "express",
        "koa",
        "next",
        "nuxt",
        "tailwindcss",
        "tailwindcss-plugin",
        "tailwindcss-config",
        "tailwindcss-config-js",
        "tailwindcss-config-ts",
        "tailwindcss-config-tsx",
        "tailwindcss-config-jsx",
        "bluebird"
    ];
    const npmJsUrlTemplate = "https://www.npmjs.com/package/{{packageName}}";
    
    for (const packageName of packages) {
        const crawlUrl = npmJsUrlTemplate.replace("{{packageName}}", packageName);
        const respJson = await StaticScrapper.crawl(crawlUrl);
        StaticScrapper.save(respJson);
    }
}

const StaticScrapper = {
    crawl: crawl,
    save: save,
    sample: sample
}

export default StaticScrapper;
