'use strict';

(function(){
$(function(){




	// FANCYBOX
	if( $("[data-fancybox='article-l-items']").length != 0 )
		$("[data-fancybox='article-l-items']").fancybox({
			afterShow : function( instance, current ) {
			},
			animationEffect : "fade",
			transitionEffect: "zoom-in-out"
		});

	//WOW
	new WOW({
		offset: 30
	}).init();


	// SKROLLR
	if( !isMobile ){

		var skr = skrollr.init({
			smoothScrolling: true,
			mobileDeceleration: 0.004
		});
		setTimeout( function(){ skr.refresh() }, 10 )
	}


  // Flikity Carousel
  	var arrowStyle = { 
		  x0: 10,
		  x1: 60, y1: 50,
		  x2: 70, y2: 40,
		  x3: 30
		}
  // PARTNERS
	var carouselPartners = $('.carousel-partners .carousel-content').flickity({
		autoPlay: 3000,
		arrowShape: arrowStyle,
		imagesLoaded: true,
		prevNextButtons: false,
		wrapAround: true,
		adaptiveHeight: true,
		//selectedAttraction: 0.2,
		//friction: 0.2,
		//rightToLeft: true,
		pageDots: false,
		//contain: true,
		percentPosition: true,
		cellAlign: 'center'
	});
	var carouselStock = $('.carousel-stock .carousel-content').flickity({
		//autoPlay: 2000,
		arrowShape: arrowStyle,
		imagesLoaded: true,
		//prevNextButtons: checkView(991),
		draggable: checkView(991),
		//wrapAround: true,
		adaptiveHeight: true,
		selectedAttraction: 0.01,
		friction: 0.15,
		//rightToLeft: true,
		//groupCells: 3,
		pageDots: false,
		initialIndex: 2,
		//contain: true,
		percentPosition: true,
		cellAlign: 'center'
	});

	carouselStock.on( 'select.flickity', function() {

	  $(this)	.find(".is-selected")
				  	.siblings()
				  	.removeClass("is-sel").end()
				  	.prev().addClass("is-sel").end()
				  	.next().addClass("is-sel");

	})

	if( $(".short-stock .flickity-prev-next-button") ){

		var farrows = $(".short-stock .flickity-prev-next-button");

		farrows.eq(0)
			.before("<div class='container'></div>")
			.siblings(".container")
			.append( farrows );

	}

	if( $('.catalog-article-content .carousel-main').length >= 0 ){

		var carouselMain = 		$('.catalog-article-content .carousel-main'),
				carouselNav = 		$('.catalog-article-content .carousel-nav');

		for( var i = 0 ; i < carouselMain.length ; i++ ){

			$(carouselMain).eq(i).flickity({
				imagesLoaded: true,
				prevNextButtons: false,
				cellAlign: 'center',
				friction: 1,
				selectedAttraction: 1,
				draggable: !(checkView(992)),
				contain: true,
				pageDots: false
			});

			$(carouselNav).eq(i).flickity({
				imagesLoaded: true,
			  asNavFor: $(carouselMain)[i],
			  prevNextButtons: true,
			  draggable: !false,
			  cellAlign: 'center',
			  adaptiveHeight: true,
			  contain: true,
			  pageDots: false
			});

		}
	}







	//FORM
	(function() {

		if (!String.prototype.trim) {
			(function() {
				// Make sure we trim BOM and NBSP
				var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
				String.prototype.trim = function() {
					return this.replace(rtrim, '');
				};
			})();
		}

		[].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {

			if( inputEl.value.trim() !== '' ) {
				classie.add( inputEl.parentNode, 'input--filled' );
			}

			// events:
			inputEl.addEventListener( 'focus', onInputFocus );
			inputEl.addEventListener( 'blur', onInputBlur );
		} );

		function onInputFocus( ev ) {
			classie.add( ev.target.parentNode, 'input--filled' );
		}

		function onInputBlur( ev ) {
			if( ev.target.value.trim() === '' ) {
				classie.remove( ev.target.parentNode, 'input--filled' );
			}
		}
	})();



	function onLoaded  (){
					
	//MASONRY
	if( $('.grid-img').length )
		$('.grid-img').masonry({
		  itemSelector: '.grid-img-item',
		  columnWidth: '.grid-img-sizer',
		  percentPosition: true
		});
	}


	if ( !$(".short-news-content").text().trim().length )
		if ( $(".search-not-found").length )
			$(".search-not-found").addClass("show");

	//RESIZE
	$( window ).on("resize", function(e){});

	//SCROLL
	var header_status = false;
	$( window ).on("scroll", function(e){

		if($(window).scrollTop() > 300 && header_status == false){

			header_status = true;

			if ( $(".min-menu") ) $(".min-menu").addClass("scrolled");

		}else if($(window).scrollTop() < 300 && header_status == true){

			header_status = false;
			if ( $(".min-menu") ) $(".min-menu").removeClass("scrolled");

		}

	});

	var images = 						 		document.images,
			imagesTotalCount = 			images.length,
			imagesLoadedCount = 		0,
			preloadPercent = 		 		$(".percent");

	for ( var i = 0; i < imagesTotalCount ; i++ ) {
		var image_clone = new Image();
				image_clone.onload = 		image_loaded;
				image_clone.onerror = 	image_loaded;
				image_clone.src = 			images[i].src;

	}

	function image_loaded (){
		imagesLoadedCount++;

		var per = ( ( 100 / imagesTotalCount ) * imagesLoadedCount ) << 0 ;

		setTimeout( function(){
			$(preloadPercent).text(  per +  "%"); 
		}, 1)

		//$("#pre-logo").css("opacity", per/100);

		imagesLoadedCount >= imagesTotalCount ? 

			setTimeout( function (){

				$(".preloader").fadeToggle();
				//$( "body" ).css("overflow-y", "auto");
				onLoaded();

			}, 300)

		: void(0);
	}

	//PAGES REV SLIDER
	if( $('.rev-slider-page') )
	    $('.rev-slider-page').revolution({
				delay:6000,
				startwidth: 1199,
				startheight: 500,
				autoHeight:"on",
				fullScreenAlignForce:"off",

					onHoverStop:"off",

					thumbWidth:100,
					thumbHeight:50,
					thumbAmount:3,

					hideThumbsOnMobile:"off",
					hideBulletsOnMobile:"on",
					hideArrowsOnMobile:"off",
					hideThumbsUnderResoluition:0,

					hideThumbs:-1,
					hideTimerBar:"on",

					keyboardNavigation:"off",

					navigationType:"bullet",
					navigationArrows:"small",
					navigationStyle:"round",

					navigationHAlign:"center",
					navigationVAlign:"bottom",
					navigationHOffset: 0,
					navigationVOffset:-30,

					soloArrowLeftHalign:"left",
					soloArrowLeftValign:"center",
					soloArrowLeftHOffset:20,
					soloArrowLeftVOffset:0,

					soloArrowRightHalign:"right",
					soloArrowRightValign:"center",
					soloArrowRightHOffset:20,
					soloArrowRightVOffset:0,


					touchenabled:"off",
					swipe_velocity:"0.7",
					swipe_max_touches:"1",
					swipe_min_touches:"1",
					drag_block_vertical:"false",

					stopAtSlide:-1,
					stopAfterLoops:-1,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					hideSliderAtLimit:0,

					fullWidth:"on",
					fullScreen:"off",
					fullScreenOffsetContainer: "",

					dottedOverlay:"none",
					forceFullWidth:"off",

		      shadow:0
	    });


	var dustContent = $( $("#dust-content") );
	//DUST MOUSEMOVE
	$("body").on("mousemove", function(e){
		if( dustContent.length != 0 )
			dustContent
				.css("left", (10 + (-e.pageX/100)))
				.css("bottom", (10 + (e.pageY/100)));
	});
	function dustCanvas(){

	  window.canvasDust = {
	  	circle: {
	  		elements : [],
	  		firstElPos: [],
	  		pos: []
	  	},
	  	stepCheck: function (posx, posy, radius){
	  		var arr = {
										x: posx,
										y: posy,
										radius: radius
									};

				canvasDust.circle.pos.push(arr);

				return arr;
	  	},
	  	circleAnimate : function ( canvasObj, x, y, i ){

				var tl = new TimelineMax({
					repeat: -1,
					yoyo: true
				});

				tl
					.to(canvasObj, getRandomIntFloat(3, 6), {
			      konva: canvasDust.stepCheck( getRandomInt( x, x+200 ), 
			      														 getRandomInt( y, y+100 ),
			      														 getRandomInt( 0, 2 ) )})
					.to(canvasObj, getRandomIntFloat(3, 6), {
			      konva: canvasDust.stepCheck( getRandomInt( x, x+200 ), 
			      														 getRandomInt( y, y+100 ),
			      														 getRandomInt( 1, 3 ) )})
					.to(canvasObj, getRandomIntFloat(3, 6), {
			      konva: canvasDust.stepCheck( getRandomInt( x, x+200 ), 
			      														 getRandomInt( y, y+100 ),
			      														 getRandomInt( 1, 2 ) )})
					.to(canvasObj, getRandomIntFloat(3, 6), {
			      konva: canvasDust.stepCheck( getRandomInt( x, x+200 ), 
			      														 getRandomInt( y, y+100 ),
			      														 getRandomInt( 1, 2 ) )})
					.to(canvasObj, getRandomIntFloat(3, 6), {
			      konva: canvasDust.stepCheck( getRandomInt( x, x+200 ), 
			      														 getRandomInt( y, y+100 ),
			      														 getRandomInt( 0, 3 ) )})

			}
	  }

		var width = window.innerWidth;
		var height = 450;

		var stage = new Konva.Stage({

			container: 'dust-content',
			width: width,
			height: height

		});

		var layer = new Konva.Layer();


		for ( var i = 0 ; i < 100 ; i++ ){

			var firstElPosX = getRandomInt( 0, width );
			var firstElPosY = getRandomInt( 0, height );

			canvasDust.circle.firstElPos[i] = {
				x: firstElPosX,
				y: firstElPosY
			}

			canvasDust.circle.elements[i] = new Konva.Circle({
				x: firstElPosX,
				y: firstElPosY,
				opacity: 0.3,
				radius: 1,
				fill: 'white',
				strokeWidth: 4
			});

			layer.add( canvasDust.circle.elements[i] );

			canvasDust.circleAnimate( canvasDust.circle.elements[i], firstElPosX, firstElPosY, i );
			
		}

		stage.add(layer);
	}
	if( dustContent.length != 0 && !isMac) dustCanvas();



	});
}) (jQuery);














var isWebkit = /Webkit/i.test(navigator.userAgent),
		isChrome = /Chrome/i.test(navigator.userAgent),
		isMac =  	 /Mac/i.test(navigator.userAgent),
		isMobile = !!("ontouchstart" in window),
		isAndroid = /Android/i.test(navigator.userAgent);










// COMMON FUNCTION

function checkView( width ){
	return ($( document ).width() > width);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function scrolledDiv(el) {
	try{
	  var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		elTop = $(el).offset().top,
		elBottom = elTop + $(el).height()/1.8;
	}catch(err){console.error();}

  	return ((elBottom <= docViewBottom) && (elTop >= docViewTop));
}









 aspectRatio: '1:0.666'





