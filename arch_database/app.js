
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

//app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

//app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.favicon(__dirname+'/public/favicon.ico'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/home.html', routes.home);
app.get('/redirect.html', routes.redirect);
app.get('/about.html', routes.about);
app.get('/commercial.html', routes.commercial);
app.get('/educational.html', routes.educational);
app.get('/residential.html', routes.residential);
app.get('/faq.html', routes.faq);
app.get('/gallery.html', routes.gallery);
app.get('/parallaxing.html', routes.parallaxing);
app.get('/model.html', routes.model);
app.get('/report.html', routes.report);
app.get('/resources.html', routes.resources);
app.get('/upload.html', routes.upload);

app.get('/users', user.list);





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
