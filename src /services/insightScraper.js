const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios');
const LOGGER = require('log4js').getLogger();

/**
 * @typedef {Object} InsightReferenceContent
 * @property {number} paragraphNumber
 * @property {string} paragraphContent
 */

/**
 * @typedef {Object} InsightReference
 * @property {string} title
 * @property {Array<InsightReferenceContent>} content
 */

/**
 *
 * @param {string} url
 * @return {Object}
 */
async function fetchData(url) {
  const response = await axios(url).catch((err) => console.log(err));

  if (response.status !== 200) {
    LOGGER.error('Error occurred while fetching data');
    return response;
  }
  return response;
}

const buildNameToLinkObject = (domSelector, rootUrl) => {
  const nameToLinkObjectList = [];
  for (let i = 0; i < domSelector.length; i++) {
    const name = domSelector[i].text.trim();
    const link = `${rootUrl}${domSelector[i].href}`;
    nameToLinkObjectList.push({
      name,
      link,
    });
  }
  return nameToLinkObjectList;
};

/**
 *
 * @param { NodeListOf<Element>} contentSelector
 * @return {InsightReference}
 */
const buildInsightReference = (contentSelector) => {
  const insightReference = {
    title: contentSelector[0].textContent,
    content: [],
  };
  for (let i = 1; i < contentSelector.length; i++) {
    const currentContent = contentSelector[i];
    const contentText = currentContent.textContent;
    if (contentText)
      insightReference.content.push({
        paragraphNumber: i,
        paragraphContent: contentText,
      });
  }
  return insightReference;
};

/**
 *
 * @param {string} charA
 * @param {string} charZ
 * @return {string[]}
 */
function genCharArray(charA, charZ) {
  let a = [];
  let i = charA.charCodeAt(0);
  let j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
}

// TODO: Check to see if this is any different with other languages.
// TODO: The selector below should be dynamic
/**
 *
 * @return {Promise<[[]]>}
 */
const scrapeInsight = async () => {
  const rootUrl = 'https://wol.jw.org';
  const baseUrl = `${rootUrl}/en/wol/library/r1/lp-e/all-publications/insight/`;
  const alphabet = genCharArray('a', 'z');
  const allNamesAndLinks = alphabet.map(async (letter) => {
    const insightUrl = `${baseUrl}${letter}`;
    const response = await fetchData(insightUrl);
    const insightHtml = response.data;
    const dom = new JSDOM(insightHtml);
    const selector = dom.window.document.querySelectorAll('li.row.card a');
    return buildNameToLinkObject(selector, rootUrl);
  });
  return Promise.all(allNamesAndLinks).then((resolvedList) => {
    return resolvedList;
  });
};

const scrapeInsightReference = async (referenceURL) => {
  try {
    const referenceRequest = await fetchData(referenceURL);
    const referenceHTML = referenceRequest.data;
    const referenceDOM = new JSDOM(referenceHTML);
    const contentSelector =
      referenceDOM.window.document.querySelectorAll('[data-pid]');
    const insightReference = buildInsightReference(contentSelector);
    return insightReference;
  } catch (err) {
    LOGGER.error(err);
    return 'Error fetching content';
  }
};
const flatInsight = async () => {
  const insightReferenceByPages = await scrapeInsight();
  return insightReferenceByPages.flat();
};

module.exports = {
  scrapeInsight: scrapeInsight,
  flatInsight: flatInsight,
  getInsightReferenceContent: scrapeInsightReference,
};
