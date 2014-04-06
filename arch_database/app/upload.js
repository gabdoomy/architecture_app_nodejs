var fs    = require("fs");

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

module.exports = function(app) {

	app.post('/upload_file', function(req, res) {
    
    var file = "db/Projects_web.db";
    var exists = fs.existsSync(file);

    if(!exists) {
      console.log("Creating DB file. upload");
      fs.openSync(file, "w");
    }
    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(file);
    if(req.body.project_name=="") {
      res.writeHead(302, {
          'Location': '/message.html?status=projectfailname'
        });
        res.end();
        //console.log(error); 
    }
    else {
      if(getExtension(req.files.file.path)!=".png"&&getExtension(req.files.file.path)!=".jpg"&&getExtension(req.files.file.path)!=".jpeg"){
        console.log(getExtension(req.files.file.path));
        res.writeHead(302, {
          'Location': '/message.html?status=projectnotfound'
        });
        res.end();
      }
      else {
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
            var newPathModel="";
            if(req.body.project_category==1) {
              newPath= "./public/images/blueprints/blueprint_commercial_"+count+".png";
              newPathModel = "./public/models/commercial_model"+count+".js";
            }
            else if(req.body.project_category==2) {
              newPath= "./public/images/blueprints/blueprint_residential_"+count+".png";
              newPathModel = "./public/models/residential_model"+count+".js";
            }
            else if(req.body.project_category==3) {
              newPath= "./public/images/blueprints/blueprint_educational_"+count+".png";
              newPathModel = "./public/models/educational_model"+count+".js";
            }
            fs.writeFile(newPath, data, function (err) {
              if(err) {
                console.log("error");
                throw err;
                res.writeHead(302, {
                  'Location': '/message.html?status=projectfail'
                });
                res.end();
                console.log(error); 
              }
              //res.redirect("back");
            });
            if(getExtension(req.files.model.path)==".js"){
              fs.readFile(req.files.model.path, function (err, data2) {
                 fs.writeFile(newPathModel, data2, function (err) {
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
              });
            }
            else newPathModel ='no';
            var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            db.run("INSERT INTO Projects VALUES ('"+req.user.local.email+"', '"+datetime+"', '"+req.body.project_name+"','"+newPath+"', '"+req.body.project_category+"', '"+req.body.project_price+"', '"+req.body.contact+"', '"+req.body.project_info+"', '"+req.body.project_levels+"', '"+newPathModel+"')");
            res.writeHead(302, {
              'Location': '/message.html?status=projectsucces'
            });
            res.end();
          });
      	});
      }
    }
    //asynchronous callback PROBLEM
  });

};
