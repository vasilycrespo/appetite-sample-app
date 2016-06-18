var express = require('express');
var app = express();
var fs = require("fs");
var selectedEvents  = [];
var timer, counter = 0;
var bodyParser = require('body-parser')

app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/test', function (req, res) {
    res.end(JSON.stringify({"data": "sample"}));
});

app.listen(10010);