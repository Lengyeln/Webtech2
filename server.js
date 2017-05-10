var fs = require("fs");
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());


app.get("/drinks", function(req,res){
       fs.readFile(__dirname+"/drinks.json","utf8",function(err,data){
       res.send(data);
       });
})

app.post('/addDrink', function(req,res) {
	var drinks = JSON.parse(fs.readFileSync(__dirname+"/drinks.json"));
	drinks.push(req.body);
	fs.writeFile(__dirname+"/drinks.json", JSON.stringify(drinks), function(err) {
		res.send(err);
	});
	
})

app.get('/deleteDrink', function(req,res) {
	if((req.query['name'] == undefined) || (req.query['name'] == null)) {
		res.send("asd");
		return;
	}
	else {
		var drinks = JSON.parse(fs.readFileSync(__dirname+"/drinks.json", "UTF8"));
		drinks=drinks.filter(function(drink) { return drink.name != req.query['name']});
		console.log(drinks);
		fs.writeFile(__dirname+"/drinks.json", JSON.stringify(drinks), function(err) {
			if(err != null){
				console.log(err);
			}
			return;
		});
		res.send();
	}
})
       

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})