const express = require('express');
const config = require('./config');
const api = require('./src/api');
const http = require('http');

const  app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', api(config));

http.createServer(app).listen(1501, function() {
    console.log('Express server listening on port ' + 1501);
}); 

module.exports = app;