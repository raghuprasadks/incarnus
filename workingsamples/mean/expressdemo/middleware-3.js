var express = require('express');
var app = express();
//Simple request time logger

app.use(function(req, res, next){
console.log("A new request received at " 
	+ Date.now());
  //This function call is very important. It tells that more processing is
   //required for the current request and is in the next middleware
 //  function/route handler.
   next();
});

app.get('/',function(req,res)
{
console.log('This is called after the  middleware');
res.send('After middleware');
});
//Middleware function to log request protocol only to /things
/*
app.use('/things', function(req, res, next){
   console.log("A request for things received at " + Date.now());
   next();
});
*/
// Route handler that sends the response
app.get('/things', function(req, res){
   console.log('/things received request')
   res.send('Things');
});
app.listen(5000);