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
    // var top_show = 800;
    // var delay = 500;

    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > top_show) $('.go-to-up').fadeIn(500);
    //     else $('.go-to-up').fadeOut(500);
    // });
    // $('.go-to-up').click(function () {
    //     $('body, html').animate({
    //         scrollTop: 0
    //     }, delay);
    // });


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
	$('.catalog-filter select').chosen({disable_search_threshold: 32});
	$('.double-select select').chosen();
	// $('.sided-holder__right select').select2();

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



// LK js ========================================================================================================================
var filterItemTemplate =
  "<div class='active-fliters__item'>" +
  "<span>{{name}}</span>" +
  "<span class='active-fliters__item-delete'></span>" +
  "</div>";

var LkDataForms = function () {
  var self = this;
  this.init = function () {
    self.SyncFilters.run();
    self.PlacesChoise.run();
    self.PreventRepetitorForm.run();
    self.DataTabsBlocks.run();
    self.TabsSelectSync.run();
    self.FormMultiple.run();
    self.ToggleLkFiltersList.run();
    self.Expr.run();
    self.AutocompleteUniver.run();
    self.ReloadForm.run();

    $(document).on('multi_field::add', function () {
      self.FormMultiple.run();
    });
  }
};

LkDataForms.prototype.ReloadForm = {
  run: function () {
    var callback = function () {
      $('option').removeAttr('disabled');
      var data = $('[data-js-repetitor-form]').serialize();
      data += '&CHANGE_CITY=Y';
      $.pjax({
        url: window.location.href,
        data: data,
        container: '[data-js-repetitor-form]',
        type: 'POST',
        timeout: 2000,
        scrollTo: false
      }).done(function () {
        $('.select2, .select2-delay').select2();
        var lkForm = new LkDataForms();
        lkForm.init();
        TinyMce.run();
      });
    };

    $(document).on('change', '[data-js-city]', callback);
  }
};

LkDataForms.prototype.AutocompleteUniver = {
  run: function () {
    $('.js-find-univer').autocomplete({
      source: window.location.pathname + '?find_univer=Y',
      minLength: 2,
      select: function (event, ui) {
        $(this).siblings('input[name*=UNIVER_ID]').val(ui.item.id);
      },
      change: function (event, ui) {
        $(this).siblings('input[name*=UNIVER_ID]').val(ui.item ? ui.item.id : '');
      }
    });
  }
};

LkDataForms.prototype.Expr = {
  run: function () {
    var exprList = $('[data-select-blocks-list]').data('js-expr-list');
    // var exprList = BX.parseJSON($('[data-select-blocks-list]').data('js-expr-list'));
    var subjectChange = function () {
      var specId = $(this).find('option:selected').attr('data-spec-id') || 0;
      var container = $(this).parents('[data-select-blocks-item]');
      var expr = container.find('[data-js-expr]');

      expr.find('option').not(':first-child').remove();
      for (var key in exprList[specId]) {
        expr.append($('<option/>', {
          value: exprList[specId][key]['ID'],
          text: exprList[specId][key]['NAME']
        }));
      }
    };

    $(document).on('change', '[data-js-subject]', subjectChange);
  }
};

LkDataForms.prototype.SyncFilters = {
  run: function () {
    var filtersList = $("[data-active-filters]");
    var filtersSelect = $("[data-active-select]");
    var addButton = $("[data-add-button]");
    var removeItemBtn = $('[data-active-filters] .active-fliters__item-delete');

    firstInit();
    addClick();

    function firstInit() {
      filtersSelect.each(function () {
        var selectId = $(this).data('active-select');
        $("[data-active-filters=" + selectId + "]").children().remove();
        var select = $(this).find('select');
        select.find('option:selected').each(function () {
          $("[data-active-filters=" + selectId + "]").append(filterItemTemplate.replace("{{name}}", $(this).text()));
          $("[data-active-filters=" + selectId + "]").children().last().attr('data-filter-id', $(this).attr('data-option-id')).attr('data-filter-option-group', $(this).closest('optgroup').data('option-group'));
        });
        $("[data-active-select=" + selectId + "]").find('.select2-search-choice').addClass('hidden');
      });
    }

    function render(elem) {

      var selectId = $(elem).data('active-select');
      $("[data-active-filters=" + selectId + "]").children().remove();
      var select = $(elem).find('select');

      select.find('option:selected').each(function () {
        $("[data-active-filters=" + selectId + "]").append(filterItemTemplate.replace("{{name}}", $(this).text()));
        $("[data-active-filters=" + selectId + "]").children().last().attr('data-filter-id', $(this).attr('data-option-id')).attr('data-filter-option-group', $(this).closest('optgroup').data('option-group'));
      });

      $("[data-active-select=" + selectId + "]").find('.select2-search-choice').addClass('hidden');

    }

    function addClick() {
      $("body").on('click', '[data-active-select] [data-add-button]', function (e) {

        render($(e.target).closest('[data-active-select]'));

        LkDataForms.prototype.ToggleLkFiltersList.run();

        return false;
      });
    }

    function addItem(items, selectId) {
      var currentSelect = $("[data-active-filters=" + selectId + "]");
      items.forEach(function (val) {
        currentSelect.append(filterItemTemplate.replace("{{name}}", val));
        currentSelect.children().last().attr('data-filter-id', $(this).attr('data-option-id'));
      });
    }


    $("body").on('click', '[data-active-filters] .active-fliters__item-delete', function (e) {
      removeItem(e);
      //if ($(e.target).parent('[data-filter-id]')) {
      //    LkDataForms.prototype.PlacesChoise.checkAdded();
      //}
    });

    function removeItem(el) {
      var self = el;
      var toRemoveItem = $(self.target).parent();
      var toRemoveText = $(self.target).parent().find('span:first-child').text();
      var filterId = $(self.target).closest("[data-active-filters]").data('active-filters');

      $("[data-active-select=" + filterId + "]").find('.select2-search-choice').each(function () {
        if (toRemoveText == $(this).find('div:first-child').text()) {
          $(this).find('.select2-search-choice-close').trigger('click');
          toRemoveItem.remove();
        }
      });

      LkDataForms.prototype.FormMultiple.run();
    }
  }
};

