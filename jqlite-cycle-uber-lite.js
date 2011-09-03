/**
 * jQLiteCycle - Lightweight jQuery cycle plugin
 * @version: 1.0 (2011/09/02)  
 * @author Maciej Lisiewski
 * Some of the code was copied from or inspired by: jQuery Cycle Plugin by M. Alsup and jqFancyTransitions/coin slider by Ivan Lazarevic
 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
**/

(function($) {
	var opts = new Array;	
	var img = new Array;
	var imgInc = new Array;	
	var interval = new Array;		
	
	$.fn.jQLiteCycle = $.fn.jqlitecycle = function(options){
	
		//initialize variables
		init = function(el){
			opts[el.id] = $.extend({}, $.fn.jQLiteCycle.defaults, options);			
			img[el.id] = new Array(); // array for image links					
			imgInc[el.id] = 0;
			opts[el.id].width = $(el).width();
			opts[el.id].height = $(el).height();	
			
			//append lazy loaded content, it's recommended to have at least 1 image loaded "normally" for purely aesthetic reasons
			if (opts[el.id].lazyLoad != false)
			{
				$(el).append(opts[el.id].lazyLoad);
			}
			
			$(el).addClass('jql-'+el.id);
			
			//fetch images, links, titles, set animation interval		
			$.each($('#'+el.id+' img'), function(i,item){
				if ($(item).parent().is('a')){
					img[el.id][i] = $(item).parent();
					$(img[el.id][i]).css({						
						'display':'block',
						'position':'absolute'
					}).hide();
				}
				else
				{
					img[el.id][i] = $(item);
					$(img[el.id][i]).css({						
						'position':'absolute'
					}).hide();
				}				
				
				$(item).css({
					'width':opts[el.id].width,
					'height':opts[el.id].height
				});
			});			
			
			// reset opacity, show 1st element
			$(img[el.id][0]).css({'opacity':1}).show();				
			
			$.navigation(el);
			
			$('.jql-'+el.id).mouseover(function(){
				$('#jql-nav-'+el.id).show();
				opts[el.id].pause = true;
			});
		
			$('.jql-'+el.id).mouseout(function(){
				$('#jql-nav-'+el.id).hide();
				opts[el.id].pause = false;
			});			
				
			interval[el.id] = setInterval(function() { $.transition(el,'next')  }, opts[el.id].delay);					
		}		
						
		// navigation
		$.navigation = function(el){
			
			// create prev and next
			$(el).append("<div id='jql-nav-"+el.id+"'><a href='#' id='jql-prev-"+el.id+"' class='jql-prev'>"+opts[el.id].prev+"</a><a href='#' id='jql-next-"+el.id+"' class='jql-next'>"+opts[el.id].next+"</a></div>");
			$('#jql-nav-'+el.id).hide();
			var navH = parseInt(opts[el.id].height)/2 - 15;	
		
			// bind prev and next actions
			$('#jql-prev-'+el.id).css({
				'position' 	: 'relative',					
				'float'		: 'left',
				'z-index' 	: 1001,
				'line-height': '30px',
				'opacity'	: 0.7,
				'top'	: navH
			}).click( function(e){
				e.preventDefault();
				$.transition(el,'prev',1);						
			});

			$('#jql-next-'+el.id).css({
				'position' 	: 'relative',						
				'float'		: 'right',
				'z-index' 	: 1001,
				'line-height': '30px',
				'opacity'	: 0.7,
				'top': navH
			}).click( function(e){
				e.preventDefault();
				$.transition(el,'next',1);				
			});
		}
		
		// trigger transition animation
		$.transition = function(el,direction,force){

			if(opts[el.id].pause == true && force === undefined) return;			
		
			opts[el.id].pause = true;
			clearInterval(interval[el.id]);
		
			var current = imgInc[el.id];
		
			if(direction == 'next')
				imgInc[el.id]++;
			else			
				imgInc[el.id]--;			

			if  (imgInc[el.id] == img[el.id].length) {
				imgInc[el.id] = 0;
			}
					
			if (imgInc[el.id] == -1){
				imgInc[el.id] = img[el.id].length-1;
			}	
					
			$(img[el.id][imgInc[el.id]]).fadeIn(opts[el.id].transitionSpeed);
			$(img[el.id][current]).fadeOut(opts[el.id].transitionSpeed, function(){
				opts[el.id].pause = false;
				interval[el.id] = setInterval(function() { $.transition(el,'next')  }, opts[el.id].delay);
			});			
		}		
		
		this.each (
			function(){ init(this); }
		);			
	}
	
	// default values
	$.fn.jQLiteCycle.defaults = {		
		delay: 5000, // delay between images in ms
		transitionSpeed: 500, // image transition speed in ms		
		navigation: false, // prev next and buttons		
		prev: 'prev', // previous button text
		next: 'next', // next button text		 		
		lazyLoad: false // html to be appended inside container to provide lazy loading of images beyons 1st one 
	};
	
})(jQuery);