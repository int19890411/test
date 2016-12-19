var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var winston = require('./libs/winston');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//var passport = require('passport');
//var RedisStore = require('connect-redis')(session);
//var redisClient = require("redis").createClient();

var config = require('./config');
var index = require('./routes/index');

var models = require('./models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (config.get('NODE_ENV') === 'development') {
    app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*
 app.use(cookieParser());
 app.use(session({
 secret: 'keyboard cat',
 store: new RedisStore({
 host: 'localhost',
 client: redisClient,
 port: 6379,
 ttl: 300
 }),
 resave: false,
 saveUninitialized: false
 }));

 app.use(passport.initialize());
 app.use(passport.session());

 passport.use(models.admin.createStrategy());
 passport.serializeUser(models.admin.serializeUser());
 passport.deserializeUser(models.admin.deserializeUser());
 */

app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 1//209600000
}));

app.use("/", express.static(path.join(__dirname, '/node_modules/bootstrap/dist/'), {
    maxAge: 1209600000
}));

app.use('/api', index);
app.get("*", function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    winston.error(req.url + " " + err.message);

    res.status(err.status || 500);
    res.send({error: err.message});
});

module.exports = app;
