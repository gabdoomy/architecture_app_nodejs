
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.home = function(req, res){
  res.render('home', { title: 'Express' });
};

exports.about = function(req, res){
  res.render('about', { title: 'Express' });
};

exports.commercial = function(req, res){
  res.render('commercial', { title: 'Express' });
};

exports.educational = function(req, res){
  res.render('educational', { title: 'Express' });
};

exports.residential = function(req, res){
  res.render('residential', { title: 'Express' });
};

exports.redirect = function(req, res){
  res.render('redirect', { title: 'Express' });
};