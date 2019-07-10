var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// for parsingm application/json
app.use(bodyParser.json()); 
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/incarnusdemo');
var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});

console.log('inside mongoose db program');
var Person = mongoose.model("people", personSchema);
app.post('/people', function(req, res){
   console.log('req.body', req.body);
   var personInfo = req.body; //Get the parsed information
   console.log('req.body', req.body.name);
   if(!personInfo.name || !personInfo.age 
      || !personInfo.nationality){
      res.send("Sorry, you provided wrong info");
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });      
      newPerson.save(function(err, Person){
         if(err)
            res.send('save failed');
         else
            res.send('New person added '+Person);
      });     
}});
// view
app.get('/people', function(req, res){
   console.log('inside get method ');
   Person.find(function(err, response){
      res.json(response);
   });
});
// Update
app.put('/people/:id', function(req, res){
   console.log('inside update '+req.params.id);
   Person.findByIdAndUpdate(req.params.user_id, req.body, 
      function(err, response){
      if(err) res.json(
         {message: "Error in updating person with id " 
         + req.params.id});
      res.json(response);
   });
});
// delete
app.delete('/people/:id', function(req, res){
   Person.findByIdAndRemove(req.params.id, 
      function(err, response){
      if(err) res.json(
         {message: "Error in deleting record id " 
         + req.params.id});
      else res.json(
         {message: "Person with id " 
         + req.params.id + " removed."});
   });
});
app.listen(5000);