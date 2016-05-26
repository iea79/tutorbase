$(document).ready(function() {

	function setHeiHeight() {
	    $('.full__height').css({
	        minHeight: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

    // Scroll to top
    var top_show = 800;
    var delay = 500;

    $(window).scroll(function () {
        if ($(this).scrollTop() > top_show) $('.go-to-up').fadeIn(500);
        else $('.go-to-up').fadeOut(500);
    });
    $('.go-to-up').click(function () {
        $('body, html').animate({
            scrollTop: 0
        }, delay);
    });


    // Drop top menu
    $('.header-dropdown-menu__wrap').on('click', function(event) {
    	event.preventDefault();
    	$(this).toggleClass('opened');
    	$(this).parent().find('.dropdown-menu').toggleClass('opened');
    });

    // Main slider news
    $('.owl-carousel').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1
	});

	// More buttun click
	$('.more').on('click', function(event) {
		event.preventDefault();
		var thisBtn = $(this);
		var activeBtn = $(this).hasClass('pushed');
		var labelBtn = $(this).find('.label');

		$(this).toggleClass('pushed');
		$(this).parent().find('.more-context').toggleClass('ng-hide');
		$(this).find('.dropdown-opener').toggleClass('active');

		if (activeBtn == true) {
			labelBtn.html('Показать')
		} else {
			labelBtn.html('Скрыть')
		}

	});

});