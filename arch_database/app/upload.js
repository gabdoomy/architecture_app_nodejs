var fs    = require("fs")

module.exports = function(app) {

	app.post('/upload_file', function(req, res) {
	fs.readFile(req.files.file.path, function (err, data) {
	  var newPath = "./public/images/blueprints/"+req.files.file.name;
	  fs.writeFile(newPath, data, function (err) {
	  	if(err) throw err;
	    res.redirect("back");
	  });
	});
	});

};
