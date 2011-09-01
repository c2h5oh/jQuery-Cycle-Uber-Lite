/**
 * jQLiteCycle - Lightweight jQuery cycle plugin
 * @version: 0.1 (2011/09/01)  
 * @author Maciej Lisiewski
 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
**/

(function($) {
	var opts = new Array;	
	var img = new Array;
	var links = new Array;
	var titles = new Array;		
	
	$.fn.jQLiteCycle = $.fn.jqlitecycle = function(options){
	
		init = function(el){
			opts[el.id] = $.extend({}, $.fn.jQLiteCycle.defaults, options);
			img[el.id] = new Array(); // array for images
			links[el.id] = new Array(); // array for image links
			titles[el.id] = new Array(); // array for link/image titles		
			imgInc[el.id] = 0;
			inc[el.id] = 0;
		}
		
		fetchImages = function(el){
			$.each($('#'+el.id+' img'), function(i,item){
				img[el.id][i] = $(item).attr('src');
				links[el.id][i] = $(item).next().attr('href');
				titles[el.id][i] = $(item).attr('alt') ? $(item).attr('alt') : '';
				$(item).hide();
			
				$('.ft-'+el.id).mouseover(function(){
					opts[el.id].pause = true;
				});
		
				$('.ft-'+el.id).mouseout(function(){
					opts[el.id].pause = false;
				});	
			
				$('#ft-title-'+el.id).mouseover(function(){
					opts[el.id].pause = true;
				});
		
				$('#ft-title-'+el.id).mouseout(function(){
					opts[el.id].pause = false;
				});
				clearInterval(imgInt[el.id]);	
				imgInt[el.id] = setInterval(function() { $.transition(el)  }, params.delay);				
			});
		}
		this.each (
			function(){ init(this); }
		);	
	}
	
	// default values
	$.fn.jQLiteCycle.defaults = {		
		delay: 5000, // delay between images in ms
		transitionSpeed: 300, // image transition speed in ms		
		navigation: false, // prev next and buttons
		links : false, // show images as links 		
		lazyLoad: false // html to be appended inside container to provide lazy loading of images beyons 1st one 
	};
	
})(jQuery);