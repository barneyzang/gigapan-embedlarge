	

	var gigapanCarousel = {
			
		init: function(view) {
		
			this.view = view;
			this.carousel = view.find('#rs-carousel');
			this.initCarousel();
		},
		
		initCarousel: function() {

			var carousel = this.carousel;
			var opts = {};
			
			opts['autoScroll'] = false;
			opts['continuous'] = false;
			opts['easing'] = 'swing';
			opts['itemsPerPage'] = 'auto';
			opts['itemsPerTransition'] = 'auto';
			opts['nextPrevActions'] = false;
			opts['orientation'] = 'horizontal';
			opts['pagination'] = true;
			opts['speed'] = 'normal';
			opts['touch'] = false;
			opts['translate3d'] = false;
			
//			console.log(opts);
			carousel.carousel(opts);
	
		},
		
			
	};