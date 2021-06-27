const insightScraper = require('../services/insightScraper');
const express = require('express');
const LOGGER = require('log4js').getLogger();
LOGGER.level = "debug";

const alphabetIndexForPaging = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

const getAllInsight = async (request, response) => {
    try {
        const allInsightReferences = await insightScraper();
        response.status(200).send(allInsightReferences)
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
const getReferenceForInsightName = async(request, response) => {
     try {
        const reference = request.query.reference;
        const referencePage = alphabetIndexForPaging.indexOf(reference[0].toLowerCase())
        LOGGER.info(reference, referencePage)
        const allInsightReferences = await insightScraper();
        const desiredPage =  allInsightReferences[referencePage];
        const foundReference = desiredPage.filter(currentRef => {
            return currentRef.name.toLowerCase() == reference.toLocaleLowerCase()
        })
        response.status(200).send(foundReference)
    } catch (err) {
       LOGGER.error(err)
       response.status(500).send(err)
    }
}

const mySampleGET = ((req, res)=> {
    res.status(200).send("Hello there");
})

module.exports = {
    getAllInsight: getAllInsight,
    mySampleGET: mySampleGET,
    getReferenceForInsightName: getReferenceForInsightName
}