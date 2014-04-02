var fs    = require("fs")

module.exports = function(app, db) {

	app.post('/upload_file', function(req, res) {

  db.each("SELECT Name, URL, Category FROM Projects", function(err, row) {
    console.log("here");
    //console.log(row.Name, row.URL, row.Category);
  });

	fs.readFile(req.files.file.path, function (err, data) {
	  var newPath = "./public/images/blueprints/"+req.files.file.name;
	  fs.writeFile(newPath, data, function (err) {
	  	if(err) throw err;
	    res.redirect("back");
	  });
	});
	});

};
