# InsightService
A simple Node.JS server to to query Insight on the Scriptures -  A [Bible encyclopedia](https://wol.jw.org/en/wol/library/r1/lp-e/all-publications/insight) published by the Watch Tower Bible and Tract Society of Pennsylvania.
It caches the link of each reference in Redis and exposes it as a service.


### Pre-Requisites
* Instantiate your own redis cache [here](https://redis.com/)
* Create `.env` file that contains the following:
   * REDIS_HOST
   * REDIS_PORT
   * REDIS_PASSWORD  

### How To Run
* Clone the repo
* Ensure the `.env` file exists in the root directory
* `npm install  ` 
* Populate your redis cache by running `npm run migration`
* Run the server : `npm start`


### Interfaces
```
interface InsightRefByLink {
 name: string;
 link: string;
}
```

```
interface InsightReferenceContent {
 paragraphNumber: number;
 paragraphContent: string;
}
```

```
interface InsightReference {
  title: string;
  content: InsightReferenceContent[]
}

```

### Routes
* `/api/v1/allInsight` - `InsightRefByLink[]`
* `/api/v1/allInsightRefs` - `string[]`
* `/api/v1/insightContent?reference=david` - `InsightReference`
