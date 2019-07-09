var express = require('express');
var app = express();
// Get method with / http://localhost:5000
app.get('/',function(req,res){
	console.log('received request for /');
	res.send('I am learning Express');
});
// Get method with welcome http://localhost:5000/welcome
app.get('/welcome',function(req,res){
	console.log('received request for /welcome');
	res.send('Welcome to Express');
});
// Get method with welcome and id http://localhost:5000/welcome/393
app.get('/welcome/:id',function(req,res){
	console.log('received request for /welcome/id');
	var paramid = req.params.id;

	res.send(paramid);
});
// Get with queryparameters http://localhost:5000/welcomeparams?name=raghu&city=chennai
app.get('/welcomeparams',function(req,res){
	var query = req.query;
	console.log(query);
	var message = 'your details are :Name ' +query.name +' City :'+query.city; 
	res.send(message);
});

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Post
app.post('/',function (req,res){
	var data = req.body;
	console.log(data);
	console.log('name :',data.name);
	console.log('mobile :',data.mobile);
	console.log('city :',data.city);
	res.send(data);
});

app.listen(5000,function(){
	console.log('server started');
})