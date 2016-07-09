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

	// Catalog search view more
	$('.catalog-head-list__opener').click(function() {
		var self = $(this);
		var listEl = $(this).parent('.catalog-head-list').find('.catalog-head-list__item');
		var moreBtnClose = $(this).hasClass('opened');
		var moreBtnTxt = $('.catalog-head-list__opener > span');

		self.toggleClass('opened');
		$(listEl).toggleClass('hidden_off');

		if (moreBtnClose == true) {
			moreBtnTxt.html('Показать всё');
		} else {
			moreBtnTxt.html('Скрыть');
		}

	});

	// Filter row change arrow
	$('.catalog-sort__sort a').click(function() {
		$('.dotted-element--arrow').toggleClass('up');
	});

	// Formstyler
	$('select').chosen({disable_search_threshold: 32});

	// UI Price
	$("#slider").slider({
		min: 0,
		max: 7000,
		values: [0,7000],
		range: true,
		stop: function(event, ui) {
			jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
			jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
	    },
	    slide: function(event, ui){
			jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
			jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
	    }
	});


	// Hide/show more fillter info
	$('.more-items-toggler').click(function() {
		$(this).closest('.filter-wrap').find('.hidden-filters').toggleClass('hidden');
	});

	// Hide/show more address
	$('.skill-more').click(function() {
		$(this).parent().find('.hidden-toggle').toggleClass('hidden');
		$(this).toggleClass('opened');

		var self = $(this);
		var openedLink = $(this).hasClass('opened');

		if (openedLink == true) {
			self.html('Скрыть');
		} else {
			self.html('Показать ещё');
		}

	});

	// Chose teacher
	$('.teacher-card-button .btn').click(function() {
		$(this).toggleClass('btn-green').find('span').toggleClass('ng-hide');
	});

	// Open/close more info teacher
	$('.teacher-card-info__links .dotted-element').click(function() {
		$(this).closest('.teacher-card-info__openable').toggleClass('closed');
		$(this).closest('.teacher-card-info__openable').toggleClass('opened');

		var thisWrap = $(this).closest('.teacher-card-info__openable').hasClass('closed');

		if (thisWrap == true) {
			$(this).html('Развернуть');
		} else {
			$(this).html('Свернуть');
		}

	});

	// Login form scripts
    $('input[name="UF_TYPE"][value="4"]').click();

    $('input[name=PHONE_AUTH]').on('click', function() {
    	
	    if ($(this).is(":checked")) {
	    	console.log('checked')
	    	$('input[name=LOGIN]').inputmask({"mask": "+9 (999) 999 99 99"});
	    } else {
	    	console.log('un-checked');
	    	$('input[name=LOGIN]').inputmask('remove');
	    };
    	
    });


    $('form[name=regform]').change(function () {
        var isTypeRepetitor = ($(this).find('input[name=UF_TYPE]:checked').val() == 5);
        if (isTypeRepetitor) $(this).find('.js-offert').show();
        if (!isTypeRepetitor) $(this).find('.js-offert').hide();
        var isTypeJur = ($(this).find('input[name=UF_TYPE]:checked').val() == 15);
        if (isTypeJur) {
            $(this).find('input[name*=NAME]').attr("placeholder", "Наименование").parent().find("span").html("Наименование");
        } else {
            $(this).find('input[name*=NAME]').attr("placeholder", "Имя").parent().find("span").html("Имя");
        }
    }).trigger('change');

    $('form[name=regform]').submit(function () {
        var isTypeRepetitor = ($(this).find('input[name=UF_TYPE]:checked').val() == 5);
        var isTypeStudent = ($(this).find('input[name=UF_TYPE]:checked').val() == 4);
        errors = [];
        if (!$(this).find('input[name=UF_REG_RULES]:checked').length) {
            errors.push("Вы должны согласится с условиями пользовательского соглашения");
        }
        if (errors.length) {
            $(this).find('div.alert-danger').remove();
            $(this).find('.alerts-area').after('<div class="alert alert-danger">' + errors.join('<br />') + '</div>');

            return false;
        }
        if (isTypeStudent) {
            if (window.yaCounter32946594)
                yaCounter32946594.reachGoal('STUDENT_REGISTERED');
            ga('send', 'event', 'STUDENT', 'REGISTERED');
        } else if(isTypeRepetitor) {
            if (window.yaCounter32946594)
                yaCounter32946594.reachGoal('reg_auth');
            ga('send', 'event', 'TEACHER', 'REG_AUTH');
        }
    });

    // Tooltips
	$('.i-icon--tooltip').tooltip({
		trigger: "hover"
	});

	// Input mask
	$('.tel').inputmask({"mask": "+9 (999) 999 99 99"});


});