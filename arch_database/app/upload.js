var fs    = require("fs")

module.exports = function(app, db) {

	app.post('/upload_file', function(req, res) {

  //var result = db.run("SELECT Name, URL, Category FROM Projects");
  //console.log(result);

  // db.each("SELECT Name, URL, Category FROM Projects", function(err, row) {
  //     console.log(row.Name+" - "+row.URL+" - "+row.Category);
  // });

  //console.log(req.body.project_name);
  //console.log(req.body.project_price);
	fs.readFile(req.files.file.path, function (err, data) {
    
    db.get("SELECT COUNT(*) as count FROM Projects WHERE Category= "+req.body.project_category+";", function(err, row) {
      var count = parseInt(row.count);
        var newPath ="";
    if(req.body.project_category==1) newPath= "./public/images/blueprints/blueprint_commercial_"+count+".png";
    else if(req.body.project_category==2) newPath= "./public/images/blueprints/blueprint_residential_"+count+".png";
    else if(req.body.project_category==3) newPath= "./public/images/blueprints/blueprint_educational_"+count+".png";
    fs.writeFile(newPath, data, function (err) {
      if(err) throw err;
      res.redirect("back");
    });
    var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    db.run("INSERT INTO Projects VALUES ('"+req.user.local.email+"', '"+datetime+"', '"+req.body.project_name+"','"+newPath+"', '"+req.body.project_category+"', '"+req.body.project_price+"', '"+req.body.contact+"', '"+req.body.project_info+"', '"+req.body.project_levels+"')"); 
  
      
     });

    
    //var count = db.run("SELECT COUNT(*) FROM Projects WHERE Category= "+req.body.project_category+";");
    //console.log(count);
	});
	});

};
