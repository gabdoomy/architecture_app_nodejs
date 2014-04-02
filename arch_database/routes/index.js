
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.ejs', { title: 'Express' });
};

exports.home = function(req, res){
  res.render('home.ejs', { title: 'Express', user : req.user });
};

exports.about = function(req, res){
  res.render('about.ejs', { title: 'Express' });
};

exports.commercial = function(req, res){
  res.render('commercial.ejs', { title: 'Express' , user : req.user});
};

exports.educational = function(req, res){
  res.render('educational.ejs', { title: 'Express', user : req.user });
};

exports.residential = function(req, res){
  res.render('residential.ejs', { title: 'Express' , user : req.user});
};

exports.redirect = function(req, res){
  res.render('redirect.ejs', { title: 'Express' });
};

exports.faq = function(req, res){
  res.render('faq.ejs', { title: 'Express' });
};

exports.gallery = function(req, res){
  res.render('gallery.ejs', { title: 'Express' });
};

exports.parallaxing = function(req, res){
  res.render('parallaxing.ejs', { title: 'Express' });
};

exports.model = function(req, res){
  res.render('model.ejs', { title: 'Express', user : req.user });
};

exports.report = function(req, res){
  res.render('report.ejs', { title: 'Express' });
};

exports.resources = function(req, res){
  res.render('resources.ejs', { title: 'Express' });
};

exports.upload = function(req, res){
  res.render('upload.ejs', { title: 'Express' , user : req.user });
};

exports.profile = function(req, res) {
  res.render('profile.ejs', { user : req.user });
};

exports.login = function(req, res) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
};

exports.signup = function(req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/home.html');
};

