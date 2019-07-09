var express = require('Express');
var app = express();
var router = require('./route-2.js');

console.log('route home');
//both index.js and router.js should be in same directory
//app.use('/', router);

app.use('/api', router);
app.listen(5000);