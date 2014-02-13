
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var Parse = require('parse').Parse;

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

// Define routes
app.get('/', routes.index(Parse));
app.get('/users/sign_up', user.signUp);
app.post('/users/do_sign_up', user.doSignUp(Parse));
app.get('/users/sign_in', user.signIn);
app.post('/users/do_sign_in', user.doSignIn(Parse));

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
