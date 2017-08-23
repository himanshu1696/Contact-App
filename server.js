var express = require('express');//ismei hume http ka instance create krne ki jarurat nahi padi because express mei hota pehle ses
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']); //mongodb database, collection name

var bodyParser = require('body-parser'); // node.js ko kch nahi pata even parsing bhi nahi jo post request aa rahi hai usko parse kre ke lie body parse

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist',function(req, res){
	console.log('I receive a get request')

  db.contactlist.find(function(err, docs){
  	// console.log(docs);
  	res.json(docs);
  });

});

app.post('/contactlist', function(req, res) {
	console.log(req.body + "new");	
	db.contactlist.insert(req.body, function(err, docs){
		res.json(docs);
	});
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

app.put('/contactlist/:id', function(req, res){


	console.log(req.body.name);

	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)}, 
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new: true}, function (err, doc){
        	res.json(doc);
        });
	
});

app.listen(3000);

console.log("Server is running");