LkDataForms.prototype.PlacesChoise = {
  constructor: function (initer, select, template) {
    this.initer = initer || 'data-places-choise';
    this.select = select || 'data-active-select';
    this.filters = 'data-active-filters';
    this.choseAllBtn = 'data-places-choise-all';
    this.addBtn = 'data-add-button';
    this.link = 'data-choise-link';
    this.template = template || "<a href='' class='dotted-element'><span>{{line}}</span></a>";
  },
  run: function () {
    this.constructor();
    this.render();
    this.events();
    this.checkAdded();
  },
  render: function () {
    var self = this;

    $('[' + this.initer + ']').each(function () {
      var currentElem = $(this);
      var index = $(this).attr(self.initer);
      var currentSelect = $('[' + self.select + '=' + index + ']');

      currentSelect.find('select optgroup').each(function (ind, elem) {
        currentElem.append(self.template.replace('{{line}}', $(elem).attr('label')));
        currentElem.children().last().attr('data-choise-link', $(elem).attr('data-option-group'));
      });
    });

  },
  events: function () {
    var self = this;

    $('[' + this.choseAllBtn + ']').on('click', function () {


      var index = $(this).closest('[' + self.initer + ']').attr(self.initer);
      var currentSelect = $('[' + self.select + '=' + index + ']');
      var currentFilters = $('[' + self.filters + '=' + index + ']');


      if (!$(this).hasClass('all')) {
        currentFilters.children().remove();

        currentSelect.find('option:not(:selected)').attr("selected", "");
        currentSelect.find('select').trigger('change');
        currentSelect.find('.select2-search-choice').hide();
        currentSelect.find('[' + self.addBtn + ']').trigger('click');
      } else {
        currentSelect.find('select option').attr('selected', false).removeAttr('selected');
        currentSelect.find('select').trigger('change');
        currentSelect.find('.select2-search-choice').hide();
        currentSelect.find('[' + self.addBtn + ']').trigger('click');
      }

      self.checkAdded();

      LkDataForms.prototype.ToggleLkFiltersList.run();
    });

    $('[' + this.link + ']').on('click', function () {
      var index = $(this).closest('[' + self.initer + ']').attr(self.initer);
      var currentSelect = $('[' + self.select + '=' + index + ']');
      var currentFilters = $('[' + self.filters + '=' + index + ']');

      var optgroup = $(this).attr(self.link);

      if (!$(this).hasClass('all')) {

        currentFilters.children().remove();

        currentSelect.find('optgroup[data-option-group=' + optgroup + '] option:not(:selected)').attr("selected", "");
        currentSelect.find('.select2-offscreen').trigger('change');
        currentSelect.find('.select2-search-choice').hide();
        currentSelect.find('[' + self.addBtn + ']').trigger('click');

      }
      else {

        currentFilters.children().remove();
        currentSelect.find('select optgroup[data-option-group=' + optgroup + '] option').removeAttr("selected");
        currentSelect.find('select').trigger('change');
        currentSelect.find('[' + self.addBtn + ']').trigger('click');
      }

      self.checkAdded();

      LkDataForms.prototype.ToggleLkFiltersList.run();
    });
  },
  checkAdded: function () {

    var self = this;
    var index = $('[' + self.initer + ']').attr(self.initer);
    var currentSelect = $('[' + self.select + '=' + index + ']');
    var currentFilters = $('[' + self.filters + '=' + index + ']');

    var filtersSelect = $(".lk-profile__block--places [data-active-select]");

    currentSelect.find('select optgroup').each(function () {
      var lenght = $(this).children().length;
      var optionId = $(this).data('option-group');
      var filtersLength = $('[data-filter-option-group=' + optionId + ']').length;


      if (lenght == filtersLength) {
        $('[data-choise-link=' + $(this).attr('data-option-group') + ']').addClass('all');
      } else {
        $('[data-choise-link=' + $(this).attr('data-option-group') + ']').removeClass('all')
      }
    });

    $('[' + self.initer + ']').each(function () {
      var index = $(this).attr(self.initer);
      var currentSelect = $('[' + self.select + '=' + index + ']');

      var selectCol = currentSelect.find('select option').length;
      var selectedCol = currentSelect.find('select option:selected').length;

      if (selectCol == selectedCol) {
        $('[data-places-choise=' + index + ']').find('[data-places-choise-all]').addClass('all');
      } else {
        $('[data-places-choise=' + index + ']').find('[data-places-choise-all]').removeClass('all');
      }
    });

  }
};

