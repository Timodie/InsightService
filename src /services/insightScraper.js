
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios');
const LOGGER = require('log4js').getLogger();

async function fetchData(url) {
    const response = await axios(url).catch((err) => console.log(err));
    
    if(response.status !== 200){
        LOGGER.error("Error occurred while fetching data");
        return response
    }
    return response;

}

const buildNameToLinkObject = ( domSelector, rootUrl) => {
    const nameToLinkObjectList = [];
    for ( let i = 0; i < domSelector.length; i++) {
        const name = domSelector[i].text.trim();
        const link = `${rootUrl}${domSelector[i].href}`;
        nameToLinkObjectList.push({
            name, 
            link
        })
    }
    return nameToLinkObjectList;
}

function genCharArray(charA, charZ) {
    let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

// TODO: Check to see if this is any different with other languages
const scrapeInsight = async () => {
    const rootUrl = 'https://wol.jw.org'
    const baseUrl = `${rootUrl}/en/wol/library/r1/lp-e/all-publications/insight/`;
    const alphabet = genCharArray('a', 'z');
    const allNamesAndLinks = alphabet.map(async letter => {
        const a_insight = `${baseUrl}${letter}`;
        const a_res = await fetchData(a_insight);
        const a_html = a_res.data;
        const dom = new JSDOM(a_html);
        const selector = dom.window.document.querySelectorAll('li.row.card a');
        return buildNameToLinkObject(selector, rootUrl)
    })
    return Promise.all(allNamesAndLinks).then(resolvedList => {
        const lastPage = resolvedList[resolvedList.length - 1];
        const lastItem = lastPage[lastPage.length - 1]
        return resolvedList;
    })
   
}

module.exports = scrapeInsight