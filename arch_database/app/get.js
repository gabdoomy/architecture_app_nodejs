// app/routes.js
var url = require('url');
var fs = require('fs');
module.exports = function(routes, app) {

  app.get('/', routes.index);
  app.get('/redirect.html', routes.redirect);
  app.get('/home.html', showSignIn, routes.home);
  app.get('/about.html',showSignIn, routes.about);
  app.get('/commercial.html',isLoggedIn, routes.commercial);
  app.get('/educational.html',isLoggedIn, routes.educational);
  app.get('/residential.html',isLoggedIn, routes.residential);
  app.get('/faq.html', showSignIn, routes.faq);
  app.get('/gallery.html', routes.gallery);
  app.get('/parallaxing.html', routes.parallaxing);
  app.get('/model.html', routes.model);
  app.get('/report.html', routes.report);
  app.get('/resources.html', routes.resources);
  app.get('/upload.html',isLoggedIn, routes.upload);
  app.get('/profile', isLoggedIn, routes.profile);
  app.get('/login', routes.login);
  app.get('/signup', routes.signup);
  app.get('/logout', routes.logout);
  app.get('/feedback.html',isLoggedIn, routes.feedback);
  app.get('/message.html',isLoggedIn, message);
  app.get('/query',isLoggedIn, query);

  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      res.locals.login = req.isAuthenticated();
      return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/login');
  }

  function showSignIn(req, res, next){
    res.locals.login = req.isAuthenticated();
    next();
  }

  function message(req, res) {
    res.render('message.ejs', { user : req.user , status : req.param("status")});
  }
  
  function query(req, res) {
    
    var file = "db/Projects_web.db";
    var exists = fs.existsSync(file);

    if(!exists) {
      console.log("Creating DB file. get");
      fs.openSync(file, "w");
    } 
    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(file);
    var url_parts = url.parse(req.url,true);
    //console.log(url_parts.query);
    res.writeHead(200, {'Content-Type': 'application/json'});
    //res.writeHeader(200, {'Content-Type': 'text/html'});
    var firstItem=true;
    if(req.param("category")!="1"&&req.param("category")!="2"&&req.param("category")!="3"&&req.param("category")!="undefined") throw "SQL Injection attempted" +req.param("category");
    db.each("SELECT * FROM Projects WHERE Category= "+req.param("category")+";", function(err, row) {
      //res.json({ q_result: row.Name});
      res.write(firstItem ? (firstItem=false,'[') : ',');
      var user = row.User;
      if(user=='') user = 'N/A';
      var name = row.Name;
      if(name=='') name = 'N/A';
      var date = row.Date;
      if(date=='') date = 'N/A';
      var url = row.URL;
      if(url=='') url = 'N/A';
      var category = row.Category;
      if(category =='') category = 'N/A';
      var price = row.Price;
      if(price=='') price = 'N/A';
      var contact = row.Contact;
      if(contact=='') contact = 'N/A';
      var info = row.Info;
      if(info=='') info = 'N/A';
      var levels = row.Levels;
      if(levels=='') levels = 'N/A';
      res.write( JSON.stringify({ User: user, Name: name , Date: date, URL:url, Category:category, Price:price, Contact: contact, Info: info, Levels: levels, Model: row.Model}));
      //res.write("<h1>test</h1>");
      //console.log(JSON.stringify({ Name: row.Name }));
    }, function(){
        db.close();
        res.end(']');
    });
    //res.end('y]');
    //console.log(res);
    
  }
  
};
