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

// MIDDLEWARE
////////////////////////////////////////

// Secure URL
function requireUser(req, res, next) {
  if (Parse.User.current()) {
    // Ok user is logged in, allow the next route to run
    console.log("requireUser() called, user present, go next()");
    next();
  } else {
    // No user found -> 403
    console.log("requireUser() called, no user present -> 403");
    res.render("errors/403")
  }
}

// Ensure the current user is the author of the requested activity
function isAuthor(req, res, next) {
  var activityId = req.params.id;
  // Get activity from Parse
  var Activity = Parse.Object.extend("Activity");
  var query = new Parse.Query(Activity);
  query.get(activityId).then(function(activity) {
    // Activity found, compare current user and author
    if (Parse.User.current().get("username") === activity.get("author")){
      next();
    }else{
      res.render("errors/403")
    }

  },function(object, error) {
    // Activity not found
    console.log("Unable to find this activity");
    res.redirect("/")
  });
}


// Error handlers
app.use(function(req, res, next){
  res.status(404);
  // respond with html page
  if (req.accepts('html')) {
    res.render('errors/404', { url: req.url });
    return;
  }
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('errors/500', { error: err });
});



// ROUTES
///////////////////////////////////////

// Errors
app.get('/404', function(req, res, next){
  // trigger a 404 since no other middleware will match /404 after this one
  next();
});

app.get('/403', function(req, res, next){
  // trigger a 403 error
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

app.get('/500', function(req, res, next){
  // trigger a generic (500) error
  next(new Error('keyboard cat!'));
});

// Root
app.get('/', routes.index(Parse));

// login / logout
app.get('/sign_up', users.signUp);
app.post('/do_sign_up', users.doSignUp(Parse));
app.get('/sign_in', users.signIn);
app.post('/do_sign_in', users.doSignIn(Parse));
app.get('/logout', users.doLogOut(Parse));

// Activities
app.get('/activities/create', requireUser, activities.create(Parse));
app.post('/activities/save', requireUser, activities.save(Parse));
app.get('/activities/:id', activities.show(Parse));
app.get('/activities/:id/edit', requireUser, isAuthor, activities.edit(Parse));
app.post('/activities/update', requireUser, activities.update(Parse));
app.get('/activities/:id/delete', requireUser, isAuthor, activities.destroy(Parse));


// Launch the server
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
