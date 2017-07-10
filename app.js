/*jslint esversion: 6*/
/*jslint node: true */
"use strict";
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');


let hostname = '127.0.0.2';
let port = 3000;

let app = express(); //init app
mongoose.connect('mongodb://localhost/test');
let db = mongoose.connection;

//Check Conn
db.once('open', function () {
    console.log('connected to MongoDB');
});

//Check DB
db.on('error', function (err) {
    console.log(err);
});

//Bring in models
let Article = require('./models/article');

// let noti = (req, res, next) => {
//     console.log("this is noti");
//     next();
// };
// app.use(noti); //Middleware

    let than = [{
        age: 21,
        lastName: 'Huynh'
    }, {
        age: 21,
        lastName: 'Huynh'
    }, {
        age: 21,
        lastName: 'Huynh'
    }];

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'client/views'));


//set static path
// app.use(express.static(path.join(__dirname,'client')));

app.get('/', (req, res) => {
  // res.send('Hello, this is response send form server');

    Article.find({}, function (err, articles) {
        if(err){
            console.log(err);
        } else {
            res.render('index', {
                title: 'Article',
                articles: articles
            });
            console.log(articles);
        }

    });

  // res.render('index'); //render ejs
}); //This is route handler, file name is index, can pass data as 2nd parameter

app.listen(port,hostname, () => {console.log("server start and listen on port 3000..");});

