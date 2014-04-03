var fs    = require("fs")

module.exports = function(app, db) {

	app.post('/upload_file', function(req, res) {

  var result = db.run("SELECT Name, URL, Category FROM Projects");
  console.log(result);

   db.each("SELECT Name, URL, Category FROM Projects", function(err, row) {
      console.log(row.Name+" - "+row.URL+" - "+row.Category);
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
