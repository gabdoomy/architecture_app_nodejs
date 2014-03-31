function setStyle () {
	$("#header").hide();
	$("#header").fadeIn(1500);
	$("body").css("height",window.innerHeight);
	$("body").css("width",window.innerWidth);
	//$("#header").css("height","10%");
	$("#header").css("width","50%");
}

$( document ).ready(function() {
	window.onresize = setStyle;
	window.onload = setStyle;
	$("nav").hide();
	$("nav").fadeIn(2000);
	$("#left_image").hide();
	$("#left_image").show( 1000);
	$("#center_image").hide();
	$("#center_image").show( 1000);
	$("#right_image").hide();
	$("#right_image").show( 1000);
	$("#left_image").hover(
		function(){
			//$("#left_image").fadeOut(100);
			$("#left_image").attr("src","images/left_commercial_2.jpg");
			//$("#left_image").fadeIn(100);
		},
		function(){
			$("#left_image").attr("src","images/left_commercial.jpg");
			//$("#left_image").fadeIn(2000);
		});
	$("#center_image").hover(
		function(){
			$("#center_image").attr("src","images/center_residential_2.jpg");
		},
		function(){
			$("#center_image").attr("src","images/center_residential.jpg");
		});
	$("#right_image").hover(
		function(){
			$("#right_image").attr("src","images/right_educational_2.jpg");
		},
		function(){
			$("#right_image").attr("src","images/right_educational.jpg");
		});
	document.body.useMap="#link_map";

	$("#Q1_answer").hide();
	$("#Q2_answer").hide();
	$("#Q3_answer").hide();
	$("#Q1").click(function(){
  		$("#Q1_answer").toggle();
  		$("#Q2_answer").hide();
		$("#Q3_answer").hide();
	});
	$("#Q2").click(function(){
		$("#Q1_answer").hide();
  		$("#Q2_answer").toggle();
  		$("#Q3_answer").hide();
	});
	$("#Q3").click(function(){
		$("#Q1_answer").hide();
		$("#Q2_answer").hide();
  		$("#Q3_answer").toggle();
	});

	$("li a").hover(
		function () {
			$(this).fadeOut();
			$(this).fadeIn();
        }, 
        function () {}
     );

	//var img = document.getElementById('left_image'); 
	//var height = img.clientHeight;
	//console.log("h"+height);
	//$("#images").height( 100);//$("#left_image").height();
	
});