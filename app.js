let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');
let config = require('./config/database');
let passport = require('passport');

let hostname = '127.0.0.1';
let port = process.env.PORT || 8080;

let app = express(); //init app
mongoose.connect(config.database);
let db = mongoose.connection;

//Check Conn
db.once('open', function () {
    console.log('connected to MongoDB at '+ config.database);
});

//Check DB
db.on('error', function (err) {
    console.log(err);
});

//Bring in models
// let Article = require('./models/article');
let users = require('./routes/users');

// let noti = (req, res, next) => {
//     console.log("this is noti");
//     next();
// };
// app.use(noti); //Middleware

app.use(cors());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Middleware for JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// //ejs view
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname,'client/views'));

//set URL for API in routes
app.use('/users', users);

//set static path
app.use(express.static(path.join(__dirname,'public')));

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// app.get('/', (req, res) => {
//   // res.send('Hello, this is response send form server');
//     // Article.find({}, function (err, articles) {
//     //     if(err){
//     //         console.log(err);
//     //     } else {
//     //         res.render('index', {
//     //             title: 'Article',
//     //             articles: articles
//     //         });
//     //         console.log(articles);}
//     // });
//   // res.render('index'); //render ejs
// }); //This is route handler, file name is index, can pass data as 2nd parameter

app.listen(port,hostname, () => {console.log("server start and listen on port "+port)});