LkDataForms.prototype.PreventRepetitorForm = {
  run: function () {
    $('[data-js-repetitor-form]').on('submit', function () {
      $('option').each(function () {
        $(this).removeAttr('disabled');
      });
    });
  }
};

LkDataForms.prototype.DataTabsBlocks = {

  self: function () {
    return this;
  },

  run: function () {
    var initer = $('[data-tabs-blocks]');
    var filters = $('[data-tabs-blocks-filters]');
    var list = $('[data-tabs-blocks-list]');
    var filterSelector = initer.find(filters).find('.active-fliters__item');
    var removeSelector = filterSelector.find('.active-fliters__item-delete');


    firstInit();

    function firstInit() {


      $(list).children().not('[data-tabs-clone]').find('.lk-profile-direction-bind').find('select').select2();

      $(list).children().not('[data-tabs-clone]').each(function () {
        var input = $(this).find('[data-new-block-name]');
        input.each(function () {
          $(this).closest(initer).find(filters).find('.active-fliters__list').append(filterItemTemplate.replace("{{name}}", $(this).val()));
        });

      });


      if (!initer.find(filters).find('.active-fliters__list').children().hasClass('active-fliters__item')) {
        finalAdd('[data-tabs-blocks] > .add-element');
        initer.find(list).children().last().removeClass('active');
      }

      initer.find(filters).find('.active-fliters__list').children().first().addClass('active');

      // Переиницализация селекта

      initer.find(list).children('.active').find('select.select2-delayed').select2({});


      $(list).find('.select2-search-choice').each(function () {
        $(this).addClass('hidden');
      });

      if (!initer.hasClass('adding-in-progress'))
        initer.find(list).children().not('[data-tabs-clone]').find('.lk-profile__add-btn').remove();
    }


    // Переключение вкладок

    $("body").on('click', '[data-tabs-blocks] [data-tabs-blocks-filters] .active-fliters__item', function (e) {
      var addElem = initer.children('.add-element');
      var index = $(this).index();
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      $(this).closest(initer).find(list).children().siblings().removeClass('active');
      $(this).closest(initer).find(list).children().eq(index).addClass('active');

      if ($(this).closest(initer).hasClass('adding-in-progress')) {
        $(this).closest(initer).removeClass('adding-in-progress');
        $(this).closest(initer).find(list).children().eq(-2).remove();
        $(this).closest(initer).find(filters).find('.active-fliters__item-delete').show();
        addElem.show();
      }

    });

    // Удаляем элемент

    $("body").on('click', '[data-tabs-blocks] [data-tabs-blocks-filters] .active-fliters__item .active-fliters__item-delete', function (e) {
      var index = $(this).parent().index();
      var closest = $(e.target).closest(initer);

      $(e.target).closest(initer).find(list).children().eq(index).remove();
      $(e.target).parent().remove();

      closest.find(filters).find('.active-fliters__item').first().addClass('active');
      closest.find(list).children().first().addClass('active');

      if (!closest.find(filters).find('.active-fliters__list').children().hasClass('active-fliters__item')) {
        closest.children('.add-element').trigger('click');
        closest.find(list).children().last().removeClass('active');
      }

      LkDataForms.prototype.FormMultiple.run()
    });

    addBlock();

    function addBlock() {
      var addElem = initer.children('.add-element');
      var cancelBtn = initer.find('[data-cancel-button]');
      var confirmAdd = initer.find('[data-confirm-add]');

      // Отменяем добавление элемента

      $("body").on('click', '[data-tabs-blocks] [data-cancel-button]', function (e) {
        addElem.show();

        $(e.target).closest(initer).removeClass('adding-in-progress');
        $(e.target).closest(initer).find(filters).find('.active-fliters__item-delete').show();

        $(e.target).closest(initer).find(filters).show().find('.active-fliters__item').first().addClass('active');
        $(e.target).closest(initer).find(list).children().first().addClass('active');

        $(e.target).closest(initer).find('[data-tabs-clone]').prev().remove();


        LkDataForms.prototype.FormMultiple.run();

        return false;
      });

      // Подтверждаем добавление

      $("body").on('click', '[data-tabs-blocks] [data-confirm-add]', function (e) {


        if ($(e.target).closest(initer).find(list).children('.active').find('[data-new-block-name]').val().length > 2) {

          $(e.target).closest(initer).find(filters).find('.active-fliters__item-delete').show();
          $(e.target).closest(initer).removeClass('adding-in-progress');

          $(e.target)
            .closest(initer)
            .find(filters)
            .find('.active-fliters__list')
            .append(filterItemTemplate.replace("{{name}}", $(e.target).closest(initer).find('[data-tabs-blocks-list]').children().last().prev().find('[data-new-block-name]').val()));
          $(e.target).closest(initer).find(filters).show();
          $(e.target).closest(initer).find(filters).find('.active-fliters__item').removeClass('active');
          $(e.target).closest(initer).find(filters).find('.active-fliters__item').last().addClass('active');
          $(e.target).closest(initer).find('[data-new-block-name]').removeClass('invalid');
          $(e.target).closest(initer).find(addElem).show();
          $(e.target).closest('.lk-profile__add-btn').remove();
        }
        else {
          $(e.target).closest(initer).find('[data-new-block-name]').addClass('invalid');
        }

        return false;
      });

      // Клик по кнопке добавление элемента

      addElem.on('click', function () {

        finalAdd($(this));

        LkDataForms.prototype.FormMultiple.run();
        LkDataForms.prototype.AutocompleteUniver.run();

        return false;
      });

    }

    function finalAdd(_this) {

      $(_this).hide();

      $(_this).closest(initer).find(filters).find('.active-fliters__item-delete').hide();

      $(_this).closest(initer).addClass('adding-in-progress');

      // Клонируем нужный элемент
      var copyBlock = $(_this).closest(initer).find('[data-tabs-clone]').clone();

      // Удаляем лишние атрибуты
      var copyBlockClean = copyBlock.removeAttr('data-tabs-clone');

      // Смена активности у элементов
      $(_this).closest(initer).find(list).children().siblings().removeClass('active');
      $(_this).closest(initer).find(list).append(copyBlockClean);
      $(_this).closest(initer).find(filters).find('.active-fliters__item').removeClass('active');
      //$(_this).closest(initer).find(filters).hide();

      $(_this).closest(initer).find(list).children()
        .last()
        .find('[data-active-select]')
        .attr('data-active-select', Number($(_this).closest(initer).find(list).children().last().find('[data-active-select]').attr('data-active-select')) + 1);

      $(_this).closest(initer).find(list).children()
        .last()
        .find('[data-active-filters]')
        .attr('data-active-filters', Number($(_this).closest(initer).find(list).children().last().find('[data-active-filters]').attr('data-active-filters')) + 1);

      $(_this).closest(initer).find(list).children().last().addClass('active');

      // Переиницализация селекта

      $(_this).closest(initer).find(list).children().last().find('select.select2-delayed').select2({});

      // Опять переносим элемент для клонирования в конец

      $(_this).closest(initer).find(list).append($(_this).closest(initer).find('[data-tabs-clone]'));

      LkDataForms.prototype.FormMultiple.run()
      uploadHandler(window.location.pathname);
    }
  }
};

