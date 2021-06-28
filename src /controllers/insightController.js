const insightScraper = require('../services/insightScraper');
const insightToRedisService = require('../services/insightToRedisService');
const  { scrapeInsight, flatInsight, getInsightReferenceContent } = insightScraper;
const express = require('express');
const LOGGER = require('log4js').getLogger();
LOGGER.level = "debug";

const alphabetIndexForPaging = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

const getAllInsight = async (request, response) => {
    try {
        const allInsightReferences = await scrapeInsight();
        response.status(200).send(allInsightReferences)
    } catch (err) {
       LOGGER.error(err)
       response.status(500).send(err)
    }
}

const getFlatInsight = async(request, response) => {
    try {
        const allFlatInsight = await flatInsight();
        response.status(200).send(allFlatInsight);
    } catch(err) {
       LOGGER.error(err)
       response.status(500).send(err)
    }
}

/**
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
const getReferenceForInsightName = async(request, response) => {
     try {
        const reference = request.query.reference;
        const referenceLink = await insightToRedisService.getLinkForReference(reference);
        const foundReference = {
            name: reference,
            link: referenceLink
        }
        response.status(200).send(foundReference)
    } catch (err) {
       LOGGER.error(err)
       response.status(500).send(err)
    }
}

/**
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
const getAllInsightReferences = async(request, response) => {
 try {
        const allReferences = await insightToRedisService.getAllRedisKeys()
         response.status(200).send(allReferences)
    } catch(err) {
        console.log(err);
          response.status(500).send(err)
    }
}

const getInsightContent = async(request, response) => {
    try {
        const reference = request.query.reference;
        const referenceLink = await insightToRedisService.getLinkForReference(reference);
        const referenceContent = await getInsightReferenceContent(referenceLink);
        response.status(200).send(referenceContent);

    } catch(err) {
        response.status(400).send(err)
    }
}

const mySampleGET = ((req, res)=> {
    res.status(200).send("Hello there");
})

module.exports = {
    getAllInsight: getAllInsight,
    mySampleGET: mySampleGET,
    getReferenceForInsightName: getReferenceForInsightName,
    getFlatInsight: getFlatInsight,
    getAllInsightReferences: getAllInsightReferences,
    getInsightContent:getInsightContent
}