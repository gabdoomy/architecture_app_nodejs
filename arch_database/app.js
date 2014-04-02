
/**
 * Module dependencies.
 */
var flash    = require('connect-flash');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
//app.set('view engine', 'html');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// //authentification---------------------------------------------------------
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport);

app.configure(function() {

  // set up our express application
  //app.use(express.logger('dev')); // log every request to the console
  app.use(express.cookieParser('logincookie')); // read cookies (needed for auth)
  app.use(express.bodyParser()); // get information from html forms
  app.set('view engine', 'ejs'); // set up ejs for templating
  app.use(flash()); // use connect-flash for flash messages stored in session
  // required for passport
  app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions

  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(express.favicon(__dirname+'/public/favicon.ico'));
});
//end authentification-------------------------------------------------------

require('./app/routes.js')(app, passport);
app.get('/', routes.index);
app.get('/redirect.html', routes.redirect);
app.get('/home.html', showSignIn, routes.home);
app.get('/about.html', routes.about);
app.get('/commercial.html',isLoggedIn, routes.commercial);
app.get('/educational.html', routes.educational);
app.get('/residential.html', routes.residential);
app.get('/faq.html', routes.faq);
app.get('/gallery.html', routes.gallery);
app.get('/parallaxing.html', routes.parallaxing);
app.get('/model.html', routes.model);
app.get('/report.html', routes.report);
app.get('/resources.html', routes.resources);
app.get('/upload.html', routes.upload);
app.get('/profile', isLoggedIn, routes.profile);
app.get('/login', routes.login);
app.get('/signup', routes.signup);
app.get('/logout', routes.logout);

app.get('/users', user.list);

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) 
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/login');
}

function showSignIn(req, res, next){
  res.locals.login = req.isAuthenticated();
  next();
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
