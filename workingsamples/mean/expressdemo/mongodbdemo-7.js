// Import the mongoose module
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/incarnusdemo';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', 
function (){
	console.log('MongoDB connection successful:');
});

// define schema

//Define a schema
var Schema = mongoose.Schema;

var athleteSchema = new Schema({
  name: String,
  age:Number,
  date: Date,
  sports: String,
});

// Compile model from schema
var AthleteModel = mongoose.model('athlete', athleteSchema );

// Create an instance of model SomeModel
var athlete1 = new AthleteModel({ name: 'ravi',age:30,date:Date.now(),sports:'tennis' });

// Save the new model instance, passing a callback
athlete1.save(function (err,data) {
  if (err) return handleError(err);
  // saved!
  console.log('data saved with save::#',data);
});

var athlete2 = new AthleteModel({ name: 'naveena',age:24,date:Date.now(),sports:'tennis' });

AthleteModel.create(athlete2, function (err, athlete2_instance) {
  if (err) return handleError(err);
  // saved!
  console.log('data saved with create: saved data',athlete2_instance);
});

// find all athletes who play tennis, selecting the 'name' and 'age' fields
AthleteModel.find({ 'sports': 'tennis' }, 'name age', function (err, athletes) {
  if (err) return handleError(err);
  // 'athletes' contains the list of athletes that match the criteria.
  console.log('list of athletes :',athletes);
})

console.log('second way of querying');

// find all athletes that play tennis
var query = AthleteModel.find({ 'sports': 'tennis' });

// selecting the 'name' and 'age' fields
query.select('name age');

// limit our results to 5 items
query.limit(3);

// sort by age
query.sort({ age: -1 });

// execute the query at a later time
query.exec(function (err, athletes) {
  if (err) return handleError(err);
  // athletes contains an ordered list of 3 athletes who play Tennis
  console.log('athletes second query :',athletes);
})

// another way of querying 
AthleteModel.
  find().
  where('sports').equals('tennis').
  where('age').gt(17).lt(50).  //Additional where query
  limit(5).
  sort({ age: -1 }).
  select('name age').
  exec(postExecute); // where callback is the name of our callback function.

  function postExecute(err,atheletes){
  	if (err)
  		throw err;
  	console.log('athletes selected :',atheletes);
  }