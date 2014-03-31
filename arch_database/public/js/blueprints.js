 function showImg(){
 	var pagename =document.location.href.match(/[^\/]+$/)[0].split(".")[0];
	var images =new Array();
	images[0]=0;
	images[1]=1;
	
	var im;
	for(var i=0;i<images.length;i++){
		im = new String("./images/blueprints/blueprint_"+pagename+"_");
		var $proj=$( "<div class=\"panel panel-default\"></div>" );
		
		$proj.append(
			"<div class=\"panel-heading\"> Project "+(images[i]+1)+"</div>"
			+"<div class=\"panel-body\">"
				+"<div>"
					+"<div id =\"imageinsert"+images[i]+"\">"
						+"<img id=\"zoom_"+images[i]+"\" class= \"zoom project_info\" src=\""+im+"small_"+images[i]+".png\" data-zoom-image=\""+im+images[i]+".png\"></img>"
					+"</div>"
					+"<div id=\"info_"+images[i]+"\" class = \"project_info\"></div>"
				+"</div>"
				+"<hr/>"
				+"<div class =\"project_date\">Posted : 17 July 2014 13:04</div>"
			+"</div>"
			);
	
		$proj.appendTo( "#projects" );
	}
	for(var i=0;i<images.length;i++){
		var $price=$("<div id=\"price\">Price: &#163;"+(images[i]+100)+"</div><br/>");
		$price.appendTo( "#imageinsert"+images[i] );
		
		var $image=$("<a href=\"model.html?name="+pagename+"_model"+images[i]+"\"><img id=\"button_3d\" src=\"./images/button_3d.png\" alt=\"\" name=\"name\" value=\"treehouse_logo\"/></a>");
		$image.appendTo( "#imageinsert"+images[i] );
		
		var $text=$("<div>Project: Info project "+images[i]+"</div>"+
					"<div>Uploaded by: Info uploader "+images[i]+"</div>"+
					"<div>Levels: Levels info project "+images[i]+"</div>"+
					"<div>Contact info: To be completed - info "+images[i]+"</div>"+
					"<div>Info project: project "+images[i]+"</div>"
					);
		$text.appendTo( "#info_"+images[i] );
	}
}

$( document ).ready(function() {
	showImg();

	$("#zoom_0").elevateZoom({
	  zoomType				: "inner",
	  cursor: "crosshair"
	});

	$("#zoom_1").elevateZoom({
	  zoomType				: "inner",
	  cursor: "crosshair"
	});

});