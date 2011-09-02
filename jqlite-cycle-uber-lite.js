/**
 * jQLiteCycle - Lightweight jQuery cycle plugin
 * @version: 0.1 (2011/09/01)  
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
	var links = new Array;
	var titles = new Array;		
	
	$.fn.jQLiteCycle = $.fn.jqlitecycle = function(options){
	
		//initialize variables
		init = function(el){
			opts[el.id] = $.extend({}, $.fn.jQLiteCycle.defaults, options);
			img[el.id] = new Array(); // array for images
			links[el.id] = new Array(); // array for image links
			titles[el.id] = new Array(); // array for link/image titles			
			imgInc[el.id] = 0;
		}
		
		//append lazy loaded content, it's recommended to have at least 1 image loaded "normally" for purely aesthetic reasons 
		lazyLoad = function (el){
			if (opts.lazyLoad != false)
			$(el).append(opts.lazyLoad);
		}		
		
		$(el).wrap("<div class='jql' id='jql-"+el.id+"' />");	
		
		//fetch images, links, titles, set animation interval
		fetchImages = function(el){
			$.each($('#'+el.id+' img'), function(i,item){
				img[el.id][i] = $(item).attr('src');
				links[el.id][i] = $(item).next().attr('href');
				titles[el.id][i] = $(item).attr('alt') ? $(item).attr('alt') : '';
				
				$(item).hide();
			
				$('.jql-'+el.id).mouseover(function(){
					$('#jql-navigation-'+el.id).show();
				});
		
				$('.jql-'+el.id).mouseout(function(){
					$('#jql-navigation-'+el.id).hide();
				});				
			
				$('.jql-'+el.id).mouseover(function(){
					params[el.id].pause = true;
				});
			
				$('.jql-'+el.id).mouseout(function(){
					params[el.id].pause = false;
				});
				
				clearInterval(imgInt[el.id]);	
				imgInt[el.id] = setInterval(function() { $.transition(el)  }, params.delay);				
			});
		}
		
		this.each (
			function(){ init(this); }
		);	
		
		// navigation
		$.navigation = function(el){
			
			$(el).append("<div id='jql-navigation-"+el.id+"'></div>");
			$('#jql-navigation-'+el.id).hide();
			
			// create prev and next 
			$('#ql-navigation-'+el.id).append("<a href='#' id='jql-prev-"+el.id+"' class='jql-prev'>"+opts.next+"</a>");
			$('#ql-navigation-'+el.id).append("<a href='#' id='jql-next-"+el.id+"' class='jql-next'>"+opts.prev+"</a>");
		
			// bind prev and next actions
			$('#jql-prev-'+el.id).css({
				'position' 	: 'absolute',
				'top'		: params.height/2 - 15,
				'left'		: 0,
				'z-index' 	: 1001,
				'line-height': '30px',
				'opacity'	: 0.7
			}).click( function(e){
				e.preventDefault();
				$.transition(el,'prev');
				clearInterval(imgInt[el.id]);
				imgInt[el.id] = setInterval(function() { $.transition(el)  }, opts.delay);		
			});

			$('#jql-next-'+el.id).css({
				'position' 	: 'absolute',
				'top'		: params.height/2 - 15,
				'right'		: 0,
				'z-index' 	: 1001,
				'line-height': '30px',
				'opacity'	: 0.7
			}).click( function(e){
				e.preventDefault();
				$.transition(el,'next');
				clearInterval(imgInt[el.id]);
				imgInt[el.id] = setInterval(function() { $.transition(el)  }, opts.delay);
			});
		}
		
		// trigger transition animation
		$.transition = function(el,direction){

			if(opts[el.id].pause == true) return;			
		
			$('#'+el.id).css({ 'background-image': 'url('+img[el.id][imgInc[el.id]]+')' });
		
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
		};

	}
	
	// default values
	$.fn.jQLiteCycle.defaults = {		
		delay: 5000, // delay between images in ms
		transitionSpeed: 300, // image transition speed in ms		
		navigation: false, // prev next and buttons		
		prev: 'prev', // previous button text
		next: 'next', // next button text
		links : false, // show images as links 		
		lazyLoad: false // html to be appended inside container to provide lazy loading of images beyons 1st one 
	};
	
})(jQuery);