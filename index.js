// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let express = require('express');
let bodyParser= require('body-parser');
let mongoose = require('mongoose');
const ToDo = require('./models/todomodel');
const Zip = require('./models/zipmodel')

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended : true}));
app.use(express.static('public'));


//Connection to Mongo
const mongoDB = 'mongodb+srv://admin:admin@cluster0.ri1fh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise= global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:  '));

var tasks = ['Wake up','Eat breakfast'];
var completed = [];

app.get('/', function(request, response){
   ToDo.find(function(err, todo){
       if(err){
           console.log(err);
       }else{
           tasks =[];
           completed =[];
           for(let i=0; i < todo.length; i++){
               if(todo[i].done){
                   completed.push(todo[i])
               }else{
                tasks.push(todo[i])
               }
           }
           response.render('index', {tasks:tasks, completed:completed});
       }
   })
    
})

app.post('/addToDo', function(req,res){
    let newTodo = new ToDo({
        item: req.body.newtodo,
        done: false
    })
    newTodo.save(function(err, todo){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    })
})

app.post('/removeToDo', function(req,res){
    const remove= req.body.check;
    if(typeof remove === 'string'){
        ToDo.updateOne({_id:remove},{done:true},function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        })
    }else if(typeof remove === 'object'){
        for(var i=0; i<remove.length; i++){
            ToDo.updateOne({_id:remove[1]},{done:true},function(err){
                if(err){
                    console.log(err);
                }
            })
        }res.redirect('/');
    }
})

app.post('/deleteToDo', function(req,res){
    const deleteTask= req.body.delete;
    if(typeof deleteTask === 'string'){
        ToDo.deleteOne({_id : deleteTask},function(err){
            if(err){
                console.log(err);
            }
            res.redirect('/');
        })
    }else if(typeof deleteTask === 'object'){
        for(var i=0; i<deleteTask.length; i++){
            ToDo.deleteOne({_id : deleteTask[i]},function(err){
                if(err){
                    console.log(err);
                }
            })
        }res.redirect('/');
    }
})

app.get('/zip', function(request, response){
    Zip.find(function(err, zip){
        if(err){
            console.log(err);
        }else{
            //var country = document.getElementById('country');
            //var zip = document.getElementById('zip');
            response.render('zip_code');
        }
    })
 })

 app.post('/zip', function(req,res){
    fetch('https://api.zippopotam.us',country,zip)
    .then(res => res.json())
    .then(data => {
        const country= req.body.country;
        const zip= req.body.zipcode;
        console.log(zip);
        res.redirect('/zip_code');
    });

 })

    
app.listen(3000, function(){
    console.log('App is running on port 3000');
})