"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var metrics_1 = require("./metrics");
var bodyparser = require("body-parser");
var app = express();
var path = require('path');
var port = process.env.PORT || '1337';
var dbMet = new metrics_1.MetricsHandler('./db/metrics');
app.set('view engine', 'ejs');
app.set('views', __dirname + "/../view");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.get('/', function (req, res) {
    res.render('home.ejs');
});
app.get('/hello/:name', function (req, res) {
    res.render('hello.ejs', { name: req.params.name });
});
app.get('/metrics/', function (req, res) {
    dbMet.getAll(function (err, result) {
        if (err)
            throw err;
        res.status(200).json(result);
        res.end();
    });
});
app.get('/metrics/:id', function (req, res) {
    dbMet.getOne(req.params.id, function (err, result) {
        if (err)
            throw err;
        res.status(200).json(result);
        res.end();
    });
});
app.post('/metrics/:id', function (req, res) {
    dbMet.save(req.params.id, req.body, function (err) {
        if (err)
            throw err;
        res.status(200).send('ok');
    });
});
app.use(function (req, res) {
    res.status(404).send('Error 404');
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
