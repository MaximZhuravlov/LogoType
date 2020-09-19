$(document).ready(function() {
	$(".slider-inner, .news-bottom-slider-inner").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		arrows: true,
		dots: false,
		nextArrow: '<button type="button" class="slick-button slick-next"></button>',
		prevArrow: '<button type="button" class="slick-button slick-prev"></button>'
	});

	$("select").styler();

	$(".btn-primary, .btn-secondary").magnificPopup({
		type: "inline",
		midClick: true,
		closeBtnInside: true,
		closeOnBgClick: true,
		fixedContentPos: true
	});

	$(".mobile-button").on("click", function() {
		$(".nav-list").slideToggle();
	});
});