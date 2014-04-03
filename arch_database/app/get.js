// app/routes.js
url = require('url');
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
  app.get('/query', query);

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

  function query(req, res) {
    var file = "db/projects.db";
    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(file);
    var url_parts = url.parse(req.url,true);
    //console.log(url_parts.query);
    res.writeHead(200, {'Content-Type': 'application/json'});
    //res.writeHeader(200, {'Content-Type': 'text/html'});
    var firstItem=true;
    db.each("SELECT * FROM Projects WHERE Category= "+req.param("category")+";", function(err, row) {
      //res.json({ q_result: row.Name});
      res.write(firstItem ? (firstItem=false,'[') : ',');
      res.write( JSON.stringify({ Name: row.Name }));
      //res.write("<h1>test</h1>");
      console.log(JSON.stringify({ Name: row.Name }));
    }, function(){
        db.close();
        res.end(']');
    });
    //res.end('y]');
    //console.log(res);
    
  }
  
};
