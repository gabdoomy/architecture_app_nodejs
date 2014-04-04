var fs    = require("fs");

module.exports = function(app) {

	app.post('/upload_file', function(req, res) {
    var file = "db/projects.db";
    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(file);
  	fs.readFile(req.files.file.path, function (err, data) {
      if(req.body.project_category!=1&&req.body.project_category!=2&&req.body.project_category!=3) throw "SQL Injection attempted category="+req.body.project_category;
      db.get("SELECT COUNT(*) as count FROM Projects WHERE Category= "+req.body.project_category+";", function(err, row) {
        if(err) {
          throw err;
          res.writeHead(302, {
            'Location': '/message.html?status=projectfail'
          });
           res.end();
          console.log(error); 
        }
        var count = parseInt(row.count);
        var newPath ="";
        if(req.body.project_category==1) newPath= "./public/images/blueprints/blueprint_commercial_"+count+".png";
        else if(req.body.project_category==2) newPath= "./public/images/blueprints/blueprint_residential_"+count+".png";
        else if(req.body.project_category==3) newPath= "./public/images/blueprints/blueprint_educational_"+count+".png";
        fs.writeFile(newPath, data, function (err) {
          if(err) {
            throw err;
            res.writeHead(302, {
              'Location': '/message.html?status=projectfail'
            });
            res.end();
            console.log(error); 
          }
          //res.redirect("back");
        });
        var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        db.run("INSERT INTO Projects VALUES ('"+req.user.local.email+"', '"+datetime+"', '"+req.body.project_name+"','"+newPath+"', '"+req.body.project_category+"', '"+req.body.project_price+"', '"+req.body.contact+"', '"+req.body.project_info+"', '"+req.body.project_levels+"')");
        res.writeHead(302, {
          'Location': '/message.html?status=projectsucces'
        });
        res.end();
      });
  	});
    //asynchronous callback PROBLEM
  });

};
