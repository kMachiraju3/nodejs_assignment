var express = require('express');
var bodyParser = require('body-parser');

var app = express(); 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}))

app.get('/', function(request, response) {
    response.render('index');
    //response.send('Hello World!');
});

app.post('/addToDo', function(req, res){
    res.send('hello');
});

app.post('/removeToDo', function(req, res) {
    res.send('world');
});

app.listen(3000, function(){
    console.log('App is running on port 3000!');
});