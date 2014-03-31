
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

exports.faq = function(req, res){
  res.render('faq', { title: 'Express' });
};

exports.gallery = function(req, res){
  res.render('gallery', { title: 'Express' });
};

exports.parallaxing = function(req, res){
  res.render('parallaxing', { title: 'Express' });
};

exports.model = function(req, res){
  res.render('model', { title: 'Express' });
};

exports.report = function(req, res){
  res.render('report', { title: 'Express' });
};

exports.resources = function(req, res){
  res.render('resources', { title: 'Express' });
};

exports.upload = function(req, res){
  res.render('upload', { title: 'Express' });
};