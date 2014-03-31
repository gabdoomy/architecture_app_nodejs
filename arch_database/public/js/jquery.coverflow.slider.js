/*
 * jQuery Coverflow like Slider v0.1
 * http://www.fraser-hart.co.uk
 * http://blog.fraser-hart.co.uk
 *
 * Copyright 2013, Fraser Hart
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function($) {
    $.fn.coverFlow = function(options) {
    	//default settings
    	var settings = $.extend( {
    	  initialFocus : 0,
	      speed : 200,
	      addClasses : "",
	      afterChange: function afterChange(){} 
	    }, options);
	    
        var elems = this.find("ul").first().find("li");
        var allowSlide = true;
        this.addClass('coverFlow').wrap('<div class="coverFlowWrapper '+settings.addClasses+'" style="height: '+this.css('height')+'; width: '+this.css('width')+'; float: left; position: relative" />');
        var numberOfSlides = parseInt(elems.length),
			eachWidth = parseInt(elems.css("width").replace("px", "")),
			eachBorder = parseInt(elems.css("border-right-width"))+parseInt(elems.css("border-left-width")),
			eachMargin = parseInt(elems.css("margin-right"))+parseInt(elems.css("margin-left")),
            eachPadding = parseInt(elems.css("padding-right"))+parseInt(elems.css("padding-left")),
			totalItemWidth = eachWidth+eachMargin,
			totalWidth = totalItemWidth*numberOfSlides,
			elementToMove = $(this).find('ul'),
			initialFocusPos = -parseInt(settings.initialFocus * totalItemWidth)+(2*totalItemWidth);
		
		/**
		 * Show/hide the left/right nav based on the position
		 * @param  elementToMove //the element to move
		 */
		function showHideNav(elementToMove){
			var prevBtn = elementToMove.parent().parent().find('.coverFlowNav').not('.next'),
				nextBtn = elementToMove.parent().parent().find('.coverFlowNav.next');
			if (parseInt(elementToMove.css("margin-left").replace("px","")) >= totalItemWidth*2){
				prevBtn.hide();
			} else {
				prevBtn.show();
			};
			
			var overlap = totalWidth-elementToMove.parent().width()+(totalItemWidth*2);
			if (parseInt(elementToMove.css("margin-left").replace('px','')) <= -overlap){
				nextBtn.hide();
			} else {
				nextBtn.show();
			}
		}

		/**
		 * Animates the slider
		 * @param  animateTo //the the left-margin to animate to 
		 */
		function doAnimate(animateTo)
		{
			elementToMove.animate({
                    "margin-left": animateTo
            }, settings.speed, 'swing', function(){
                    showHideNav(elementToMove);
                    allowSlide = true;
                    settings.afterChange(elementToMove.find('li.selected').index());
            });
		}
		$(this).parent().prepend('<div class="coverFlowNav"></div><div class="coverFlowNav next"></div>');
		$(this).parent().find('ul').width(totalWidth).find('li:eq('+settings.initialFocus+')').addClass('selected');
		doAnimate(initialFocusPos);
		$(this).parent().on("click", ".coverFlowNav", function(){
            if (allowSlide == true){
                allowSlide = false;
                var direction = $(this).hasClass('next')?"-":"+";
                var elementToMove = $(this).parent().find('.coverFlow ul');
                
                //change the selected item
                if (direction == "+")
                {
                	$(this).parent().find('.coverFlow ul li.selected').removeClass('selected').prev().addClass('selected');	
                }
                else
                {
                	$(this).parent().find('.coverFlow ul li.selected').removeClass('selected').next().addClass('selected');
                }
                doAnimate(direction+"="+totalItemWidth);
            }
		});

		$(this).parent().on("click", "li", function(){
            if (allowSlide == true){
                allowSlide = false;
               
                $(this).parent().find('li.selected').removeClass('selected');	
                $(this).addClass('selected');
                newleftpos = -parseInt($(this).parent().children().index(this) * totalItemWidth)+(2*totalItemWidth);
                doAnimate(newleftpos);
            }
		});

		showHideNav($(this).find('ul'));
    };
})( jQuery );

