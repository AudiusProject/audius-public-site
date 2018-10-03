/**/

var viewportWidth;

$(window).on('load resize', function(){
	viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}).trigger('resize');

/*
* >>========================================>
* Window Load
* >>========================================>
*/

$(window).on('load', function(){
	$('body').addClass('page-loaded');
});

/*
* >>========================================>
* Tooltip
* >>========================================>
*/

$('.touchevents .tooltip').on('touchstart', function(){
	$(this).toggleClass('active');

	if($(this).hasClass('active')){
		$('.tooltip').not(this).removeClass('active')
	}
})

/*
* >>========================================>
* Mobile Menu
* >>========================================>
*/

$('#menu-button').on('click', function(){
	$('body').toggleClass('menu-active');
});

$('nav.menu li').on('click', '> span', function(){
	var $parent = $(this).parent();

	if($('html').hasClass('touchevents')){
		$parent.toggleClass('active');
	}

	if($(window).width() < 1020){
		var $menu = $parent.find('>ul'),
			menuHeight = 0;

		if($parent.hasClass('active')) {
			$menu.find('>li').each(function(){
				menuHeight += $(this).outerHeight(true);
			});
			menuOpen = true;
		}else{
			menuHeight = 0;
			menuOpen = false;
		}

		TweenMax.to($menu, .4, {height: menuHeight, ease:Power1.easeInOut});
	}
})

/*
* >>========================================>
* Smooth Scrolling
* >>========================================>
*/

// $('a[href*="#"]').on('click', function(e){
// 	e.preventDefault();
// 	var $destination = $($(this).attr('href')),
// 	offset = $('.main-header.clone').height() || 0;

// 	if($destination.length){
// 		TweenMax.to('html,body', .8, {scrollTop: $destination.offset().top - offset, ease:Power1.easeInOut});
// 	}
// });

/*
* >>========================================>
* Infinite Horizontal Movement
* >>========================================>
*/

$.fn.perpetualX = function(options) {

	var settings = $.extend({
			speed: 100,
		}, options ),
		$parent = $(this).addClass('infinite-movement'),
		$object = $parent.find('> *'),
		objectWidth = $object.width(),
		parentWidth = objectWidth * 4,
		$object1 = $object,
		$object2 = $object1.clone().appendTo($parent),
		$object3 = $object1.clone().appendTo($parent),
		$object4 = $object1.clone().appendTo($parent),
		speed = settings.speed;

	$parent.width(parentWidth);

	TweenMax.fromTo($object1, speed, {x:0}, {x:parentWidth, ease:Linear.easeNone, repeat:-1}).progress(0)
	TweenMax.fromTo($object2, speed, {x:0}, {x:parentWidth, ease:Linear.easeNone, repeat:-1}).progress(0.25)
	TweenMax.fromTo($object3, speed, {x:0}, {x:parentWidth, ease:Linear.easeNone, repeat:-1}).progress(0.5)
	TweenMax.fromTo($object4, speed, {x:0}, {x:parentWidth, ease:Linear.easeNone, repeat:-1}).progress(0.75)
};

/*
* >>========================================>
* Intro Animation
* >>========================================>
*/

