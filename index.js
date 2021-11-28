var express = require('express');
var bodyParser = require('body-parser');

var app = express(); 
app.use(bodyParser.urlencoded({extended : true}))

app.get('/', function(request, response) {
    response.send('Hello World!');
});

app.listen(3000, function(){
    console.log('App is running on port 3000!');
});