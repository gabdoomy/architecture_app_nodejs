$(document).ready(function(){
$("#parallaxing1").css("width",window.innerWidth);
$("#parallaxing2").css("width",window.innerWidth);

	$(window).bind('scroll',function(e){
   		parallaxScroll();
   	});
   	
   	
   	function parallaxScroll(){
   		var scrolledY = $(window).scrollTop();
		$('.bgWrapper').css('background-position','center -'+((scrolledY*0.2))+'px');
		$('.parallaxing1').css('top','-'+((scrolledY*0.8))+'px');
		$('.parallaxing2').css('top','-'+((scrolledY*0.8))+'px');
   	}

   	
});