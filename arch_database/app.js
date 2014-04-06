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
var fs = require('fs');
var https = require('https');
// security SSL  -------------------------------------------------------------

// var opts = {
   
//   // Specify the key file for the server
//   key: fs.readFileSync('ssl/server/keys/server.key'),
   
//   // Specify the certificate file
//   cert: fs.readFileSync('ssl/server/certificates/client.crt'),
   
//   // Specify the Certificate Authority certificate
//   ca: fs.readFileSync('ssl/ca/ca.crt'),
   
//   // This is where the magic happens in Node.  All previous
//   // steps simply setup SSL (except the CA).  By requesting
//   // the client provide a certificate, we are essentially
//   // authenticating the user.
//   requestCert: true,
   
//   // If specified as "true", no unauthenticated traffic
//   // will make it to the route specified.
//   rejectUnauthorized: false,
//   passphrase: "password"
// };

var app = express();

//-----------------------------------------------------------------------------

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
//app.set('view engine', 'html');

// development only
app.configure('development', function(){
  app.use(express.errorHandler(
    { dumpExceptions: true, showStack: true })); 
});
 
app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// var fs = require("fs");
// var file = "db/Projects_web.db";
// var exists = fs.existsSync(file);

// if(!exists) {
//   console.log("Creating DB file.");
//   fs.openSync(file, "w");
// }

// var sqlite3 = require("sqlite3").verbose();
// var db = new sqlite3.Database(file);

// db.serialize(function() {
// if(!exists) {
//    //db.run("CREATE TABLE Persons(User varchar(20),Password varchar(20));");

//   db.run("CREATE TABLE Projects(User varchar(50), Date datetime, Name varchar(50),URL varchar(100), Category int(1), Price int(10), Contact varchar(200), Info varchar(500), Levels int(5), Model varchar(100));");
//   db.run("INSERT INTO Projects VALUES ('user1','2014-04-03 14:02:18','project_test1','url_test1','10', '450', 'contact1', 'info1', '100', 'no');");
// }
// });

//db.close();

//db.run("INSERT INTO Projects VALUES ('project_test2','url_test2','0');");
//db.run("INSERT INTO Projects VALUES ('project_test3','url_test3','2');");


// //authentification---------------------------------------------------------
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport);

app.configure(function() {

  app.use(express.static(path.join(__dirname, 'public')));
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

  app.use(express.favicon(__dirname+'/public/favicon.ico'));
});
//end authentification-------------------------------------------------------

require('./app/post.js')(app, passport);
require('./app/get.js')(routes, app);
require('./app/upload.js')(app);
app.get('/users', user.list);

// app.get('/test', function(req, res){
 
//   // AUTHORIZED 
//   if(req.client.authorized){
 
//     var subject = req.connection
//       .getPeerCertificate().subject;
     
//     // Render the authorized template, providing
//     // the user information found on the certificate
//     res.render('authorized', 
//       { title:        'Authorized!',
//      user:         subject.CN,
//      email:        subject.emailAddress,
//      organization: subject.O,
//      unit:         subject.OU,
//      location:     subject.L,
//      state:        subject.ST,
//      country:      subject.C
//    }); 
  
//   // NOT AUTHORIZED
//   } else {
  
//  // Render the unauthorized template.
//     res.render('unauthorized', 
//   { title: 'Unauthorized!' }); 
//   }
// });

// https.createServer(opts, function (req, res) {
//     if (req.client.authorized) {
//         res.writeHead(200, {"Content-Type": "application/json"});
//         res.end('{"status":"approved"}');
//     } else {
//         res.writeHead(401, v);
//         res.end('{"status":"denied"}');
//     }
// }).listen(443);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port')+ ' in '+app.settings.env);
});
