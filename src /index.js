const express = require('express');
const server = require('http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const LOGGER = require('log4js').getLogger();
const routes = require('./routes/v1/routes');
LOGGER.level = "debug";
const port = 3007 

app.use(bodyParser.json({limit: '50mb'}));
app.use('/api/v1', routes);

app.use(cors());

app.get('/', (req, res)=>{
    res.send("yooo");
})

app.get('/hello', (req, res)=>{
    res.send("hi");
})

// app.use('api/v1', routes);

const httpServer = server.createServer(app);
const listener = httpServer.listen(port, (err) => {
    if (err) {
        LOGGER.error(err);
    }
    LOGGER.info(`Server started on ${port}`);
})

module.exports = app;
