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
})

/*
* >>========================================>
* Landing Page Animation
* >>========================================>
*/

// Object Movement (Horizontal)

$.fn.objectMovement = function(options) {

	var settings = $.extend({
			speed: 100,
		}, options ),
		$parent = $(this),
		$object = $parent.find('> *'),
		objectWidth = $parent.find('> *').width(),
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

$('#wave-1').objectMovement({speed:70});
$('#wave-2').objectMovement({speed:40});

$('#wave-3').objectMovement({speed:100});
$('#wave-4').objectMovement({speed:150});

$('#bars-bg').objectMovement({speed:200});

// Dot Movement

var line1 = MorphSVGPlugin.pathDataToBezier('#wave-1 .motion-path');
TweenMax.to('#wave-1 .dot.one', 70, {bezier:{values:line1, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0);
TweenMax.to('#wave-1 .dot.two', 70, {bezier:{values:line1, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0.25);
TweenMax.to('#wave-1 .dot.three', 70, {bezier:{values:line1, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0.5);
TweenMax.to('#wave-1 .dot.four', 70, {bezier:{values:line1, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0.75);

var line2 = MorphSVGPlugin.pathDataToBezier('#wave-2 .motion-path');
TweenMax.to('#wave-2 .dot.one', 45, {bezier:{values:line2, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0);
TweenMax.to('#wave-2 .dot.two', 45, {bezier:{values:line2, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0.25);
TweenMax.to('#wave-2 .dot.three', 45, {bezier:{values:line2, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0.5);
TweenMax.to('#wave-2 .dot.four', 45, {bezier:{values:line2, type:'cubic'}, ease:Linear.easeNone, repeat:-1}).progress(0.75);

// Scrubber

$(window).on('resize', function(){
	TweenMax.fromTo('#scrubber', 50, {width:0}, {width:viewportWidth, ease:Linear.easeNone, repeat:-1});
}).trigger('resize')