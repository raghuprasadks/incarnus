var express = require('express');
var router = express.Router();
router.get('/', function(req, res){
   res.send('GET route on things.');
});
router.post('/', function(req, res){
   res.send('POST route on things.');
});
router.get('/pattern/:id([0-9]{5})',
 function(req, res){
   res.send('id: ' + req.params.id);
});
//export this router to use in our index.js
module.exports = router;