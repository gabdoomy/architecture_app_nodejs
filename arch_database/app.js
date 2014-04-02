/**
 * Module dependencies.
 */
var flash    = require('connect-flash');
var express = require('express');
var routes = require('./routes/routes');
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

var fs = require("fs");
var file = "db/projects.db";
var exists = fs.existsSync(file);

if(!exists) {
  console.log("Creating DB file.");
  fs.openSync(file, "w");
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
if(!exists) {
  db.run("CREATE TABLE Projects(Name varchar(50),URL varchar(100), Category int(1));");
  db.run("INSERT INTO Projects VALUES ('project_test1','url_test1','1');");
}
});

db.close();



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

require('./app/post.js')(app, passport);
require('./app/get.js')(routes, app);
require('./app/upload.js')(app, db);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
