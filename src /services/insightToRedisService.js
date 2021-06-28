const redisClient = require('./redisClient');
const insightScraper = require('./insightScraper');
const { flatInsight } = insightScraper;

const persistInsightToRedis = async() => {
   
    const allInsightRefs = await flatInsight()
    allInsightRefs.forEach(async insightRef => {
        const { name, link } = insightRef;
        const lowerName  = name.toLowerCase()
        await redisClient.setAsync(lowerName, link);
        console.log("successfully persisted", name)
    })
    return await getAllRedisKeys()
}

const getLinkForReference = async(reference) => {
    const link = await redisClient.getAsync(reference);
    console.log(`from redis for ${reference}`,link);
    return link;
}

/**
 * 
 * @returns Promise<string[]>
 */
const getAllRedisKeys = async() => {
   try {
       const keys =  await redisClient.keysAsync('*');
       console.log(keys)
       return keys;
   } catch(err) {
        console.log(err);
        return Promise.resolve([])
   }
  

}
module.exports = {
    getAllRedisKeys: getAllRedisKeys,
    persistInightToRedis: persistInsightToRedis,
    getLinkForReference: getLinkForReference
}