// app/routes.js
module.exports = function(app, passport) {

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home.html', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/home.html', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.post('/feedback', function(req, res) {
    console.log(req.body.feedback_email);
    console.log(req.body.feedback_comment);

    var nodemailer = require("nodemailer");

    var smtpTransport = nodemailer.createTransport("SMTP",{
       service: "Gmail",
       auth: {
           user: "webtechcw2@gmail.com",
           pass: "coursework"
       }
    });

    smtpTransport.sendMail({
       from: req.body.feedback_name+" <"+req.body.feedback_email+">", // sender address
       to: "admin <webtechcw2@gmail.com>", // comma separated list of receivers
       subject: req.body.feedback_subject, // Subject line
       text: req.body.feedback_comment // plaintext body
    }, function(error, response){
       if(error){
           console.log(error);
       }else{
           console.log("Message sent: " + response.message);
       }
      });

    smtpTransport.sendMail({
       to: req.body.feedback_name+" <"+req.body.feedback_email+">",
       from: "Webtech CW2 <ad1444@bristol.ac.uk>", 
       subject: "Feedback received - "+req.body.feedback_subject, // Subject line
       text: "Feedback received: \n\n\""+req.body.feedback_comment+"\"\n\nThank you!" // plaintext body
    }, function(error, response){
        if(error){
          res.writeHead(302, {
            'Location': '/message.html?status=fail'
          });
          res.end();
          console.log(error);
        } else {
            res.writeHead(302, {
             'Location': '/message.html?status=success'
            });
            res.end();
            console.log("Message sent: " + response.message);
          }
      });
  });
};
