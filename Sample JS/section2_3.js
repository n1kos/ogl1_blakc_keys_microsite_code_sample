var experienceInterval1;
var experienceInterval2;
var currentView = 0;


function experienceGalleryNext1() {
	var $active = $('#replaceImg1 img.active');
	if ( $active.length == 0 ) $active = $('#replaceImg1 img:last');
	var $next =  $active.next().length ? $active.next() : $('#replaceImg1 img:first');
	$active.addClass('lastActive');
	$next.css({opacity: 0.0})
		.addClass('active')
		.animate({opacity: 1.0}, 700, function() {
			$active.removeClass('active lastActive');
		});
}	
function experienceGalleryNext2() {
	var $active = $('#replaceImg2 img.active');
	if ( $active.length == 0 ) $active = $('#replaceImg2 img:last');
	var $next =  $active.next().length ? $active.next() : $('#replaceImg2 img:first');
	$active.addClass('lastActive');
	$next.css({opacity: 0.0})
		.addClass('active')
		.animate({opacity: 1.0}, 700, function() {
			$active.removeClass('active lastActive');
		});
}			

$( document ).ready(function() {

<!-- CUSTOM FACEBOOK CONNECT-->
$('#facebook-login').on('click', function() {
	/** Fire up the oAuth dialog **/
	FB.login(function(response) {
	   /** if the response has data **/
	   if(response.authResponse) {
		   FB.api('/me', function (user) {
			   $('#facebook-login').addClass('hidden');
			   $('p:eq(0)').text('Good to see you, '+ user.first_name);
		   });
	   /** response has no data, which indicates that the user cancelled the authorization, 
		** Note: skipping permission(s) won't cause this or lead to this,
		** you need to use FB.api('/me/permission') 
		** to check the requeired permission(s) **/
	   } else {
		   $('p:eq(0)').text('You cancelled login or did not fully authorize the app, try again');
	   }
	   /** put permissions you need in scope parameter in this schema: 
		** 'scope_1, scope_2, scope_3 ..etc' 
		** in this example the app won't request any extra permission rather than the
		** public_profile, so the scope is empty in our case **/
	}, { scope: '' });
});

/* HOVER EFFECTS - Section 2*/

$('#box3').hover(

	function(){
		var $gallery = $(this).find('#replaceImg1');
		$gallery.css('display','block');
		if($(this).width()<398){
			console.log("A "+$(this).width()+" "+$(this).height())
			$gallery.stop().animate({
				opacity:1,
				transform: 'scale(1,1)',
				width: "300%"
			},500, 'easeOutCubic');
			experienceInterval1 = window.setInterval(experienceGalleryNext1, 1000);
		} else if($(this).width()<600){
			console.log("B "+$(this).width()+" "+$(this).height())
			$gallery.stop().animate({
				opacity:1,
				transform: 'scale(1,1)',
				width: "150%"
			},500, 'easeOutCubic');
			experienceInterval1 = window.setInterval(experienceGalleryNext1, 1000);
		} else {
			$gallery.stop().animate({
				opacity:1,
				transform: 'scale(1,1)'
			},500, 'easeOutCubic');
			experienceInterval1 = window.setInterval(experienceGalleryNext1, 1000);
		}
	}, 
	function(){
		window.clearInterval(experienceInterval1);
		var $gallery = $(this).find('#replaceImg1');
		$gallery.stop().animate({
			opacity:0,
			transform: 'scale(1.5,1.5)',
			width:"100%"
		},500, 'easeOutCubic', function(){
			$(this).css('display','none');
			window.clearInterval(experienceInterval1);
		});
	});

$('#box2').hover(

	function(){
		var $gallery = $(this).find('#replaceImg2');
		if($(this).width()<300){
			console.log("a " +$(this).width()+" "+$(this).height())
			$gallery.stop().animate({
				opacity:1,
				transform: 'scale(1,1)',
				width: "300%"
			},500, 'easeOutCubic');
			experienceInterval1 = window.setInterval(experienceGalleryNext2, 1000);
		} else if($(this).width()<500){
			console.log("b "+$(this).width()+" "+$(this).height())
			$gallery.stop().animate({
				opacity:1,
				transform: 'scale(1,1)',
				width: "150%"
			},500, 'easeOutCubic');
			experienceInterval1 = window.setInterval(experienceGalleryNext2, 1000);
		} else {
			$gallery.stop().animate({
				opacity:1,
				transform: 'scale(1,1)'
			},500, 'easeOutCubic');
			experienceInterval2 = window.setInterval(experienceGalleryNext2, 1000);
		}
	}, 
	function(){
		window.clearInterval(experienceInterval2);
		var $gallery = $(this).find('#replaceImg2');
		$gallery.stop().animate({
			opacity:0,
			transform: 'scale(1.5,1.5)',
			width:"100%"
		},500, 'easeOutCubic', function(){
			window.clearInterval(experienceInterval2);
		});
	});
	
/* Gallery Init - Section 3 */
function calculateSwiperSlides(){
		var ww = $(window).width();
		var endResult = 0;
		if (ww>1300) {
			endResult = 12;
		} else if (ww>1000 && ww<=1300)  {
			endResult = 10;
		} else if (ww>800 && ww<=1000) {
			endResult = 8;
		} else if (ww>800 && ww<=1000){
			endResult = 6;
		} else if (ww>500 && ww<=800) {
			endResult = 5;
		} else if (ww>400 && ww<=500) {
			endResult = 3;
		} else if (ww>120 && ww<=320) {
			endResult = 2;
		} else if (ww<=120) {
			endResult = 1;
		}
		return endResult;
	}


	function getInternetExplorerVersion()
	{
		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer')
		{
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
		}
		else if (navigator.appName == 'Netscape')
		{
			var ua = navigator.userAgent;
			var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
		}
		//alert(rv);
		return rv;
	}

function onlyIE(){
	if (getInternetExplorerVersion() == 11){
		return false;
	} else {
		return true;
	}
}

var clicksPropagation = onlyIE();

var swiper = new Swiper('.swiper-container', {
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	speed: 300,
	slidesPerView: calculateSwiperSlides(),
	slidesPerColumn: 3,
	slidesPerColumnFill : "row",
	paginationClickable: clicksPropagation,
	preventClicks : clicksPropagation,
	preventClicksPropagation : false,
	spaceBetween: 0,
	loop: false,
	updateTranslate: true
	//onClick : function(swiper, event) {alert("dfd");}
});

	mySwiper = $('.swiper-container')[0].swiper;
	$(".swiper-button-next").on("click", function (evt){
		currentView += 10;
		mySwiper.slideTo(currentView);
	});


	$(".swiper-button-prev").on("click", function (evt){
		currentView -= 10;
		mySwiper.slideTo(currentView);

	});

	$(window).resize(function(){
		swiper.params.slidesPerView = calculateSwiperSlides();
		try {
			swiper.reInit();
		} catch(err) {}
	});
	$(window).trigger('resize');

	//swiper.onResize();
/*
;( function( $ ) {

	$( '.swipebox' ).swipebox( {
		useCSS : true, // false will force the use of jQuery for animations
		useSVG : true, // false to force the use of png for buttons
		initialIndexOnArray : 0, // which image index to init when a array is passed
		hideCloseButtonOnMobile : false, // true will hide the close button on mobile devices
		hideBarsDelay : 3000, // delay before hiding bars on desktop
		videoMaxWidth : 1140, // videos max width
		beforeOpen: function() {}, // called before opening
		afterOpen: null, // called after opening
		afterClose: function() {}, // called after closing
		loopAtEnd: false // true will return to the first image after the last image is reached
	} );

} )( jQuery );	
*/

/* PRINTING */
$(".boxLyr").find('.printLinkLyr').on('click', function() {
	//Print with default options
	/*var myPrintImg = $(this).parent().parent().find('.printImg');*/
	var myPrintImg = $(this).parent().parent().find('.printThisImg').find('img').get(0);
	$.print(myPrintImg);
});
	
function goFullscreen(element) {
	// These function will not exist in the browsers that don't support fullscreen mode yet, 
	// so we'll have to check to see if they're available before calling them.
	/*
	if (element.mozRequestFullScreen) {
	  // This is how to go into fullscren mode in Firefox
	  // Note the "moz" prefix, which is short for Mozilla.
	  element.mozRequestFullScreen();
	} else if (element.webkitRequestFullScreen) {
	  // This is how to go into fullscreen mode in Chrome and Safari
	  // Both of those browsers are based on the Webkit project, hence the same prefix.
	  element.webkitRequestFullScreen();
   }
   */
   if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen(); // Firefox
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen(); // Chrome and Safari
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen(); // IE
	}

}	

$(".boxLyr").find('.fullLinkLyr').on('click', function() {
	//Print with default options
	var myPrintImg = $(this).parent().parent().find('.printThisImg').find('img').get(0);
	goFullscreen(myPrintImg);
});  

$(".boxLyr").find('.printImg').on('click', function() {
	var myPrintImg = $(this).parent().find('.printThisImg').find('img').get(0);
	goFullscreen(myPrintImg);
}); 	
	
}); /* End of document Ready*/