LkDataForms.prototype.TabsSelectSync = {
  run: function () {
    var initer = '[data-select-blocks]';
    var filters = '[data-select-blocks-filters]';
    var filtersList = '.active-fliters__list';
    var list = '[data-select-blocks-list]';
    var selectSyncer = '[data-sync-select]';
    var addElem2 = $(initer).children('.add-element');

    firstInit();
    rerender(selectSyncer);

    function rerender(self) {
      var items = [];

      $(selectSyncer).find('option').removeClass('hidden');
      $(filters).find(filtersList).children().remove();

      var currentIndex = $(self).closest('[data-select-blocks-list]').children('.active').index();
      var select = $(self).closest(initer)
        .find(list)
        .children()
        .eq(currentIndex)
        .find(selectSyncer);

      $(list).children().not('[data-tabs-clone]').each(function () {
        var select = $(this).find(selectSyncer);
        select.find('option:selected').each(function () {
          $(this).closest(initer).find(filters).find(filtersList).append(filterItemTemplate.replace("{{name}}", $(this).text()));
          $(this).closest(initer).find(filters).find(filtersList).children().last().attr('data-select-id', $(this).val());
        });
      });

      select.find('option').each(function () {
        var self = $(this);
        self.removeAttr('disabled');
        $(filters).find(filtersList).children().each(function () {
          if ($(this).attr('data-select-id') == self.val()) {
            self.attr('disabled', '');
          }
        })
      });

      $(filters).find(filtersList).children().eq(currentIndex).addClass('active');
    }

    $('body').on('change', selectSyncer, function () {
      var currentIndex = $(this).closest(list).children('.active').index();
      var val = $(this).find('option:selected').text();
      $(this).closest(initer)
        .find(filters)
        .find(filtersList)
        .children()
        .eq(currentIndex)
        .find('span:first-child')
        .text(val);
      rerender($(this));
    });


    // Переключение вкладок

    $("body").on('click', '[data-select-blocks] [data-select-blocks-filters] .active-fliters__item', function (e) {
      var index = $(this).index();
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      $(this).closest($(initer)).find($(list)).children().siblings().removeClass('active');
      $(this).closest($(initer)).find($(list)).children().eq(index).addClass('active');

      if ($(this).closest(initer).hasClass('adding-in-progress')) {
        $(this).closest(initer).removeClass('adding-in-progress');
        $(this).closest(initer).find(list).children().eq(-2).remove();
        $(this).closest(initer).find(filters).find('.active-fliters__item-delete').show();
        addElem2.show();
      }

      rerender(selectSyncer);

      return false;
    });

    // Удаляем элемент

    $("body").on('click', '[data-select-blocks] [data-select-blocks-filters] .active-fliters__item .active-fliters__item-delete', function (e) {
      var index = $(this).parent().index();
      var closest = $(e.target).closest(initer);

      $(e.target).closest(initer).find(list).children().eq(index).remove();
      $(e.target).parent().remove();

      closest.find(filters).find('.active-fliters__item').first().addClass('active');

      closest.find(list).children().removeClass('active').first().addClass('active');

      if (!closest.find(filters).find('.active-fliters__list').children().hasClass('active-fliters__item')) {
        //closest.children('.add-element').trigger('click');
        addElem(addElem2);

        closest.find(list).children().last().removeClass('active');
      }

      $(e.target).closest(initer).find(list).find(selectSyncer).children().removeClass('hidden');

      rerender(selectSyncer);

      LkDataForms.prototype.FormMultiple.run();

      return false;
    });

    // Подтверждаем добавление

    $("body").on('click', '[data-select-blocks] [data-confirm-add]', function (e) {
      var self = $(e.target);

      if (self.closest(initer).find(list).find('[data-choise-select]').children('option:selected').val() != 0) {

        $(e.target).closest(initer).find(filters).find('.active-fliters__item-delete').show();
        $(e.target).closest(initer).removeClass('adding-in-progress');

        self.closest(initer).find(list).children('.active').find('[data-choise-select]').removeAttr('data-choise-select').attr('data-sync-select', '');

        $(e.target).closest(initer).find(filters).find(filtersList).children().last().attr('data-select-id', $(e.target).closest(list).find('[data-choise-select]').find('option:selected').val());

        $(e.target).closest(initer).find(filters).show();
        $(e.target).closest(initer).find(filters).find('.active-fliters__item').removeClass('active');
        $(e.target).closest(initer).find(filters).find('.active-fliters__item').last().addClass('active');
        $(e.target).closest(initer).find(addElem2).show();
        $(e.target).closest('.lk-profile__add-btn').remove();


        rerender(self);
      }

      $(document).trigger('multi_field::refresh');

      return false;
    });

    // Отменяем добавление элемента

    $("body").on('click', '[data-select-blocks] [data-cancel-button]', function (e) {

      addElem2.show();

      $(e.target).closest(initer).removeClass('adding-in-progress');
      $(e.target).closest(initer).find(filters).find('.active-fliters__item-delete').show();

      $(e.target).closest(initer).find(filters).show().find('.active-fliters__item').siblings().removeClass('active');
      $(e.target).closest(initer).find(filters).show().find('.active-fliters__item').first().addClass('active');
      $(e.target).closest(initer).find(list).children().first().addClass('active');

      $(e.target).closest(initer).find('[data-tabs-clone]').prev().remove();

      $('[data-select-blocks] [data-select-blocks-filters] .active-fliters__item').trigger('click');

      return false;
    });


    // Клик по кнопке добавление элемента

    addElem2.on('click', function () {
      addElem($(this));

      LkDataForms.prototype.FormMultiple.run();

      return false;
    });

    function addElem(_this) {

      _this.hide();


      // Клонируем нужный элемент
      var copyBlock = _this.closest(initer).find('[data-tabs-clone]').clone();

      // Удаляем лишние атрибуты
      var copyBlockClean = copyBlock.removeAttr('data-tabs-clone');

      // Смена активности у элементов
      _this.closest(initer).find(list).children().siblings().removeClass('active');
      _this.closest(initer).find(list).append(copyBlockClean);
      _this.closest(initer).find(filters).find('.active-fliters__item').removeClass('active');
      //_this.closest(initer).find(filters).hide();

      rerender(_this);

      _this.closest(initer).find(filters).find('.active-fliters__item').removeClass('active');
      _this.closest(initer).find(filters).find('.active-fliters__item-delete').hide();

      _this.closest(initer).addClass('adding-in-progress');


      $(_this).closest(initer).find('[data-choise-select]').find('option').each(function () {
        var self = $(this);
        self.removeAttr('disabled');
        self.removeAttr('selected');
        $(filters).find(filtersList).children().each(function () {
          if ($(this).attr('data-select-id') == self.attr('value')) {
            self.attr('disabled', '');
          } else {
            self.siblings().removeAttr('selected');
          }
        })

      });

      _this.closest(initer).find(list).children().last().addClass('active');

      // Опять переносим элемент для клонирования в конец

      _this.closest(initer).find(list).append(_this.closest(initer).find('[data-tabs-clone]'));
      $(document).trigger('multi_field::refresh');
    }


    function firstInit() {

      $(list).children().not('[data-tabs-clone]').each(function () {
        var select = $(this).find(selectSyncer);
        select.find('option:selected').each(function () {
          $(this).closest(initer).find(filters).find(filtersList).append(filterItemTemplate.replace("{{name}}", $(this).text()));
          $(this).closest(initer).find(filters).find(filtersList).children().last().attr('data-select-id', $(this).val());
        });

        $(this).find('.lk-profile__add-btn').remove();
      });


      if (!$(initer).find(filters).find('.active-fliters__list').children().hasClass('active-fliters__item')) {
        //addElem2.trigger('click');
        addElem(addElem2);
        $(initer).find(list).children().last().removeClass('active');
        $(filters).find(filtersList).children().first().addClass('active');
      }


      $(filters).find(filtersList).children().first().addClass('active');
    }

  }
};

