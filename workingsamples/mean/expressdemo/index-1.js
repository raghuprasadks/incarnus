var express = require('express');
var app = express();

// Get with /
app.get('/',function (req,res){
	console.log('Get Request');
	res.send('Getting Started with Express:');
});

// Get with /welcome
app.get('/welcome',function(req,res){
	console.log('welcome to Express');
	res.send('Welcome to Express');
});

// Get with id
app.get('/welcome/:id',function(req,res){
	var paramid = req.params.id;
	console.log(paramid);
	var message = 'your id is' +paramid; 
	res.send(message);
});

// Get with queryparameters
app.get('/welcomeparams',function(req,res){
	var query = req.query;
	console.log(query);
	var message = 'your details are :Name ' +query.name +' City :'+query.city; 
	res.send(message);
});

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Post

app.post('/',function (req,res){
	var data = req.body;
	console.log(data);
	res.send(data);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,function(err){
	if (err)
		console.log('error occured while starting server');
	console.log('Server started on ',PORT);
})