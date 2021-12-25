
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

const abbreviationByFullName = {
  Ge: 'Genesis',
  Ex: 'Exodus',
  Le: 'Leviticus',
  Nu: 'Numbers',
  De: 'Deuteronomy',
  Jos: 'Joshua',
  Jg: 'Judges',
  Ru: 'Ruth',
  '1Sa': 'First Samuel',
  '2Sa': 'Second Samuel',
  '1Ki': 'First Kings',
  '2Ki': 'Second Kings',
  '1Ch': 'First Chronicles',
  '2Ch': 'Second Chronicles',
  Ezr: 'Ezra',
  Ne: 'Nehemiah',
  Es: 'Esther',
  Job: 'Job',
  Ps: 'Psalms',
  Pr: 'Proverbs',
  Ec: 'Ecclesiastes',
  Ca: 'Song of Solomon',
  Isa: 'Isaiah',
  Jer: 'Jeremiah',
  La: 'Lamentations',
  Eze: 'Ezekiel',
  Da: 'Daniel',
  Ho: 'Hosea',
  Joe: 'Joel',
  Am: 'Amos',
  Ob: 'Obadiah',
  Jon: 'Jonah',
  Mic: 'Micah',
  Na: 'Nahum',
  Hab: 'Habakkuk',
  Zep: 'Zephaniah',
  Hag: 'Haggai',
  Zec: 'Zechariah',
  Mal: 'Malachi',
  Mt: 'Matthew',
  Mr: 'Mark',
  Lu: 'Luke',
  Joh: 'John',
  Ac: 'Acts',
  Ro: 'Romans',
  '1Co': 'First Corinthians',
  '2Co': 'Second Corinthians',
  Ga: 'Galatians',
  Eph: 'Ephesians',
  Php: 'Philippians',
  Col: 'Colossians',
  '1Th': 'First Thessalonians',
  '2Th': 'Second Thessalonians',
  '1Ti': 'First Timothy',
  '2Ti': 'Second Timothy',
  Tit: 'Titus',
  Phm: 'Philemon',
  Heb: 'Hebrews',
  Jas: 'James',
  '1Pe': 'First Peter',
  '2Pe': 'Second Peter',
  '1Jo': 'First John',
  '2Jo': 'Second John',
  '3Jo': 'Third John',
  Jude: 'Jude',
  Re: 'Revelation',
};

/**
 * Replaces abbreviated Bible books with full names
 * Does not handle books preceeded with dash like —Mt 16:16;
 * @param {string[]} paragraph 
 * @return {string}
 */
const replaceAbbreviatedNameWithFullNameNaively = (paragraph) => {
  for (let j = 0; j < paragraph.length; j++) {
    const curr = paragraph[j];
    const cleaned = curr.replace('(', '');
    const potentialRef = abbreviationByFullName[cleaned];
    if (potentialRef) {
      paragraph[j] = potentialRef;
    }
  }
  const complete = paragraph.join(' ');
  return complete;
};

/**
 *
 * @param {InsightReference} insightReference
 * @return {InsightReference}
 */
const cleanInsightContent = (insightReference) => {
  const content = insightReference.content;
  for (let j = 0; j < content.length; j++) {
    let currentContent = content[j].paragraphContent;
    currentContent = replaceAbbreviatedNameWithFullNameNaively(currentContent.split(" "));
    content[j].paragraphContent = currentContent;
  }
  insightReference.content = content
  return insightReference;
};

module.exports = {
  cleanInsightContent: cleanInsightContent,
};