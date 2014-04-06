var fs = require("fs");
var file = "db/Projects_web.db";
var exists = fs.existsSync(file);

if(!exists) {
  console.log("Creating DB file. routes");
  fs.openSync(file, "w");
}
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
if(!exists) {
   //db.run("CREATE TABLE Persons(User varchar(20),Password varchar(20));");

  db.run("CREATE TABLE Projects(User varchar(50), Date datetime, Name varchar(50),URL varchar(100), Category int(1), Price int(10), Contact varchar(200), Info varchar(500), Levels int(5), Model varchar(100));");
  db.run("INSERT INTO Projects VALUES ('user1','2014-04-03 14:02:18','project_test1','url_test1','10', '450', 'contact1', 'info1', '100', 'no');");
}
});

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
  res.render('commercial.ejs', { title: 'Express' , user : req.user, database : db});
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

exports.feedback = function(req, res) {
  res.render('feedback.ejs', { user : req.user });
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/home.html');
};

