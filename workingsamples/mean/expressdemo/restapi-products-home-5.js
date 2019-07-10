var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//app.use(bodyParser.json());
app.use(express.json());

//app.use(bodyParser.urlencoded({ extended: true }));

//Require the Router we defined in movies.js
var products = require('./restapi-products-5.js');
//Use the Router on the sub route /movies
app.use('/products', products);
app.listen(5000);