LkDataForms.prototype.FormMultiple = {
  run: function (params) {
    this.formSelector = '[data-js-repetitor-form]';
    this.eventHandler();
  },

  eventHandler: function () {
    var self = this;
    self.replaceHandler('[data-tabs-blocks-list]', '[data-tabs-blocks-item]');
    self.replaceHandler('[data-select-blocks]', '[data-select-blocks-item]');
  },

  replaceHandler: function (blockSelector, blockItemSelector) {
    var replaceIndex = function (index, el) {
      var replaceControl = $(el).find('[data-replace-string]');
      replaceControl.each(function (indexControl, el) {
        var attrData = $(el).data('replace-string');
        var attr = attrData.replace('{INDEX}', index);
        $(el).attr('name', attr);
      });

      $(el).find('.js-multi-field').each(function (index, el) {
        $(el).find('[data-double-index]').each(function (i, el) {
          var attr = $(el).attr('name');
          $(el).attr('name', attr.replace('{INDEX2}', index));
        });
      });
    };

    var blockListCallBack = function (index, el) {
      var blockItem = $(el).find(blockItemSelector);
      blockItem.each(replaceIndex);
    };

    var blockList = $(blockSelector);
    if (blockList.length > 0) {
      blockList.each(blockListCallBack);
    }
  }


};