if($('#intro').length) {

	$('#intro .wave-1').perpetualX({speed:70});
	$('#intro .wave-2').perpetualX({speed:40});
	$('#intro .wave-3').perpetualX({speed:100});
	$('#intro .wave-4').perpetualX({speed:150});
	$('#intro .bars-bg').perpetualX({speed:200});

	// Dot Movement

	var line1 = MorphSVGPlugin.pathDataToBezier('.wave-1 path');
	TweenMax.to('#intro .wave-1 .dot.one', 70, {bezier:{values:line1, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0);
	TweenMax.to('#intro .wave-1 .dot.two', 70, {bezier:{values:line1, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0.25);
	TweenMax.to('#intro .wave-1 .dot.three', 70, {bezier:{values:line1, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0.5);
	TweenMax.to('#intro .wave-1 .dot.four', 70, {bezier:{values:line1, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0.75);

	var line2 = MorphSVGPlugin.pathDataToBezier('.wave-2 path');
	TweenMax.to('#intro .wave-2 .dot.one', 45, {bezier:{values:line2, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0);
	TweenMax.to('#intro .wave-2 .dot.two', 45, {bezier:{values:line2, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0.25);
	TweenMax.to('#intro .wave-2 .dot.three', 45, {bezier:{values:line2, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0.5);
	TweenMax.to('#intro .wave-2 .dot.four', 45, {bezier:{values:line2, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0.75);

	// Scrubber

	$(window).on('resize', function(){
		TweenMax.fromTo('#intro .scrubber', 50, {width:0}, {width:viewportWidth, ease:Linear.easeNone, repeat:-1});
	}).trigger('resize');

}

/*
* >>========================================>
* Modals
* >>========================================>
*/

// Detect if modal has iframe

var iframeVideo = false,
	player;

$('.modal').each(function(){
	var $modal = $(this);
	if($modal.find('iframe').length){
		player = new Vimeo.Player($modal.find('iframe'));
		iframeVideo = true;
	}
});

// Open Modal

$('*[data-modal="person-modal"]').each(function(){
	if($(this).find('.bio').length && $(this).find('.bio').html() != '') {
		$(this).addClass('has-bio');
	}
})

$('*[data-modal]').on('click', function(){

	var modalID = $(this).data('modal');

	// Set up person bio

	if(modalID == 'person-modal') {
		if($(this).hasClass('has-bio')){
			$('#'+modalID).addClass('active');
			$('#person-modal').find('.person-link').attr('href', $(this).find('.person-link').attr('href'));
			$('#person-modal').find('.photo').attr('src', $(this).find('.photo').attr('src'));
			$('#person-modal').find('.name').html($(this).find('.name').html());
			if($(this).find('.title').length && $(this).find('.title').html() != '') {
				$('#person-modal').find('.title').css('display', 'inline-block').html($(this).find('.title').html());
			}else{
				$('#person-modal').find('.title').css('display', 'none');
			}
			$('#person-modal').find('.bio').css('display', 'block').html($(this).find('.bio').html());
			openModal();
		}
	}else{
		$('#'+modalID).addClass('active');
		openModal();
	}
});

function openModal(){
	$('body').addClass('modal-active');

	if(iframeVideo == true) {
		player.play();
	}
}

// Close Modal

$('.close-modal, .modal').on('click', function(){
	closeModal();
});

$('.modal .modal-frame').click(function(e){
	e.stopPropagation();
})

$(document).keyup(function(e) {
	if(e.keyCode === 27){
		if($('body').hasClass('modal-active')){
			closeModal();
		}
	}
});

function closeModal(){
	var modalID = $('.modal.active').attr('id');

	$('.modal').removeClass('active');
	$('body').removeClass('modal-active');
	
	if(iframeVideo == true) {
		player.pause();
	}

	setTimeout(function(){
		if(modalID == 'person-modal') {
			$('#person-modal').find('.photo').attr('src', ' ');
		}
	},300)
	
}

/*
* >>========================================>
* Sticky Navigation
* >>========================================>
*/

$(window).on('scroll load', function(){
	if($(window).scrollTop() > $(window).height()/2){
		if(!$('.main-header.clone').length){
			$('.main-header').clone(true,true).addClass('clone').appendTo('body');
			setTimeout(function(){
				$('body').addClass('sticky-menu');
			},10)
		}else{
			$('body').addClass('sticky-menu');
		}
	}else{
		$('body').removeClass('sticky-menu');
	}
});

/*
* >>========================================>
* Centered Feature Alignment
* >>========================================>
*/

$(window).on('resize load', function(){
	$('.feature').each(function(){
		var $feature = $(this),
			iconHeight = $feature.find('.icon').outerHeight(),
			textHeight = $feature.find('.description p').outerHeight();
		
		if(textHeight < iconHeight) {
			$feature.addClass('centered')
		}else {
			$feature.removeClass('centered')
		}
	});
});

/*
* >>========================================>
* Value: Distribution Animation
* >>========================================>
*/

if($('#value-distribution-animation').length) {
	function clockAndLock(element, duration, wait){
		var clockAnimation = new TimelineMax({repeat:-1, delay: wait});

		clockAnimation
			.fromTo(element, duration, {x:-50}, {x:577, ease:Linear.easeNone})
			.fromTo(element.find('.lock'), .4, {scale:0}, {scale:1, ease:Linear.easeNone}, duration * .55);
	}

	clockAndLock($('#value-distribution-animation .clock.one'), 8, 0);
	clockAndLock($('#value-distribution-animation .clock.two'), 12, 0);
	clockAndLock($('#value-distribution-animation .clock.three'), 9, 5);
	clockAndLock($('#value-distribution-animation .clock.four'), 9, 0);
	clockAndLock($('#value-distribution-animation .clock.five'), 4, 0);
	clockAndLock($('#value-distribution-animation .clock.six'), 6, 2);
};

/*
* >>========================================>
* Value: Attribution Animation
* >>========================================>
*/

function coinMove(element, duration, wait){
	var coinAnimation = new TimelineMax({repeat:-1, delay: wait});

	coinAnimation
		.fromTo(element, duration, {y:-38}, {y:577, ease:Linear.easeNone})
		.set(element, {className:"+=active"}, duration * .35);
}

coinMove($('#value-attribution-animation .coin.one'), 2, 0);
coinMove($('#value-attribution-animation .coin.two'), 3, 2);
coinMove($('#value-attribution-animation .coin.three'), 3.5, 4);

$('#value-attribution-animation .wave-1').perpetualX({speed:50});
$('#value-attribution-animation .wave-2').perpetualX({speed:20});
$('#value-attribution-animation .equalizer > span').perpetualX({speed:10});

/*
* >>========================================>
* Value: Monetization Animation
* >>========================================>
*/

function documentRight(element, wait){
	var documentAnimation = new TimelineMax({repeat:-1, delay: wait});

	documentAnimation.timeScale(1.5);

	documentAnimation
		.fromTo(element, 4, {x:528, y:34}, {x:270, y:34, ease:Power1.easeInOut})
		.to(element, 1.5, {y:210, ease:Power1.easeIn, onComplete: function(){
			$('.preexisting').addClass('active');
			$('.create').removeClass('active');
		}})
		.to(element, 2, {x:88, delay:1, ease:Power1.easeInOut})
		.to(element, 1.5, {y:367, ease:Power1.easeIn})
		.to(element, 2, {x:-62, ease:Power1.easeInOut})
}

documentRight($('#value-monetization-animation .document.one'), (11/4)*1);
documentRight($('#value-monetization-animation .document.two'), (11/4)*3);

function documentLeft(element, wait){
	var documentAnimation = new TimelineMax({repeat:-1, delay: wait});

	documentAnimation.timeScale(1.5);

	documentAnimation
		.fromTo(element, 4, {x:-62, y:34}, {x:210, y:34, ease:Power1.easeInOut})
		.to(element, 1.5, {y:210, ease:Power1.easeIn, onComplete:function(){
			$('.create').addClass('active');
			$('.preexisting').removeClass('active');
		}})
		.to(element, 2, {x:387, delay:1, ease:Power1.easeInOut})
		.to(element, 1.5, {y:367, ease:Power1.easeIn})
		.to(element, 2, {x:528, ease:Power1.easeInOut})
}

documentLeft($('#value-monetization-animation .document.three'), 0);
documentLeft($('#value-monetization-animation .document.four'), (11/4)*2);

/*
* >>========================================>
* Parallax Movement
* >>========================================>
*/

if($('*[data-parallax]').length) {

	$('*[data-parallax]').each(function(){
		var $object = $(this),
			objectTop = $object.offset().top,
			speed = $object.data('parallax') / 10,
			xPos = $object.data('parallax-x') || 0;

		$(window).on('scroll resize', function(){
			if($(window).width() > 1200){

				if(!$object.hasClass('parallaxed')){
					$object.addClass('parallaxed');
				}

				var scrollPos = $(window).scrollTop() + $(window).height();
				
				if(scrollPos > objectTop){
					$object.css('transform', 'translate(' + xPos + ', ' +  -((scrollPos - objectTop) * speed) + 'px)')
				}
			}else{
				if($object.hasClass('parallaxed')){
					$object.removeClass('parallaxed');
				}
			}
		});
	})
}

/*
* >>========================================>
* Token Loud Animation 1
* >>========================================>
*/

$('#token-loud-animation-1 .wave-1').perpetualX({speed:50});
$('#token-loud-animation-1 .wave-2').perpetualX({speed:20});

/*
* >>========================================>
* Token Loud Animation 2
* >>========================================>
*/

if($('#token-loud-animation-2').length) {
	$('#token-loud-animation-2 .wave-1').perpetualX({speed:30});
	$('#token-loud-animation-2 .wave-2').perpetualX({speed:10});

	var coinPath = MorphSVGPlugin.pathDataToBezier('#token-loud-animation-2 .coin-path.one path');
	TweenMax.to('#token-loud-animation-2 .coin.one', 2, {bezier:{values:coinPath, type:'cubic'}, ease:Linear.easeNone, repeat:-1})

	var coinPath2 = MorphSVGPlugin.pathDataToBezier('#token-loud-animation-2 .coin-path.two path');
	TweenMax.to('#token-loud-animation-2 .coin.two', 2.2, {bezier:{values:coinPath2, type:'cubic'}, ease:Linear.easeNone, repeat:-1})

	var coinPath3 = MorphSVGPlugin.pathDataToBezier('#token-loud-animation-2 .coin-path.three path');
	TweenMax.to('#token-loud-animation-2 .coin.three', 1.8, {bezier:{values:coinPath3, type:'cubic'}, ease:Linear.easeNone, repeat:-1})

	var coinPath4 = MorphSVGPlugin.pathDataToBezier('#token-loud-animation-2 .coin-path.four path');
	TweenMax.to('#token-loud-animation-2 .coin.four', 2.2, {bezier:{values:coinPath4, type:'cubic'}, ease:Linear.easeNone, repeat:-1})
}

/*
* >>========================================>
* Token Audius Animation 1
* >>========================================>
*/

if($('#token-audius-animation-1').length) {
	$('#token-audius-animation-1 .wave-1').perpetualX({speed:50});
	$('#token-audius-animation-1 .wave-2').perpetualX({speed:20});
}

/*
* >>========================================>
* Token Audius Animation 2
* >>========================================>
*/

$('#token-audius-animation-2 .wave-2').perpetualX({speed:10});
$('#token-audius-animation-2 .wave-1').perpetualX({speed:30});

/*
* >>========================================>
* Architecture Animation
* >>========================================>
*/

$('#architecture .waves-connection .wave-1').perpetualX({speed:30});
$('#architecture .waves-connection .wave-2').perpetualX({speed:10});

/*
* >>========================================>
* Architecture Animation 1
* >>========================================>
*/

$('#architecture-animation-1 .equalizer > span').perpetualX({speed:10});

/*
* >>========================================>
* Architecture Animation 4
* >>========================================>
*/

$('#architecture-animation-4 .wave-1').perpetualX({speed:10});
$('#architecture-animation-4 .wave-2').perpetualX({speed:20});

