/*jslint esversion: 6*/
/*jslint node: true */
"use strict";
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');

let hostname = '127.0.0.2';
let port = 3000;

let app = express();

//Middleware
// let noti = (req, res, next) => {
//     console.log("this is noti");
//     next();
// };
// app.use(noti);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set static path
app.use(express.static(path.join(__dirname,'client')));


app.get('/', (req, res) => {
  res.send('Hello, this is respons send form server');
});

app.listen(port,hostname, () => {console.log("server start on port 3000..");});