LkDataForms.prototype.ToggleLkFiltersList = {
  run: function () {
    var initer = '.lk-profile__block--places [data-active-filters]';

    $(initer).each(function () {

      if ($(this).innerHeight() > 294) {
        if (!$(this).next().length) {
          $(this).after('<div class="lk-display-filters" data-lk-display-filters="' + $(this).data('active-filters') + '">Показать все</div>');

          $(this).next('.lk-display-filters').on('click', function (e) {

            e.preventDefault();

            var elem = $('[data-active-filters=' + $(this).data('lk-display-filters') + ']');

            if (elem.hasClass('shown')) {
              $(this).text('Показать все');
              elem.removeClass('shown');
            } else {
              $(this).text('Скрыть');
              elem.addClass('shown');
            }

          });

        }
      } else {
        $(this).parent().find('.lk-display-filters').remove();
      }

    });

  }
};

var lkForm = new LkDataForms();

$(function () {
  lkForm.init();
});


deleteFile();

function uploadHandler(uploadUrl) {
  $('.scan-file').fileupload({
    dataType: 'json',
    url: addUrlParam(uploadUrl, 'scan_upload', 'Y'),
    done: function (e, data) {
      var uploadContainer = $('.scan-files-loaded');
      var inputTarget = $(this).closest('.lk-inputs-block__item').find('input[name*=SCAN_IDS]');
      var template = "" +
        "<div>" +
        "<span class='green-color'>Загружено: <a class='fancybox' href='{{link}}'>{{name}}</a> ({{size_text}})</span>" +
        "<span class='scan-files-loaded__delete' data-file-id='{{id}}'></span>" +
        "</div>";
      uploadContainer.find('.error').hide();
      if (data.result.error && data.result.error.length) {
        uploadContainer.find('.error').show();
        console.log('error')
      }
      if (!data.result.id) return false;

      $(this).closest('.lk-inputs-block__item').find(uploadContainer).append(template.
          replace('{{name}}', data.result.name).
          replace('{{link}}', data.result.full_link).
          replace('{{size_text}}', data.result['size_text']).
          replace('{{id}}', data.result.id)
      );

      addFileId(data.result.id, inputTarget);
    }
  });

  $('.certif-file').fileupload({
    dataType: 'json',
    url: addUrlParam(uploadUrl, 'certif_upload', 'Y'),
    done: function (e, data) {
      var uploadContainer = $('.lk-profile-certifs');
      var template =
        "<div class='lk-profile-certifs__item'>" +
        "<div class='lk-profile-certifs__img'>" +
        "<img src='{{image-url}}' alt=''>" +
        "</div>" +
        "<div class='lk-profile-certifs__name'>" +
        "{{name}}" +
        "</div>" +
        "<div class='lk-profile-certifs__size'>" +
        "({{size_text}})" +
        "</div>" +
        "<div class='lk-profile-certifs__remove' data-file-id='{{id}}'></div>" +
        "<input name='CERTIF_IDS[]' type='hidden' value='{{id}}' />" +
        "</div>";
      uploadContainer.find('.error').hide();
      if (data.result.error && data.result.error.length) {
        uploadContainer.find('.error').show();
      }
      if (!data.result.id) return false;

      uploadContainer.children().last().before(template.
          replace('{{name}}', data.result.name).
          replace('{{size_text}}', data.result['size_text']).
          replace('{{id}}', data.result.id).
          replace('{{id}}', data.result.id).
          replace('{{image-url}}', data.result.resize_link)
      );
    }
  });

  $('.personal-photo-input').fileupload({
    dataType: 'json',
    url: self.addUrlParam(uploadUrl, 'PERSONAL_PHOTO', 'Y'),
    done: function (e, data) {
      $('.header-logined img, .img-login img').attr('src', data.result.imageheader.src);
      $('.personal-photo img').attr('src', data.result.image.src);
    }
  });

  $('.download-single-file').each(function () {
    var $this = $(this);
    var container = $this.parents('.download-single-container');
    var param = $this.attr('data-download-single-param');
    $this.fileupload({
      dataType: 'json',
      url: self.addUrlParam(uploadUrl, param, 'Y'),
      done: function (e, data) {
        if (data.result.id > 0) {
          container.find('.download-single-id').val(data.result.id);
          var imageBlock = container.find('.download-single-img');
          var imageType = imageBlock.attr('data-image-type');
          if (imageType && imageType == 'long') {
            container.find('.download-single-img img').attr('src', data.result.resize_link_long);
          } else {
            container.find('.download-single-img img').attr('src', data.result.resize_link);
          }
          imageBlock.show();
        }
      }
    });
  })
}

