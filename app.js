/**
 * Module dependencies.
 */

var express = require('express');
var Parse = require('parse').Parse;

var http = require('http');
var path = require('path');

var routes = require('./routes');
var users = require('./routes/users');
var activities = require('./routes/activities');

var app = express();

// Init Parse.com
// Don't forget to set your environment variables (PARSE_WHOOZIN_APP_KEY, PARSE_WHOOZIN_SDK_KEY)
var PARSE_APP_KEY = process.env.PARSE_WHOOZIN_APP_KEY;
var PARSE_SDK_KEY = process.env.PARSE_WHOOZIN_SDK_KEY;

Parse.initialize(PARSE_APP_KEY, PARSE_SDK_KEY);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//
// Define routes
////////////////////////////////////////

// Root
app.get('/', routes.index(Parse));

// Users
app.get('/users/sign_up', users.signUp);
app.post('/users/do_sign_up', users.doSignUp(Parse));
app.get('/users/sign_in', users.signIn);
app.post('/users/do_sign_in', users.doSignIn(Parse));
app.get('/users/logout', users.doLogOut(Parse));

// Activities
app.get('/activities/create', activities.create(Parse));
app.post('/activities/save', activities.save(Parse));
app.get('/activities/:id', activities.show(Parse));


http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
