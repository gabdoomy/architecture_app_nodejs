// app/routes.js
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
  
};