function addFileId(fileId, inputTarget) {
  var fileList = inputTarget.val().split(',');
  fileList.push(fileId);
  inputTarget.val(fileList.join(','));
}

function removeFileId(fileid, inputTarget) {
  var fileList = inputTarget.val().split(',');
  var fileListNew = [];
  $.each(fileList, function (index, value) {
    if (fileid != value) {
      fileListNew.push(value);
    }
  });

  inputTarget.val(fileListNew.join(','));
}

function deleteFile() {

  $(document).on('click', '.scan-files-loaded__delete', function () {
    var fileId = $(this).attr('data-file-id');
    var inputTarget = $(this).closest('.lk-inputs-block-scan').find('input[name*=_IDS]');
    if (inputTarget.length > 0)
      removeFileId(fileId, inputTarget);
    $(this).parent().remove();
  });

  $(document).on('click', '.lk-profile-certifs__remove', function () {
    var fileId = $(this).attr('data-file-id');
    var inputTarget = $(this).closest('.lk-profile-certifs').find('input[name*=_IDS]');
    if (inputTarget.length > 0)
      removeFileId(fileId, inputTarget);
    $(this).parent().remove();
  });
}

function addUrlParam(search, key, val) {
  var newParam = key + '=' + val,
    params = '?' + newParam;

  if (search.indexOf('?') == -1) {
    search += params;
    return search;
  }

  if (search) {
    params = search.replace(new RegExp('[\?&]' + key + '[^&]*'), '$1' + newParam);
    if (params === search) {
      params += '&' + newParam;
    }
  }

  return params;
}


// Add element
var multiFieldCallBack = function () {
$('.js-add-field, .js-multi-field .js-remove-field').unbind('click');
$('.js-multi-field-wrapper').each(function () {
  var wrapper = $('.js-multi-fields', this);
  $('.js-add-field', $(this)).click(function (e) {
  	e.preventDefault();
    var container = $('.js-multi-field:first-child', wrapper).clone(true).appendTo(wrapper);
    container.find('input').not('[data-prev-value]').val('');
    container.find(':input').inputmask();
    container.find('.js-remove-field').removeClass('hidden');
    $(document).trigger('multi_field::add');
  });

  $('.js-multi-field:not(:eq(0)) .js-remove-field', wrapper)
    .removeClass('hidden');

  $('.js-multi-field .js-remove-field', wrapper).click(function () {
    if ($('.js-multi-field', wrapper).length > 1) {
      $(this).parent('.js-multi-field').remove();
    }
  });

  $(document).trigger('multi_field::complete');
});
};

$(document).ready(multiFieldCallBack);
$(document).on('multi_field::refresh', multiFieldCallBack);

// Components ============================================================================================================
window.ApplicationGlobal = {
    Components: {},
    /**
     * Front controller application, init all plugin
     * and event handler
     */

    addComponent: function(name, object) {
        this.Components[name] = object;
        object.run();
        if(object.resizeFunctions != null && typeof(object.resizeFunctions) == "function") {
            $(window).on("resize", function() {

            });
        }
        if(object.scrollFunctions != null && typeof(object.scrollFunctions) == "function") {
            $(window).on("scroll", function() {
            });
        }
    }
};

function floatSaveButton() {
    var controlFixed = $('.float-save-button');
    if (controlFixed.length) {
      controlFixed.scrollToFixed({
        bottom: 0,
        limit: controlFixed.offset().top,
      });
    }
}

