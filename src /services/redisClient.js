const redis = require('redis');
const { promisifyAll } = require('bluebird');
promisifyAll(redis);

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

client.on('error', (err) => {
  console.log('Error ' + err);
});

module.exports = client;
