 function showImg(){
 	var pagename =document.location.href.match(/[^\/]+$/)[0].split(".")[0];

	var category = 4;
	if(pagename.localeCompare("commercial")==0) category=1;
	else if(pagename.localeCompare("residential")==0) category=2;
	else if(pagename.localeCompare("educational")==0) category=3;
	
	var im;
	$.getJSON("/query?category="+category, function( data ) {
		var i=0;
  	$.each(data, function(name, d_name){
			im = new String("./images/blueprints/blueprint_"+pagename+"_");
			var $proj=$( "<div class=\"panel panel-default\"></div>" );
			
			$proj.append(
				"<div class=\"panel-heading\"> Project "+d_name.Name+"</div>"
				+"<div class=\"panel-body\">"
					+"<div>"
						+"<div id =\"imageinsert"+i+"\">"
							+"<img id=\"zoom_"+i+"\" class= \"zoom project_info\" src=\""+im+i+".png\" data-zoom-image=\""+im+i+".png\"></img>"
						+"</div>"
						+"<div id=\"info_"+i+"\" class = \"project_info\"></div>"
					+"</div>"
					+"<hr/>"
					+"<div class =\"project_date\">Posted : "+d_name.Date+"</div>"
				+"</div>"
				);
		
			$proj.appendTo( "#projects" );

			var $price=$("<div id=\"price\">Price: &#163;"+d_name.Price+"</div><br/>");
			$price.appendTo( "#imageinsert"+i );
			
			var $image=$("");
			if(d_name.Model!="no") {
				$image=$("<a href=\"model.html?name="+pagename+"_model"+i+"\"><img id=\"button_3d\" src=\"./images/button_3d.png\" alt=\"\" name=\"name\" value=\"treehouse_logo\"/></a>");
			}
			$image.appendTo( "#imageinsert"+i );
			
			var $text=$("<div>Project Name: "+d_name.Name+"</div>"+
						"<div>Uploaded by: "+d_name.User+"</div>"+
						"<div>Levels: "+d_name.Levels+"</div>"+
						"<div>Contact info: "+d_name.Contact+"</div>"+
						"<div>Info project: "+d_name.Info+"</div>"
						);
			$text.appendTo( "#info_"+i );

			i=i+1;
			//console.log(i);
		});
	});
}

$( document ).ready(function() {
	showImg();
	var pagename =document.location.href.match(/[^\/]+$/)[0].split(".")[0];
	var category = 4;
	if(pagename.localeCompare("commercial")==0) category=1;
	else if(pagename.localeCompare("residential")==0) category=2;
	else if(pagename.localeCompare("educational")==0) category=3;

	$.getJSON("/query?category="+category, function( data ) {
		var i=0;
  	$.each(data, function(name, d_name){
			$("#zoom_"+i).elevateZoom({
			  zoomType				: "inner",
			  cursor: "crosshair"
			});
			i=i+1;
		});
  });

});