$(function() {

    $.fn.toggleText = function(t1, t2) {
        if (this.text() == t1) this.text(t2);
        else this.text(t1);
        return this;
    };



    var Main = {

        run: function() {
            $(":input").inputmask();
            $('[data-toggle=tooltip]').tooltip();
            $('.fancybox').fancybox();
        }

    };

    var Anchors = {
        run: function() {
            var initer = $('[data-anchor]');

            initer.on('click', function() {
                var el = $(this).attr('href');
                $('body, html').animate({
                    scrollTop: $(el).offset().top
                }, 500);
                return false;
            });
        }
    };

    var GoToUp = {
        run: function() {
            var initer = $('.go-to-up');
            var top_show = 350;
            var delay = 500; // Задержка прокрутки
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > top_show) initer.fadeIn();
                else initer.fadeOut();
            });
            initer.click(function () {
                $('body, html').animate({
                    scrollTop: 0
                }, delay);
            });
        }
    };

    var TextOpener = {
        run: function() {
            var opener = $('[data-text-opener]');

            opener.on('click', function() {
                $(this)
                    .closest('[data-text-collapse]')
                    .toggleClass('open')
                    .find('.text-hidden')
                    .toggleClass('open');

                $(this)
                    .find('span')
                    .toggleText($(this).find('a').data('shown'), $(this).find('a').data('closed'));

                return false;
            });
        }
    }

    var FloatedMenu = {
        run: function() {
            var initer = $('[data-floated-menu]');
            if (initer.length) {
                var initerPos = initer.offset().top;
                var initerPosEnd = initer.closest('.content').offset().top + initer.closest('.content').innerHeight() - initer.innerHeight();

                $(window).on('scroll', function() {
                    if ($(this).scrollTop() > initerPos) {
                        initer.addClass('floated');
                    } else if (initer.hasClass('floated')) {
                        initer.removeClass('floated');
                    }

                    if ($(this).scrollTop() > initerPosEnd) {
                        initer.removeClass('floated');
                    }
                });
            }
        }
    };

    var Selects = {

        run: function() {
            this.init();
        },

        init: function() {
            var initer = $("select.select2");
            initer.select2({
                width: 'resolve'
            });
        }

    };

    var CatalogFiltersShow = {
        run: function () {
            var initer = $('.show-filters');
            var holder = $('.catalog-filter');

            initer.on('click', function () {
                initer.toggleClass('up down');
                holder.toggleClass('catalog-filter--open');
                return false;
            });
        }
    };

    var ToggleTeacherAddInfo = {
        run: function() {
            var openableItem = $('.teacher-card-info__openable');
            var opener = $('.teacher-card-info__links .dotted-element');

            opener.on('click', function() {
                $(this).closest(openableItem).toggleClass('opened closed');
                $(this).find('span').toggleText($(this).data('shown'), $(this).data('closed'));

                return false;
            });
        }
    };

    var RemoveBlock = {
        run: function () {
            var initer = $('[data-remove]');

                $("body").on('click', '[data-remove]', function(e) {
                $(initer.data('remove')).addClass( 'disappear' ).onCSSTransitionEnd(function() {
                    $(initer.data('remove')).remove();
                });

                return false;
            });
        }
    };

    var ClickOnCheckbox = {
        run: function() {
            var initer = $('.input-checkbox');

            $('body').on('click', '.input-checkbox',  function(e) {
                var _this = e.target;
                var input = $(_this).closest('.input-checkbox')
                if (!input.find('label')[0].hasAttribute('for')) {
                    input.find('input[type=checkbox]').trigger('click');
                }
            });
        }
    };
    //
    //var filterItemTemplate =
    //    "<div class='active-fliters__item'>" +
    //    "<span>{{name}}</span>" +
    //    "<span class='active-fliters__item-delete'></span>" +
    //    "</div>";


    var Dropdown = {

        run: function() {
            var dropdownHolder = $('.dropdown-menu');
            var dropdownOpener = $('.header-dropdown-menu__wrap');

            dropdownOpener.on('click', function() {
                //dropdownHolder.css('height', $(document).height() - 45);
                dropdownHolder.toggleClass('opened');
                dropdownOpener.toggleClass('opened');
            });

            $(document).on('click', function(e) {
                if (!$(e.target).closest('.dropdown-menu').length && !$(e.target).closest(dropdownOpener).length) {
                    dropdownHolder.removeClass('opened');
                    dropdownOpener.removeClass('opened');
                }
            });

            $(document).on('touchstart', function(e) {
                if (!$(e.target).closest('.dropdown-menu').length && !$(e.target).closest(dropdownOpener).length) {
                    dropdownHolder.removeClass('opened');
                    dropdownOpener.removeClass('opened');
                }
            });

        }
    };

    window.ApplicationGlobal.addComponent("Main", Main);
    window.ApplicationGlobal.addComponent("Dropdown", Dropdown);
    window.ApplicationGlobal.addComponent("ToggleTeacherAddInfo", ToggleTeacherAddInfo);
    window.ApplicationGlobal.addComponent("Anchors", Anchors);
    window.ApplicationGlobal.addComponent("FloatedMenu", FloatedMenu);
    window.ApplicationGlobal.addComponent("TextOpener", TextOpener);
    window.ApplicationGlobal.addComponent("RemoveBlock", RemoveBlock);
    window.ApplicationGlobal.addComponent("CatalogFiltersShow", CatalogFiltersShow);
    window.ApplicationGlobal.addComponent("ClickOnCheckbox", ClickOnCheckbox);
    window.ApplicationGlobal.addComponent("GoToUp", GoToUp);
});




