
; /* Start:"a:4:{s:4:"full";s:71:"/bitrix/components/bitrix/system.field.edit/script.min.js?1435564716462";s:6:"source";s:53:"/bitrix/components/bitrix/system.field.edit/script.js";s:3:"min";s:57:"/bitrix/components/bitrix/system.field.edit/script.min.js";s:3:"map";s:57:"/bitrix/components/bitrix/system.field.edit/script.map.js";}"*/
function addElement(e,n){if(document.getElementById("main_"+e)){var t=document.getElementById("main_"+e).getElementsByTagName("div");if(t&&t.length>0&&t[0]){var d=t[0].parentNode;d.appendChild(t[t.length-1].cloneNode(true))}}return}function addElementFile(e,n){var t=document.getElementById("main_"+e);var d=document.getElementById("main_add_"+e);if(t&&d){d=d.cloneNode(true);d.id="";d.style.display="";t.appendChild(d)}return}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:59:"/local/templates/.default/dist/upstudy.js?14643313892202319";s:6:"source";s:41:"/local/templates/.default/dist/upstudy.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));



/**
 * This file is part of the Studio Fact package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var FormChange = function(params) {
  this.targetRegion = params.targetRegion;
  this.messages = params.messages || {};
};

FormChange.prototype = {
  formStorage: [],
  default: {
    messages: {
      title: 'Введенные данные не сохранены',
      description: 'Вы изменили ваши данные, но не сохранили их.',
      btnCancel: 'Остаться на странице',
      btnSuccess: 'Не сохранять'
    }
  },

  initialize: function() {
    this.messages = $.extend(this.messages, this.default.messages);
    this.initialData();
    this.handlerRegion();

  },

  addForm: function(collectionForm) {
    var isAvailable = function (form) {
      return ($.inArray(form, this.formStorage) == -1 && $(form).is('form'));
    }

    if (collectionForm instanceof  Array) {
      for (var i = 0, length = collectionForm.length; i < length; i++) {
        if (isAvailable(collectionForm[i])) {
          this.formStorage.push(collectionForm[i]);
        }
      }
    } else {
      if (isAvailable(collectionForm)) {
        this.formStorage.push(collectionForm);
      }
    }

    return this;
  },

  handlerRegion: function() {
    $(this.targetRegion).on('click', $.proxy(handler, this));
    function handler(event) {
      var isFormChanges = false
        , targetRegion = $(event.target)
        , targetForm;

      for (var i = 0, length = this.formStorage.length; i < length; i++) {
        targetForm = $(this.formStorage[i]);
        if (targetForm.serialize() != targetForm.data('serialize')) {
          isFormChanges = true;
        }
      }

      if (isFormChanges === true) {
        bootbox.dialog({
          className: 'alert-template',
          message: this.messages.description,
          title: this.messages.title,
          buttons: {
            cancel: {
              label: this.messages.btnCancel,
              className: 'btn-green big'
            },
            success: {
              label: this.messages.btnSuccess,
              className: 'btn-gray big modal-save',
              callback: function () {
                window.location = targetRegion.attr('href');
              }
            }
          }
        });

        return false;
      }
    }
  },

  initialData: function() {
    for (var key in this.formStorage) {
      if (!this.formStorage.hasOwnProperty(key)) continue;
      $(this.formStorage[key]).data('serialize', $(this.formStorage[key]).serialize());
    }
  },

  getFormStorage: function() {
    return this.formStorage;
  }
};
(function (window, $) {
'use strict';

  window.Holding = {
  typeContainer: '',
  option: {
    modalTarget: '#setGraphModal',
    priceTemplate: "<div><div class='price-num'></div><div class='group-one'></div></div>",
    addressTemplate: "<div><div class='group-one'></div></div>",
    contentTemplate: "" +
      "<div class='avaliable-one'>" +
      "<div class='form-inputs'>" +
      "<div class='row'>" +
      "<div class='col-xs-12 adres-col'></div>" +
      "<div class='col-xs-8 price-col'></div><div class='col-xs-4 price-add'><a href='#'>Добавить ещё ценник</a></div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      ""
  },

  /**
   * Init object
   */
  init: function () {
    this.edit(this);
    this.add(this);
    this.mapHandle();
    this.closeModal();

  },

  /**
   * Edit holding
   * @param {object} self
   */
  edit: function (self) {
    $(document).on('change', '.js-change-checker input[type="checkbox"]', function () {
      var containter = $(this).parents('.avaliable-one');
      if ($(this).attr("checked") != "checked") {
        containter.addClass('active');
        return true;
      }

      if (!(containter.hasClass("active"))) {
        self.setTypeContainer(containter);
        self.setModalContent(self.preperaModal(containter));
        self.initYandexMap();
        self.getModal().modal('show');
        $(":input").inputmask();
      }
      return false;
    });
    $(document).on('click', '.js-form-edit', function () {
      var containter = $(this).parents('.avaliable-one');
      self.setTypeContainer(containter);
      self.setModalContent(self.preperaModal(containter));
      self.initYandexMap();
      self.getModal().modal('show');
      $(":input").inputmask();
      return false;
    });
  },

  /**
   * Save holding
   * @param {object} self
   */
  add: function (self) {
    this.getModal().on('click', '.modal-save', function () {

      var container = self.getTypeContainer();
      var containerEmpty = true;

      var copyAddressBlock = self.getModal().find('.adres-col .group-one');
      copyAddressBlock = self.duplicateValue(
        self.getModal().find('.adres-col .group-one'),
        copyAddressBlock
      );

      container.find('.group-one[data-type=adres]').html(copyAddressBlock);
      container.find('.group-one[data-type=adres] > .group-one').not(':last-child').remove();
      container.find('.group-one[data-type=adres] .map').attr('id', '').html('');
      container.find('.group-one[data-type=prices] div:not(.template)').remove();
      container.find('.form-vision div').remove();
      container.find('.select2-container-multi').remove();


      self.getModal().find('.price-col .group-one').each(function () {
        var saveData = $('<div>' + $(this).html() + '</div>'),
          priceVal = $(this).find('input[data-type=price]').val(),
          minuteVal = $(this).find('select[data-type=time]').val();
        if (priceVal && minuteVal) {
          container.find('.form-vision').append('<div class="col-xs-6">' + priceVal + ' P / ' + minuteVal + ' Мин</div>');
          container.find('.group-one[data-type=prices]')
            .append(self.duplicateValue($(this), saveData));
          containerEmpty = false;
        }
      });

      if (containerEmpty) {
        container.find(".js-change-checker input[type='checkbox']").removeAttr("checked")
          .trigger('refresh');
        container.removeClass("active");
        container.find("input[type='checkbox']").removeAttr("checked").trigger("refresh");
      } else {
        container.addClass("active");
      }

      self.getModal().modal('hide');

    });
  },

  /**
   * Set container for adding data
   * @param {object} container
   */
  setTypeContainer: function (container) {
    this.typeContainer = container;
  },

  /**
   * Return container
   * @returns {object}
   */
  getTypeContainer: function () {
    return this.typeContainer;
  },

  /**
   * Events map
   */
  mapHandle: function () {
    this.getModal().on('click', '.js-show-map', function () {
      var $this = $(this), toggleText = $this.text(), toggled = $this.attr('data-toggled');
      $this.attr('data-toggled', (toggled == 'on') ? 'off' : 'on')
        .text($this.attr('data-text-toggle'))
        .attr('data-text-toggle', toggleText)
        .parent().find('.map')
        .css('display', (toggled == 'on') ? 'block' : 'none');

      return false;
    });
  },

  /**
   * Init yandex map
   */
  initYandexMap: function () {
    if (this.getModal().find('.map').length > 0) {
      YandexMap.init(this.getModal());
    }
  },

  /**
   * Handler close modal
   */
  closeModal: function () {
    var self = this;

    this.getModal().on('hidden.bs.modal', function () {
      var containerEmpty = true;
      if (self.getModal().find('.map').length > 0) {
        YandexMap.mapYandex = null;
      }

      $(this).find('.modal-wrap-content').html('');
      var container = self.getTypeContainer();
      container.find('.form-inputs .group-one[data-type="prices"] div').each(function () {
        var priceVal = $(this).find('input[data-type=price]').val();
        var minuteVal = $(this).find('select[data-type=time]').val();
        if (priceVal && minuteVal) {
          containerEmpty = false;
        }
      });
      if (containerEmpty) {
        container.removeClass("active");
        container.find("input[type='checkbox']").removeAttr("checked").trigger("refresh");
      }
    })
  },

  /**
   * Return parameters
   * @param {string} $opt
   */
  getOption: function ($opt) {
    return this.option[$opt];
  },

  /**
   * Method remove price item
   */
  removePriceHandler: function () {
    this.getModal().on('click', '.remove-price', function () {
      $(this).parent().remove();
      Holding.setPriceNum();
    });
  },

  /**
   * Set iterator prices
   */
  setPriceNum: function () {
    this.getModal().find('.remove-price').remove();
    this.getModal().find('.price-num').each(function (index) {
      if (index > 0) $(this).before('<div class="remove-price"></div>');
      $(this).text('Ценник ' + parseInt(index + 1));
    });
    this.removePriceHandler();
  },

  /**
   * Return modal
   * @returns {*}
   */
  getModal: function () {
    return $(this.getOption('modalTarget'));
  },

  /**
   * Set content modal
   * @param {string} data
   */
  setModalContent: function (data) {
    var self = this;
    this.getModal().find('.modal-wrap-content').html(data);
    this.setPriceNum();
    this.getModal().find('.price-add a').on('click', function () {

      var cell = self.getModal().find('.price-col > div:last-child').clone();
      cell.find(':input').val('');
      self.getModal().find('.price-col').append(cell);
      self.setPriceNum();

      return false;
    });
  },

  /**
   * Set value form in copy version
   * @param {object} from
   * @param {object} target
   */
  duplicateValue: function (from, target) {
    from.find(':input').each(function (index) {
      target.find(':input').eq(index).val($(this).val());
    });


    return target;
  },

  /**
   * Copy information about holding in modal popup
   * @param {object} container
   */
  preperaModal: function (container) {
    var containerPrice = container.find('.group-one[data-type=prices]'),
      containerAddress = container.find('.group-one[data-type=adres]'),
      contentTemplate = $(this.getOption('contentTemplate')),
      tplContainerAddress = contentTemplate.find('.adres-col'),
      tplContainerPrice = contentTemplate.find('.price-col'),
      self = this;

    var addressTemplate = $(this.getOption('addressTemplate'));
    addressTemplate.find('.group-one').html(containerAddress.html());
    if (addressTemplate.find('.map').length > 0) {
      var map = addressTemplate.find('.map');
      map.attr('id', 'ymaps-wrapper');
    }

    tplContainerAddress.html(this.duplicateValue(containerAddress, addressTemplate));


    containerPrice.find('div:not(.template)').each(function () {
      var priceTemplate = $(self.getOption('priceTemplate'));
      priceTemplate.find('.group-one').html($(this).html());
      tplContainerPrice.append(self.duplicateValue($(this), priceTemplate));
    });

    if (tplContainerPrice.html() == '') {
      var priceTemplate = $(this.getOption('priceTemplate'));
      priceTemplate.find('.group-one').html(containerPrice.find('div.template').html());
      tplContainerPrice.append(priceTemplate);
    }

    return contentTemplate;
  }
};
})(window, window.jQuery);

(function (window, $) {
'use strict';

/**
 * Construct object
 *
 * @param object params
 * @constructor
 */
window.RepetitorData = function (params) {
  this.uploadUrl = params.uploadUrl;
  this.formSelector = params.formSelector || '[data-js-repetitor-form]';
};

/**
 * Init events
 */
RepetitorData.prototype.init = function () {
  var self = this;

  if(jQuery().styler) {
    $('select:not([data-formstyler="false"]), input[type=checkbox]:not([data-formstyler="false"]), input[type=radio]:not([data-formstyler="false"]), input[type=file]:not(".scan-input-file,  [data-emulate=false]")').styler();
  }

  this.uploadHandeler(this.uploadUrl);
  $(document).on('upload.init', '.scan-input-file', function () {
    self.uploadHandeler(self.uploadUrl);
  });

  $(document).on('click', '.remove-educ', function () {
    var $this = $(this);
    bootbox.dialog({
      className: "alert-template",
      message: "Вы действительно хотите удалить образование?",
      title: "Удалить образование",
      buttons: {
        cancel: {
          label: "Отмена",
          className: "btn-gray big",
          callback: function () {
            $(this).modal('hide');
          }
        },
        success: {
          label: "Да",
          className: "btn-green big modal-save",
          callback: function () {
            $this.parents('.graduate-one').remove();
            var target = '.graduate-empty';
            $(target).find('.remove-educ').show();
            $(target).eq($(target).length - 1).find('.remove-educ').hide();
          }
        }
      }
    });

    return false;
  });

    $(document).on('click', '.remove-educ-m', function () {
        var $this = $(this);
        $this.parents('.graduate-one').remove();
        var target = '.graduate-empty';
        $(target).find('.remove-educ-m').show();
        $(target).eq($(target).length - 1).find('.remove-educ-m').hide();

        return false;
    });

  $(document).on('click', '.remove-subject', function () {
    var $this = $(this);
    bootbox.dialog({
      className: "alert-template",
      message: "Вы действительно хотите удалить предмет?",
      title: "Удалить предмет",
      buttons: {
        cancel: {
          label: "Отмена",
          className: "btn-gray big",
          callback: function () {
            $(this).modal('hide');
          }
        },
        success: {
          label: "Да",
          className: "btn-green big modal-save",
          callback: function () {
            $this.parents('.subject-one').remove();
            var target = '.subject-one-empty';
            $(target).find('.remove-subject').show();
            $(target).eq($(target).length - 1).find('.remove-subject').hide();
          }
        }
      }
    });

    return false;
  });

  $(document).on('click', 'a.remove, a.remove-upload', function () {
    var scanid = $(this).attr('data-scan-id');
    var inputTarget = $(this).parents('.graduate-one').find('input[name*=SCAN_ID]');
    self.removeScanId(scanid, inputTarget);
    $(this).parents('li').remove();
  });

  $(document).on('click', 'a.revert-changes', function () {
    window.location.reload();
  });
}

/**
 * @param uploadUrl
 */
RepetitorData.prototype.uploadHandeler = function (uploadUrl) {
  var self = this;
  $('.scan-input-file').fileupload({
    dataType: 'json',
    url: self.addUrlParam(uploadUrl, 'scan_upload', 'Y'),
    done: function (e, data) {
      if (!data.result.id) return false;
      var uploadContainer = $(this).parents('.graduate-one').find('.upload-list');
      var inputTarget = $(this).parents('.graduate-one').find('input[name*=SCAN_ID]');

      uploadContainer.append('' +
        '<li>' +
        '<span>' + data.result.name + '</span>' +
        '<a href="javascript:void(0);" data-scan-id="' + data.result.id + '" class="remove-upload"></a>' +
        '</li>'
      );

      self.addScanId(data.result.id, inputTarget);
    },
    start: function (e, data) {
      $(this).parents('.fileinput-button').addClass('loading disabled');
    },
    stop: function (e, data) {
      $(this).parents('.fileinput-button').removeClass('loading disabled');
    }
  });
}

/**
 * @param int scanid
 * @param object inputTarget
 */
RepetitorData.prototype.removeScanId = function (scanid, inputTarget) {
  var scanList = inputTarget.val().split(',');
  var scanListNew = [];
  $.each(scanList, function (index, value) {
    if (scanid != value) {
      scanListNew.push(value);
    }
  });

  inputTarget.val(scanListNew.join(','));
}

/**
 * @param int scanid
 * @param object inputTarget
 */
RepetitorData.prototype.addScanId = function (scanid, inputTarget) {
  var scanList = inputTarget.val().split(',');
  scanList.push(scanid);
  inputTarget.val(scanList.join(','));
}


/**
 * Add a URL parameter (or changing it if it already exists)
 * @param {search} string  this is typically document.location.search
 * @param {key}    string  the key to set
 * @param {val}    string  value
 */
RepetitorData.prototype.addUrlParam = function (search, key, val) {
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
};
})(window, window.jQuery);
(function (window, $) {
'use strict';

window.Contacts = {
  option: {},
  countrySelect: '',
  citySelect: '',


  /**
   * Construct object
   */
  init: function() {
    this.countrySelect = $('select[name=COUNTRY]');
    this.citySelect = $('select[name=CITY]');


    this.countrySelect.change($.proxy(function(){
      this.selectedCountry();
      this.clearRelativeInputs();
    }, this));

    this.citySelect.change($.proxy(function(){
      ContactsHolding.clearRelativeInputs();
      ContactsHolding.switchRelativeSections(this.citySelect.find(":selected").html());
    }, this));

    ContactsHolding.init({city : this.citySelect.find(":selected").html()});
  },

  /**
   * Event change country select
   */
  selectedCountry: function() {
    var currValue = this.countrySelect.find('option:selected').val();
    if (currValue == '') {
      this.citySelect.prop('disabled', 'disabled')
        .find('option').eq(0).prop('selected', 'selected');
    } else {
      this.generateOption(this.citySelect, currValue, 'COUNTRY', this.getOption('cityList'));
      this.citySelect.prop('disabled', '');
    }

    this.citySelect.trigger('refresh');
  },


  /**
   * Create new option in select
   *
   * @param {object} select
   * @param {string} value
   * @param {string} keyFind
   * @param {array} list
   */
  generateOption: function(select, value, keyFind, list)
  {
    select.find('option').not(':first-child').remove();
    for (var key in list) {
      if (list[key][keyFind] == value) {
        select.append($('<option/>', {
          value: list[key]['ID'],
          text: list[key]['NAME']
        }));
      }
    }
  },

  /**
   * Set option params
   *
   * @param {string} key
   * @param {array|object|string} value
   * @return {object}
   */
  setOption: function(key, value) {
    this.option[key] = value;

    return this;
  },

  /**
   * Get option param
   *
   * @param {string} key
   */
  getOption: function(key) {
    return this.option[key];
  }
};

window.ContactsHolding = {

  citiesInfo: '',
  curCity: '',
  districtTmpl: "#district-tpl",
  metroTmpl: "#metro-tpl",
  collectInfo: {},
  checkInitMap: {},
  option: {
    modalTarget: '#setFilterModal',
    form: '[data-type="filter-modal"]'
  },

  /**
   * Init object
   */
  init: function (options) {

   this.metroSelect = $('select#METRO_STATIONS');
   this.metroSelectMain = $('select#METRO_STATIONS_MAIN');
   this.districtSelect = $('select#CITY_DISTRICTS');
   this.districtSelectMain = $('select#CITY_DISTRICTS_MAIN');
   this.districtContainer = $('.city-districts-container');
   this.metroContainer = $('.metro-station-container');
   this.chooseRegionContainer = $('.choose-region-container');
   this.city = (options.city != null) ? options.city : "";

    this.edit(this);
    this.mapHandle();
  },
  /**
   * Edit holding
   * @param {object} self
   */
  edit: function (self) {

    $(document).on('click', '.filter-change-region', function () {
      var target = $(this).data("target");
      self.setOption("modalTarget", target);
      self.initYandexMap();
      self.getModal().modal('show');
      return false;
    });
    $(document).on("click", ".filter-save", function() {
      self.setReturnData();
      self.getModal().modal('hide');
    });
  },

  setReturnData: function() {
    this.getModal().find("[data-return]").each(function() {
      var curValue = $(this).val();
      var targetId = $(this).attr("data-id");
      var targetSelect = $("#"+targetId);
      targetSelect.val("");
      if(curValue) {
        if(typeof(curValue) == 'object') {
          for(var value in curValue) {
            targetSelect.find("[data-request-id='"+curValue[value]+"']").attr("selected", "selected");
            targetSelect.find("[value='"+curValue[value]+"']").attr("selected", "selected");
          }
        } else {
          targetSelect.find("[data-request-id='"+curValue+"']").attr("selected", "selected");
          targetSelect.find("[value='"+curValue+"']").attr("selected", "selected");
        }

      }
      targetSelect.trigger("change").trigger("refresh");
    });
  },
  /**
   * Set container for adding data
   * @param {object} container
   */
  setTypeContainer: function (container) {
    this.typeContainer = container;
  },
  /**
   * Set content modal
   * @param {string} data
   */
  setModalContent: function (data) {
    this.getModal().find('.modal-wrap-content').html(data);
  },
  /**
   * Return container
   * @returns {object}
   */
  getTypeContainer: function () {
    return this.typeContainer;
  },

  /**
   * Events map
   */
  mapHandle: function () {
    $(document).on('click', '.js-show-map', function () {
      var $this = $(this), toggleText = $this.text(), toggled = $this.attr('data-toggled');
      $this.attr('data-toggled', (toggled == 'on') ? 'off' : 'on')
        .text($this.attr('data-text-toggle'))
        .attr('data-text-toggle', toggleText)
        .parent().find('.map')
        .css('display', (toggled == 'on') ? 'block' : 'none');

      return false;
    });
  },

  /**
   * Init yandex map
   */
  initYandexMap: function () {
    if (this.getModal().find('.map').length > 0 && !this.checkInitMap[this.getModal().find('.map').attr("id")]) {

      YandexMap.init(this.getModal(), {city: this.city});
      this.checkInitMap[this.getModal().find('.map').attr("id")] = true;
    } else {

        YandexMap.setCity(this.city, this.getModal().find('.map').attr("id"));
    }
  },

  /**
   * Return parameters
   * @param {string} $opt
   */
  getOption: function ($opt) {
    return this.option[$opt];
  },
  setOption: function ($opt, $value) {
    this.option[$opt] = $value;
  },

  /**
   * Return modal
   * @returns {*}
   */
  getModal: function () {
    return $(this.getOption('modalTarget'));
  },

  /**
   * Copy information about holding in modal popup
   * @param {object} container
   */
  preperaModal: function (container) {
    var containerAddress = container.find('.group-one[data-type=adres]'),
      contentTemplate = $(this.getOption('contentTemplate'));

    var addressTemplate = $(this.getOption('addressTemplate'));
    addressTemplate.find('.group-one').html(containerAddress.html());
    if (addressTemplate.find('.map').length > 0) {
      var map = addressTemplate.find('.map');
      map.attr('id', 'ymaps-wrapper');
    }

    return contentTemplate;
  },
    getCurrentValues: function() {
        var retunObj = {};

        $("[data-collect]").each(function() {
            var activeOptions = [];
            var selected  = $(this).find(":selected");
            if(selected.length) {
                selected.each(function() {
                    activeOptions.push($(this).attr("data-request-id"));
                });
            } else {
                activeOptions = false;
            }
            var collectArray = []

            $(this).find("[data-request-id]").each(function() {
                collectArray.push($(this).attr("data-request-id"));
            });
            if($(this).attr("data-type")) {
                retunObj[$(this).attr("data-type")] = {};
                retunObj[$(this).attr("data-type")][$(this).data("collect")] =  collectArray;
                retunObj[$(this).attr("data-type")]["ACTIVE"] =  activeOptions;
            } else {
                retunObj[$(this).data("collect")] = collectArray;
                retunObj[$(this).data("collect")]["ACTIVE"] =  activeOptions;
            }

        });
        return retunObj;
    },

    /**
     * Event switch metro and districts containers data
     */
    switchRelativeSections: function(city) {
        this.getCityInfo(city);
    },
    clearRelativeInputs: function() {
        this.metroSelect.val("").trigger("change");
        this.metroSelectMain.val("").trigger("refresh");
        this.districtSelect.val("").trigger("change");
        this.districtSelectMain.val("").trigger("refresh");
    },
    getCityInfo:function(city, curValues) {
        this.city = city;
        var $this = this;

        $.ajax({
            type: "POST",
            url: "/include/php/ajax_location.php",
            data: {
                'getJsonData' : true,
                'city' : city,
                'filterData' : curValues,
                'action' : 'getCityInfo'
            },
            success: function(response) {
                $this.checkCityInfo(response);
            }
        });
    },
    checkCityInfo:function(response) {
      var hideButton = false;
      this.collectInfo = this.getCurrentValues();

      var activeDistricts = this.collectInfo.DISTRICTS ? this.collectInfo.DISTRICTS.ACTIVE : "";
      var activeMetro = this.collectInfo.METRO ? this.collectInfo.METRO.ACTIVE : "";

      if(this.toggleContainers(response.DISTRICTS, this.districtContainer)) {
        this.rebuildSelect(this.districtSelect, response, this.districtTmpl, activeDistricts);
        this.rebuildSelect(this.districtSelectMain, response, this.districtTmpl, activeDistricts);

        hideButton = true;
      }
      if(this.toggleContainers(response.LINES, this.metroContainer)) {
        this.rebuildSelect(this.metroSelect, response, this.metroTmpl, activeMetro);
        this.rebuildSelect(this.metroSelectMain, response, this.metroTmpl, activeMetro);
        hideButton = true;
      }

      this.toggleContainers(hideButton, this.chooseRegionContainer)
    },
    toggleContainers: function(response, container) {
      if(response != null && response != false) {
        container.slideDown(300, function() {
          container.css("overflow", "visible");
          Application.hiddenInitialize(container);
          container.find("select").trigger("refresh");
        });
        return true;
      } else {
        container.slideUp(300);
        return false;
      }
    },
    rebuildSelect: function(select, response, template, activeFilter) {

        var htmlData = this.getResponseTemplate(response, template);
        this.setSelectData(select, htmlData);

        var activeOptions = select.attr("data-active");
        if(activeOptions != null) {
            activeFilter = $.merge(activeOptions.split(","), activeFilter);
        }
        this.selectSetActive(select, activeFilter);

    },

    getResponseTemplate: function(data, tempateId) {
        var source   = $(tempateId).html();
        var template = Handlebars.compile(source);
        return template(data);
    },

    setSelectData: function(select, data) {
        select.empty();
        select.append(data);
    },

    selectSetActive: function($select, activeArr) {
        if($select != null)
            for(var activeId in activeArr) {
                $select.find("option[value='"+activeArr[activeId]+"']").attr("selected", "selected");
            }
        $select.trigger("change").trigger("refresh");
    }
};
})(window, window.jQuery);


function parseGetParams() {
    var $_GET = {};
    var __GET = window.location.search.substring(1).split("&");
    for(var i=0; i<__GET.length; i++) {
        var getVar = __GET[i].split("=");
        $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1];
    }
    return $_GET;
}
/**
 * This file is part of the Studio Fact package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

function GetPage()
{
    function ShowResult(data)
    {
        PCloseWaitMessage('wait_container');

        var obContainer = document.getElementById('ajax_result');
        if (obContainer)
            obContainer.innerHTML = data;
    }
    PShowWaitMessage('wait_container');
    var TID = CPHttpRequest.InitThread();
    CPHttpRequest.SetAction(TID, ShowResult);
    CPHttpRequest.Send(TID, location.href, {'mode':'ajax'});
    return false;
}
/**
 * This file is part of the Studio Fact package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var Arrangement = {
  run: function () {
    this.similarRefreshPjax();
    this.sign();
    this.closeAccept();
    this.promotionRequest();
    this.arrangementDelete();
    this.setNoAccept();
    this.setAccept();
  },

  similarRefreshPjax: function () {
    $(document).on('click', '.similar-refresh-pjax', function () {
      $('#wait_container').show();
      var container = $('#similar-pjax-target');
      $.pjax.reload(container, {timeout: 2000, type: 'POST'});
    });
    $(document).on('pjax:end', function () {
      $('#wait_container').hide();
    })
  },

  closeAccept: function () {
    $(document).on('click', '.arrangement-close-accept', function () {
      var id = $(this).attr('data-id');
      $.ajax({
        url: window.location.pathname,
        data: {
          id: id,
          arrangement_close_accept: 'Y'
        },
        success: function (response) {
          response = JSON.parse(response);

          var textTarget = $('#text-target');
          var infoModal = $('#info-modal');

          if (response['success_close'] == 'Y') {
            textTarget.text(arrangementCloseAccept).show();
            infoModal.modal('show');
          }
        }
      });
      return false;
    });
  },

  sign: function () {
    $(document).on('click', '.arrangement-sign', function () {
      var id = $(this).attr('data-id');
      var container = $('#arrangement-sign-modal');
      $.pjax({
        type: 'POST',
        push: false,
        container: container,
        timeout: 2000,
        data: {
          ARRANGEMENT_ID: id
        }
      }).done(function () {
        container.modal('show');
      })
    })
  },
  signSubmitPjax: function () {
    $('#sign-pjax-target').submit(function () {
      $.pjax.submit(event, '#arrangement-sign-modal');
    });
  },
  promotionRequest: function () {
    $(document).on('click', '.promotion-request', function () {
      var id = $(this).attr('data-id');
      $.ajax(
        window.location.pathname,
        {
          type: 'POST',
          data: {
            ARRANGEMENT_ID: id,
            PROMOTION_REQUEST: 'Y'
          }
        }).done(function () {
          bootbox.alert(promotionSuccessText);
        })
    })
  },
  arrangementDelete: function () {
    $(document).on('click', '.arrangement-delete', function () {
      var id = $(this).attr('data-id');
      bootbox.dialog({
        message: askDeleteMessage,
        buttons: {
          success: {
            label: successMessage,
            className: 'btn big btn--orange',
            callback: function () {
              $.ajax(
                window.location.pathname,
                {
                  type: 'POST',
                  data: {
                    ARRANGEMENT_ID: id,
                    ARRANGEMENT_DELETE: 'Y'
                  }
                }).done(function () {
                  window.location.reload();
                })
            }
          },
          cancel: {
            label: cancelMessage,
            className: 'btn big btn--green'
          }
        }
      });
    })
  },
  setNoAccept: function () {
    $(document).on('click', '.set-no-accept', function () {
      var id = $(this).attr('data-id');
      $.ajax(
        window.location.pathname,
        {
          type: 'POST',
          data: {
            ARRANGEMENT_ID: id,
            ARRANGEMENT_SET_NO_ACCEPT: 'Y'
          }
        }).done(function () {
          window.location.reload();
        })
    })
  },
  setAccept: function () {
    $(document).on('click', '.set-accept', function () {
      var id = $(this).attr('data-id');
      bootbox.dialog({
        closeButton: true,
        title: BX.message('SET_ACCEPT_MODAL_TITLE'),
        message: '<div class="input-block--datepick-popup"><input name="DATE" type="text" value="" onclick="BX.calendar({node: this, field: this, bTime: true, bHideTime:true});" class="width-100"></div>',
        buttons: {
          success: {
            label: BX.message('SAVE'),
            className: "btn btn--small btn--orange force-hidden accept-btn",
            callback: function () {
              var reason = $('input[name=DATE]').val();
              $.ajax(
                window.location.pathname,
                {
                  type: 'POST',
                  data: {
                    ARRANGEMENT_ID: id,
                    DATE: reason,
                    ARRANGEMENT_SET_ACCEPT: 'Y'
                  }
                }).done(function () {
                  window.location.reload();
                })
            }
          }
        }
      });
      Arrangement.hideButton('input[name=DATE]', '.accept-btn');
    })
  },
  hideButton: function (target_selector, btn_selector) {
    $(target_selector).change(function () {
      var reason = $(target_selector).val();
      var btn = $(btn_selector);
      if (reason.length > 0) {
        btn.removeClass('force-hidden');
      } else {
        btn.addClass('force-hidden');
      }
    })
  },
};

$(function () {
  Arrangement.run()
});

/**
 * This file is part of the Studio Fact package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var ArrangementParticipant = {
  run: function () {
    ArrangementParticipant.setStatusListener();
    ArrangementParticipant.participantShowBillModal();
    ArrangementParticipant.participantCheckRequest();
  },
  setStatusListener: function () {
    $(document).on('change', '.set-participant-status', function () {
      var id = $(this).attr('data-id');
      var code = $(this).find(':selected').attr('data-code');
      var statusId = $(this).find(':selected').val();

      if (code == 'not_agree') {
        bootbox.dialog({
          closeButton: false,
          title: refuseModalTitle,
          message: '<textarea class="refuse-reason" name="REFUSE_REASON" data-is-valid="false" ></textarea>',
          buttons: {
            success: {
              label: refuseSaveButton,
              className: "btn btn--small btn--orange refuse-reason-btn",
              callback: function () {
                var reason = $('textarea[name=REFUSE_REASON]').val();
                ArrangementParticipant.setRefuseReason(id, reason);
                ArrangementParticipant.setStatus(id, statusId);
              }
            }
          }
        });
        ArrangementParticipant.hideButton('textarea[name=REFUSE_REASON]', '.refuse-reason-btn');
      } else {
        ArrangementParticipant.setStatus(id, statusId);
      }
    })
  },

  setStatus: function (id, statusId) {
    $.ajax(
      window.location.pathname,
      {
        type: 'POST',
        data: {
          PARTICIPANT_ID: id,
          STATUS_ID: statusId,
          PARTICIPANT_SET_STATUS: 'Y'
        }
      }).done(function () {
        $.pjax.reload('#participant-pjax-target', {timeout: 2000});
      })
  },

  hideButton: function (target_selector, btn_selector) {
    $(target_selector).keyup(function () {
      var reason = $(target_selector).val();
      var btn = $(btn_selector);
      if (reason.length > 0) {
        btn.show();
      } else {
        btn.hide();
      }
    })
  },

  setRefuseReason: function (id, reason) {
    $.ajax(
      window.location.pathname,
      {
        type: 'POST',
        data: {
          PARTICIPANT_ID: id,
          REFUSE_REASON: reason,
          PARTICIPANT_SET_REFUSE_REASON: 'Y'
        }
      }).done(function () {
        $.pjax.reload('#participant-pjax-target', {timeout: 2000});
      })
  },

  downloadBill: function (arrangementId) {
    if (arrangementId > 0) {
      $('#bill-modal input[name=ARRANGEMENT_ID]').val(arrangementId);
      $('#bill-modal form').submit(function () {
        $('#bill-modal').modal('hide');
      })
    }
  },

  participantShowBillModal: function () {
    $(document).on('click', '.pay-participant-btn', function () {
      var $this = $(this);
      var arrangementId = $this.attr('data-id');
      var btnType = $this.attr('data-type');
      var ids = [];

      if (btnType == 'participant-check') {
        $('.pay-participant:checked:not(:disabled)').each(function () {
          ids.push($(this).attr('data-id'));
        });
        if (ids.length == 0) {
          bootbox.alert(emptyCheckError);
          return;
        }
      }

      var container = $('#bill-pjax-target');
      $.pjax({
        type: 'POST',
        push: false,
        container: container,
        timeout: 2000,
        data: {
          ARRANGEMENT_ID: arrangementId,
          PARTICIPANT_IDS: ids,
          SHOW_BILL_MODAL: 'Y'
        }
      }).done(function () {
        if ($('#bill-participant-ids').length > 0) {
          $('#bill-modal').modal('show');
          ArrangementParticipant.downloadBill(arrangementId);
        } else {
          bootbox.alert(emptyAgreeError);
        }
      })
    })
  },

  participantCheckRequest: function () {
    $(document).on('click', '#participants-check-request', function () {
      var itemsWithCheckStatus = $('.status-check');
      if (itemsWithCheckStatus.length > 0) {
        $.ajax(
          window.location.pathname,
          {
            type: 'POST',
            data: {
              PARTICIPANT_CHECK_REQUEST: 'Y'
            }
          }).done(function () {
            bootbox.alert(checkRequestText);
          })
      } else {
        bootbox.alert(checkRequestError);
      }
    })
  }
};

/**
 * This file is part of the Studio Fact package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var Jur = {
  run: function () {
    this.jurReviewsModalOpen();
    this.showHiddenThemes();
    this.initTabs();
  },

  floatSaveButton: function () {
    var controlFixed = $('.float-save-button');
    if (controlFixed.length) {
      controlFixed.scrollToFixed({
        bottom: 0,
        limit: controlFixed.offset().top,
      });
    }
  },

  initTabs: function () {
    $('[data-jur-requisites]').find('input, select, textarea').prop('disabled', true);
    var code = $('#OWNERSHIP option:selected').attr('data-code');
    var activeTab = $('[data-jur-tab=' + code + ']');
    activeTab.find('input, select, textarea').prop('disabled', false);

    var tabSelect = $('.jur-tab-init');
    tabSelect.prop('disabled', false);

    tabSelect.change(function () {
      var $this = $(this);
      var code = $this.find('option:selected').attr('data-code');

      $('[data-jur-requisites]').find('input, select, textarea').prop('disabled', true);
      $('[data-jur-tab]').addClass('hidden');

      var activeTab = $('[data-jur-tab=' + code + ']');
      activeTab.removeClass('hidden');
      activeTab.find('input, select, textarea').prop('disabled', false);
      $this.prop('disabled', false);

      var controlFixed = $('.float-save-button');
      controlFixed.attr('style', '');
      controlFixed.siblings().remove();
    })
  },

  showHiddenThemes: function () {
    $('.skill-toggle').each(function () {
      var container = $(this);
      var button = container.find('.more');
      button.on('click', function () {
        button.toggleClass('open');
        container.find('.hidden-toggle').toggleClass('force-hidden');

        var hiddenCount = $(this)
          .closest('.skill-toggle')
          .find('.force-hidden')
          .length;

        if ($(this).not("[data-action]").length) {

          if ($(this).hasClass('open')) {
            $(this).html('Скрыть <i></i>');
          } else {
            $(this).html('И ещё ' + hiddenCount + '<i></i>');
          }

        }

      });
    });
  },
  jurReviewsModalOpen: function () {
    $(document).on('click', '.jur-reviews-modal-open', function () {
      $('#jur-reviews-modal').modal('show');
    });
  }
};

$(function () {
  Jur.run()
});

$(window).load(function () {
  Jur.floatSaveButton();
});
'use strict';

var Entries = function(params) {
  this.userId = params.userId;
  this.url = params.url;
  this.method = params.method;
  this.messages = params.messages;
  this.statusPayment = params.statusPayment;
  this.statusContacts = params.statusContacts;
  this.statusLessonSet = params.statusLessonSet;
  this.statusLessonCancel = params.statusLessonCancel;
};

Entries.prototype = {

  /**
   * Handler payment form
   *
   * @prams {object} modal
   * @prams {object} form
   * @prams {object} node
   */
  paymentFormSubmit: function(modal, form, node) {

    function callbackHandler() {
      var copyControl = '[name=TYPE_PAYMENT]'
        , priceControl = '[name=PRICE]'
        , priceCurrent = form.find(priceControl).val()
        , priceType = modal.find(copyControl + ':checked').val();

      form.find(copyControl).val(priceType);

      if (priceType == 1) {
        ga('send', 'event', 'buy', 'click', 'payonline', priceCurrent);
      } else if (priceType == 2) {
        ga('send', 'event', 'buy', 'click', 'robokassa', priceCurrent);
      }

      form.trigger('submit');
      modal.modal('hide');
    }

    modal.modal('show');
    modal.find(':input').styler();

    modal.find('.js-payment-confirm').unbind('click');
    modal.find('.js-payment-confirm').click(callbackHandler);

    return false;
  },

  /**
   * Change status entries
   *
   * @params {number} studentId
   * @params {number} previousStatus
   * @prams {object} node
   */
  changeStatus: function(id, studentId, previousStatus, node) {

    function callbackSuccess() {
      $.ajax({
        type: this.method || 'post',
        url: this.url,
        data: {
          ID: id,
          STUDENT_ID: studentId,
          STATUS: node.find('option:selected').val(),
          REASON_CANCEL: $('#reason-cancel-modal').find('[name=REASON_CANCEL]').val(),
          DATE: $('#date-modal').find('[name=DATE]').val(),
          ENTRIES_AJAX: 'Y',
          ENTRIES_CHANGE_STATUS: 'Y'
        },
        success: $.proxy(success, this)
      });
    }

    function success(response) {
      var currentStatus = node.find('option:selected').val();
      var parentRoot = node.parents('tr');
      var parent = node.parents('td');
      if (response.status && response.status.length > 1) {
        node.empty();
        for (var key in response.status) {
          node.append($('<option/>', {
            value: response.status[key]['ID'],
            text: response.status[key]['VALUE']
          }));
        }
        node.val(currentStatus).trigger('refresh');
      } else {
        node.remove();
        parent.text(response.status[0]['VALUE']);
      }

      if (this.statusPayment == currentStatus) {
        parentRoot.find('.js-payment form').removeClass('hidden');
      }
    }

    function checkTextCancel() {
      var modal = $('#reason-cancel-modal');
      var text = modal.find('[name=REASON_CANCEL]').val();
      if (!text) modal.find('.alert-danger').show();
      if (text) {
        modal.find('.alert-danger').hide();
        modal.modal('hide');
        $.proxy(function() {
          callbackSuccess();
        }(), this);
      }
    }

    function checkDate() {
      var modal = $('#date-modal');
      var date = modal.find('[name=DATE]').val();
      if (!date) modal.find('.alert-danger').show();
      if (date) {
        modal.find('.alert-danger').hide();
        modal.modal('hide');
        $.proxy(function() {
          callbackSuccess();
        }(), this);
      }
    }

    var message = (this.statusContacts == node.find('option:selected').val())
      ? this.messages.contactsMessage
      : this.messages.changeMessage;

    if (this.statusLessonSet == node.find('option:selected').val()) {
      $('#date-modal').modal('show');
      $('#date-modal .js-date').unbind('click');
      $('#date-modal').on(
        'click',
        '.js-date',
        $.proxy(checkDate, this)
      );
    } else if (this.statusLessonCancel == node.find('option:selected').val()) {
      $('#reason-cancel-modal').modal('show');
      $('#reason-cancel-modal .js-date').unbind('click');
      $('#reason-cancel-modal').on(
        'click',
        '.js-reason-cancel',
        $.proxy(checkTextCancel, this)
      );
    } else {
      bootbox.dialog({
        className: 'alert-template',
        message: message,
        title: this.messages.changeTitle,
        buttons: {
          cancel: {
            label: this.messages.cancel,
            className: 'btn-gray big',
            callback: function() {
              node.val(previousStatus).trigger('refresh');
              $(this).modal('hide');
            }
          },
          success: {
            label: this.messages.success,
            className: 'btn-green big modal-save',
            callback: $.proxy(callbackSuccess, this)
          }
        }
      }).on('click', '.bootbox-close-button', function(){
        node.val(previousStatus).trigger('refresh');
      });
    }

    return this;
  },

  /**
   * Remove entries
   *
   * @params {number} id
   * @params {object} node
   */
  remove: function(id, node) {

    function callbackSuccess() {
      $.ajax({
        type: this.method,
        url: this.url,
        data: {
          ID: id,
          ENTRIES_AJAX: 'Y',
          ENTRIES_REMOVE: 'Y'
        },
        success: success
      });
    }

    function success(response) {
      if (response.success) {
        node.remove();
      }
    }

    bootbox.dialog({
      className: 'alert-template',
      message: this.messages.removeMessage,
      title: this.messages.removeTitle,
      buttons: {
        cancel: {
          label: this.messages.cancel,
          className: 'btn-gray big',
          callback: function() {
            $(this).modal('hide');
          }
        },
        success: {
          label: this.messages.success,
          className: 'btn-green big modal-save',
          callback: $.proxy(callbackSuccess, this)
        }
      }
    });

    return this;
  }
};




/**
 * This file is part of the Studio Fact package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var JurPayment = {
  run: function () {
    JurPayment.radioCheck();
    JurPayment.packetCountRefresh();
  },
  radioCheck: function () {
    $('.jur-payment .item').click(function () {
      $('.jur-payment').find('input[type=radio]').prop('checked', false).trigger('refresh');
      $(this).find('input[type=radio]').prop('checked', true).trigger('refresh');
    });
    $('.payment-select .sub-payment label').click(function () {
      var id = $(this).attr('for');
      $('input[id=' + id + ']').prop('checked', true);
    })
  },
  packetCountRefresh: function () {
    $('input[data-packet-count]').change(function () {
      var count = $(this).val();
      $.pjax({
        type: 'POST',
        push: false,
        container: '.packet-count-pjax-target',
        timeout: 2000,
        scrollTo: false,
        data: {
          PACKET_COUNT: count
        }
      }).done(function () {
        JurPayment.packetCountRefresh();
      })
    })
  }
};

$(function () {
  JurPayment.run()
});
/**
 * This file is part of the Studio Fact package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var reviewsRating = {
  run: function () {
    this.ratingStars();
    this.subjectsPjaxReload();
  },

  subjectsPjaxReload: function () {
    $('#repetitor-select').change(function () {
      var id = $(this).find('option:selected').val();
      var container = $('#subject-pjax-target');
      $.pjax({
        type: 'POST',
        push: false,
        container: container,
        timeout: 5000,
        data: {
          SELECTED_REPETITOR: id
        }
      })
    })
  },
  ratingStars: function () {
    var star = $('.rating-stars__star');
    var stars = $('.rating-stars');

    $('.rating-stars--disabled').on('click', function (e) {
      e.preventDefault();
    });

    stars.each(function () {
      var rated = $(this).data('rating');
      var self = $(this);
      if (rated > 0) {
        for (var i = 0; i < rated; i++) {
          self.children().eq(i).addClass('rate');
        }
      }
    });
    var rateCount = '';
    star.on({
      mouseenter: function () {
        $(this).addClass('rate').prevAll('.rating-stars__star').addClass('rate');
        $(this).addClass('rate').nextAll('.rating-stars__star').removeClass('rate');
      },
      click: function () {
        var $this = $(this);
        rateCount = $this.index();
        $this.parent('.rating-stars').addClass('rated').attr('data-rating', rateCount + 1);
        $this.addClass('rate').prevAll('.rating-stars__star').addClass('rate');
        $this.siblings('input').val(rateCount + 1);
      }
    });
    stars.on('mouseleave', function () {
      if (!$(this).hasClass('rated')) {
        $(this).children('.rating-stars__star').removeClass('rate');
      }
      else {
        $(this).children('.rating-stars__star').removeClass('rate');
        for (i = 0; i <= rateCount; i++) {
          $(this).children('.rating-stars__star').eq(i).addClass('rate');
        }
      }
    });
    var oldDesignStar = $('td.rating a');
    oldDesignStar.on({
      click: function () {
        var $this = $(this);
        rateCount = $this.index() + 1;
        $this.siblings('input').val(rateCount + 1);

        var a = $this;
        var td = a.parent();
        var index = a.index();
        td.find('a').each(function(){
          $(this).removeClass('active');
          if ($(this).index() <= index){
            $(this).addClass('active');
          }
        });
      }
    });
  }
};

$(function () {
  reviewsRating.run()
});

/**
 * This file is part of the Studio Fact package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


'use strict';

var FindCity = function(params) {
  this.sendType = params.sendType || 'get';
  this.minLength = params.minLength || 2;
  this.sendUrl = params.sendUrl || window.location.pathname;
  this.inputSearch = params.inputSearch || '#cityInput';
  this.addEventHandler();
};

FindCity.prototype.addEventHandler = function() {
  this.autocomplete();
};

FindCity.prototype.autocomplete = function() {

  /**
   * @param {object} request
   * @param {object} response
   */
  function source(request, response) {
    $.ajax({
      url: this.sendUrl,
      dataType: 'json',
      data: {
        cityQuery: request.term,
        findCity: 'Y'
      },
      success: function(data) {
        response(data);
      }
    });
  }

  /**
   * @param {object} event
   * @param {object} ui
   */
  function chooseCity(event, ui) {
    if (ui.item.id) window.location = ui.item.link;
  }

  /**
   * @param {object} event
   * @param {object} ui
   */
  function response(event, ui) {
    if (ui.content.length === 0) {
      $(this.inputSearch).parent().addClass('has-error');
    } else {
      $(this.inputSearch).parent().removeClass('has-error');
    }
  }

  $(this.inputSearch).autocomplete({
    source: $.proxy(source, this),
    select: $.proxy(chooseCity, this),
    response: $.proxy(response, this),
    minLength: this.minLength
  });
};

$(function(){
  new window.FindCity({});
});
/**
 * This file is part of the Studio Fact package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var ArrangementEdit = {
  run: function () {
    this.copyProgramItem();
    this.copyUnitItem();
    this.copyItem();
    this.deleteItem();
    this.deleteFile();
    this.setAuthorLink();
    this.themeRefreshPjax();
    this.stationRefreshPjax();
    this.uploadHandler();
    this.minDiscount();
  },

  minDiscount: function () {
    $(document).on('change', '#min-discount', function () {
      var discount = $(this).val();
      if (discount < 5 && discount > 0) {
        bootbox.alert(BX.message('DISCOUNT_MIN_ERROR'));
        $(this).val('5');
      }
    })
  },

  themeRefreshPjax: function () {
    $(document).on('change', '#arrangement-type', function () {
      var container = $('#theme-refresh-target');
      var id = $(this).find('option:selected').val();
      $.pjax({
        push: false,
        container: container,
        timeout: 2000,
        scrollTo: false,
        data: {
          theme_refresh: 'Y',
          type_id: id
        }
      }).done(function () {
        $(".select2-multiple:visible:not('.ui-select2'), .select2:visible").select2();
      })
    })
  },

  stationRefreshPjax: function () {
    $(document).on('change', '#arrangement-city', function () {
      var container = $('#station-refresh-target');
      var id = $(this).find('option:selected').val();
      $.pjax({
        push: false,
        container: container,
        timeout: 2000,
        scrollTo: false,
        data: {
          station_refresh: 'Y',
          city_id: id
        }
      }).done(function () {
        $(".select2-multiple:visible:not('.ui-select2'), .select2:visible").select2();
      })
    })
  },

  /**
   * @param uploadUrl
   */
  uploadHandler: function () {
    var uploadUrl = window.location.pathname;
    $('#input-file').fileupload({
      dataType: 'json',
      url: ArrangementEdit.addUrlParam(uploadUrl, 'file_upload', 'Y'),
      done: function (e, data) {
        var uploadContainer = $('#lk-events-files');
        var inputTarget = $('input[name=FILE_IDS]');

        uploadContainer.find('.error').hide();
        if (data.result.error && data.result.error.length) {
          uploadContainer.find('.error').show();
        }
        if (!data.result.id) return false;

        uploadContainer.append('' +
          '<div class="lk-events-files__item item">' +
          '<div class="lk-events-files__left">' +
          '<a href="' + data.result.full_link + '" target="_blank"><span>' +
          data.result.name + ' (' +
          data.result.size + ' Мб)' +
          '</span></a></div>' +
          '<div class="lk-events-files__right"><div class="input-block input-block--delete-able form-group">' +
          '<label for="input16">Короткое описание</label> <input type="hidden" name="FILE[NAME][]" ' +
          'value="' + data.result.name + '"> ' +
          '<input type="hidden" name="FILE[FULL_LINK][]" value="' + data.result.full_link + '"> ' +
          '<input type="hidden" name="FILE[SIZE][]" value="' + data.result.size + '">' +
          '<input type="hidden" name="FILE[ID][]" value="' + data.result.id + '">' +
          '<input name="FILE[DESCRIPTION][]" type="text" class="form-control" value="">' +
          '<a class="input-block__delete file_delete" href="#" data-file-id="' +
          data.result.id + '"></a>' +
          '</div></div></div>'
        );

        ArrangementEdit.addFileId(data.result.id, inputTarget);
        if (uploadContainer.find('.item').length >= 10) {
          $('#input-file').parent().remove();
        }
      }
    });
    $('#input-photo').fileupload({
      dataType: 'json',
      url: ArrangementEdit.addUrlParam(uploadUrl, 'photo_upload', 'Y'),
      done: function (e, data) {
        var uploadContainer = $('#lk-events-gallery');
        var inputTarget = $('input[name=PHOTO_IDS]');

        uploadContainer.find('.error').hide();
        if (data.result.error && data.result.error.length) {
          uploadContainer.find('.error').show();
        }
        if (!data.result.id) return false;
        uploadContainer.append('<div class="lk-events-gallery__item item"><div class="lk-events-gallery__img">' +
          '<input type="hidden" name="PHOTO[RESIZE_LINK][]" value="' + data.result.resize_link + '"> ' +
          '<input type="hidden" name="PHOTO[SIZE][]" value="' + data.result.size + '">' +
          '<input type="hidden" name="PHOTO[ID][]" value="' + data.result.id + '">' +
          '<img src="' +
          data.result.resize_link +
          '" alt=""/></div><div class="lk-events-gallery__name">' +
          data.result.name +
          '</div><div class="lk-events-gallery__size">(' +
          data.result.size +
          ' Мб)</div><div class="lk-events-gallery__remove file_delete" data-file-id="' +
          data.result.id +
          '"></div></div>'
        );

        ArrangementEdit.addFileId(data.result.id, inputTarget);
        if (uploadContainer.find('.item').length >= 20) {
          $('#input-photo').parent().remove();
        }
      }
    });
    $('.author-photo').fileupload({
      dataType: 'json',
      url: ArrangementEdit.addUrlParam(uploadUrl, 'author_photo_upload', 'Y'),
      done: function (e, data) {
        var uploadContainer = $(e.target).parents('.item');

        uploadContainer.find('.error').hide();
        if (data.result.error && data.result.error.length) {
          uploadContainer.find('.error').show();
        }
        if (!data.result.id) return false;
        uploadContainer.find('input[name*=PHOTO_ID]').hide().val(data.result.id);
        uploadContainer.find('.photo').html('<img src="' + data.result.resize_link + '" alt=""/>' +
          '<input type="hidden" name="AUTHOR[PHOTO_RESIZE_LINK][]" value="' + data.result.resize_link + '"> ' +
          '<input type="hidden" name="AUTHOR[PHOTO_SIZE][]" value="' + data.result.size + '">' +
          '<input type="hidden" name="AUTHOR[PHOTO_NAME][]" value="' + data.result.name + '">' +
          '');
        uploadContainer.find('.downloaded').html('<span class="loaded">Загружено: ' +
          data.result.name +
          ' (' +
          data.result.size +
          ' Мб)</span>');
      }
    });
    $('#presentation-file').fileupload({
      dataType: 'json',
      url: ArrangementEdit.addUrlParam(uploadUrl, 'presentation_file_upload', 'Y'),
      done: function (e, data) {
        var uploadContainer = $('#file');
        var inputTarget = $('#file').find('input[name*=PRESENTATION_PICTURE]');

        uploadContainer.find('.error').hide();
        if (data.result.error && data.result.error.length) {
          uploadContainer.find('.error').show();
        }
        if (!data.result.id) return false;

        $('#image-success').show().html('Файл: ' + data.result.name + ' (' + data.result.size + ' Мб)');

        inputTarget.val(data.result.id);
      }
    });
  },

  // tinyMceInit: function () {
  //   tinymce.init({
  //     selector: '.tiny_mce',
  //     plugins: "image"
  //   });
  // },

  addFileId: function (fileId, inputTarget) {
    var fileList = inputTarget.val().split(',');
    fileList.push(fileId);
    inputTarget.val(fileList.join(','));
  },

  removeFileId: function (fileid, inputTarget) {
    var fileList = inputTarget.val().split(',');
    var fileListNew = [];
    $.each(fileList, function (index, value) {
      if (fileid != value) {
        fileListNew.push(value);
      }
    });

    inputTarget.val(fileListNew.join(','));
  },

  addUrlParam: function (search, key, val) {
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
  },

  deleteFile: function () {
    $(document).on('click', '.file_delete', function () {
      var fileId = $(this).attr('data-file-id');
      var inputTarget = $(this).parents('.file-block').find('input[name*=_IDS]');
      if (inputTarget.length > 0)
        ArrangementEdit.removeFileId(fileId, inputTarget);
      $(this).parents('.item').remove();
    });
  },

  deleteItem: function () {
    $('.delete, .delete-unit, .delete-program').off('click');
    $(document).on('click', '.delete', function () {
      $(this).closest('.item').remove();
    });
    $(document).on('click', '.delete-unit', function () {
      $(this).closest('.item-unit').remove();
    });
    $(document).on('click', '.delete-program', function () {
      $(this).closest('.item-program').remove();
    });
  },

  copyItem: function () {
    $(document).on('click', '.add', function () {
      var $this = $(this);
      var addContainer = $this.closest('.add-container');
      var addTarget = addContainer.find('.item:first').clone();

      addTarget.find('input[type=text], input[type=hidden]').val('');
      addTarget.find('select').val('');
      addTarget.find('input[type=textarea], .photo, .loaded').html('');
      addTarget.find('.delete').show();

      addContainer.find('.item:last').after(addTarget);

      CityChange.init();
      ArrangementEdit.uploadHandler();
      ArrangementEdit.deleteItem();
    });
  },

  copyUnitItem: function () {
    $(document).on('click', '.add-unit', function () {
      var $this = $(this);
      var addContainer = $this.closest('.add-container-unit');
      var addTarget = addContainer.find('.item-unit:first').clone();
      var innerItem = addTarget.find('.item-program:first').clone();
      if (addTarget.find('.item-program').length > 1) {
        addTarget.find('.item-program').remove();
        addTarget.find('.add-program').before(innerItem);
      }
      addTarget.find('input[type=text], input[type=hidden]').each(function () {
        var $thisInput = $(this);
        var name = $thisInput.attr('name');
        if (name == 'PROGRAM_UNIT[KEY][]' || name == 'PROGRAM[PROGRAM_UNIT_KEY][]') {
          var programUnitKey = 0;
          $('.program_unit_key').each(function () {
            if (programUnitKey < $(this).val()) {
              programUnitKey = $(this).val();
            }
          });
          $thisInput.val(++programUnitKey);
        } else {
          $thisInput.val('');
        }
      });
      addTarget.find('.delete').show();
      addContainer.find('.item-unit:last').after(addTarget);

      ArrangementEdit.deleteItem();
      $(document).off('click', '.add-program');
      ArrangementEdit.copyProgramItem();
    });
  },

  copyProgramItem: function () {
    $(document).on('click', '.add-program', function () {
      var $this = $(this);
      var addContainer = $this.closest('.add-container-program');
      var addTarget = addContainer.find('.item-program:first').clone();
      addTarget.find('input[type=text], input[type=hidden]').each(function (index) {
        var $thisInput = $(this);
        var name = $thisInput.attr('name');
        if (name == 'PROGRAM[PROGRAM_UNIT_KEY][]') {
          var programUnitKey = $this.closest('.item-unit').find('.program_unit_key').val();
          $thisInput.val(programUnitKey);
        } else {
          $thisInput.val('');
        }
      });
      addTarget.find('.delete').show();
      addContainer.find('.item-program:last').after(addTarget);

      ArrangementEdit.deleteItem();
    });
  },

  setAuthorLink: function () {
    $(document).on('click', '.set-link', function () {
      var container = $(this).parents('.item');
      container.find('input[name*=PHOTO_ID]').val('').show();
    });
    $(document).on('click', 'a', function () {
      var container = $(this).parents('.item');
      container.find('input[name*=PHOTO_ID]').val('').show();
    });
  }
};

$(function () {
  ArrangementEdit.run()
});
/**
 * This file is part of the Studio Fact package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var StudentSearch = {
  run: function () {
    this.searchInit();
  },

  searchInit: function () {
    $(document).ready(function () {
      $('.student-search-init').select2({
        minimumInputLength: 2,
        escapeMarkup: function (m) {
          return m;
        },
        initSelection: function (element, callback) {
          var data = {id: "<?= $def['value'] ?: '' ?>", text: "<?= $def['text'] ?: '' ?>"};
          callback(data);
        },
        ajax: {
          url: window.location.pathname,
          dataType: 'json',
          data: function (term) {
            return {
              q: term,
              type: 'SEARCH_STUDENT'
            };
          },
          results: function (data, page) {
            return {
              results: $.map(data, function (item) {
                return {
                  text: item.text,
                  slug: item.text,
                  id: item.value
                }
              })
            };
          }
        }
      });
    });
  },
};

$(function () {
  StudentSearch.run()
});


/**
 * This file is part of the Studio Fact package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var DoubleSelect = {
  run: function () {
    DoubleSelect.init();
  },
  init: function () {
    $(function () {
      var select1 = $('.double-select__select--1 select');
      var select2 = $('.double-select__select--2 select');
      var selectAddBtn = $('.double-select__btn--add');
      var selectRemoveBtn = $('.double-select__btn--remove');
      var selectAddAllBtn = $('.double-select__btn--all-add');
      var selectRemoveAllBtn = $('.double-select__btn--all-remove');

      selectAddBtn.on('click', function () {
        select1.find('option:selected').remove()
          .appendTo(select2).prop('selected', true);
      });

      selectRemoveBtn.on('click', function () {
        select2.find('option:selected').remove()
          .appendTo(select1).prop('selected', true);
      });

      selectAddAllBtn.on('click', function () {
        select1.find('option').remove()
          .appendTo(select2).prop('selected', true);
      });

      selectRemoveAllBtn.on('click', function () {
        select2.find('option').remove()
          .appendTo(select1).prop('selected', true);
      });

      $('form').on('submit', function () {
        select1.find('option').prop('selected', true);
        select2.find('option').prop('selected', true);
      });
    });
  }
};

$(function () {
  DoubleSelect.run()
});

/**
 * This file is part of the Studio Fact package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var CityChange = {
  run: function () {
    CityChange.init();
  },
  init: function () {
    $('.city-change-init').change(function () {
      if ($('.city-change-pjax-target').length > 0) {
        $.pjax({
          url: window.location.href,
          container: '.city-change-pjax-target',
          type: 'POST',
          timeout: 2000,
          scrollTo: false,
          data: $('form').serialize() + "&cityChange=Y"
        }).done(function () {
          CityChange.init();
          ArrangementEdit.deleteItem();
        });
      }
      if ($('.city-change-index-container').length > 0) {
        var index = $(this).find('option:selected').attr('data-index');
        $('.city-change-index-container input').val(index);
      }
    });
  }
};

$(function () {
  CityChange.run()
});

/**
 * This file is part of the Studio Fact package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var JurVacancy = {
  run: function () {
    JurVacancy.highlightRepetitors();
    JurVacancy.pjaxSubmit();
    JurVacancy.deleteCartItem();
    JurVacancy.vacancyClose();
    JurVacancy.statusChange();
    JurVacancy.unfoldRepetitors();
    JurVacancy.formSubmit();
    JurVacancy.vacancyAccept();
    JurVacancy.vacancyClearFilter();
  },
  vacancyClearFilter: function () {
    $('[data-clear-filter]').click(function () {
      window.location.href = window.location.pathname;
    })
  },
  vacancyAccept: function () {
    $('[data-vacancy-accept-id]').click(function () {
      var id = $(this).attr('data-vacancy-accept-id');
      $.pjax({
        type: 'POST',
        push: false,
        container: '#vacancy-scope-pjax-target',
        timeout: 2000,
        scrollTo: false,
        data: {
          ID: id,
          VACANCY_ACCEPT: 'Y',
        }
      }).done(function () {
        JurVacancy.vacancyAccept();
      });
    });
  },
  formSubmit: function () {
    $('.form-submit').click(function () {
      $(this).parents('form').submit();
    })
  },
  unfoldRepetitors: function () {
    $('.participants').click(function () {
      $('#users_' + $(this).attr('data-id')).slideToggle();
      $(this).find('.arrow-part').toggleClass('down');
      var i = $(this).find('i');
      i.toggleClass('active');
      if (i.hasClass('active')) {
        $(this).find('.toggle-name').text(BX.message('UNFOLD'));
      } else {
        $(this).find('.toggle-name').text(BX.message('FOLD'));
      }
    })
  },
  vacancyClose: function () {
    $('[data-vacancy-close-id]').click(function () {
      var id = $(this).attr('data-vacancy-close-id');
      $.pjax({
        type: 'POST',
        push: false,
        container: '#vacancy-list-pjax-target',
        timeout: 2000,
        scrollTo: false,
        data: {
          ID: id,
          VACANCY_CLOSE: 'Y',
        }
      }).done(function () {
        JurVacancy.unfoldRepetitors();
        JurVacancy.vacancyClose();
        JurVacancy.statusChange();
      });
    });
  },
  statusChange: function () {
    $('[data-status-change-id]').change(function () {
      var status_id = $(this).find('option:selected').val();
      var id = $(this).attr('data-status-change-id');
      $.pjax({
        type: 'POST',
        push: false,
        container: '#vacancy-list-pjax-target',
        timeout: 2000,
        scrollTo: false,
        data: {
          ID: id,
          STATUS_ID: status_id,
          STATUS_CHANGE: 'Y',
        }
      }).done(function () {
        JurVacancy.unfoldRepetitors();
        JurVacancy.vacancyClose();
        JurVacancy.statusChange();
      });
    });
  },
  pjaxSubmit: function () {
    $('#vacancy-pjax-form').submit(function (e) {
      e.preventDefault();
      var data = $('#vacancy-pjax-form').serialize() + '&SUBMIT=Y';
      $.pjax({
        type: 'POST',
        push: true,
        container: '#vacancy-pjax-form',
        timeout: 2000,
        data: data
      }).done(function () {
        Application.run();
        window.scrollTo(0, 0);
      });
    });
  },
  highlightRepetitors: function () {
    $(document).on('change', '#subject-select', function () {
      var data = $('#vacancy-pjax-form').serialize() + '&REFRESH_CART_ITEMS=Y';
      $.pjax({
        type: 'POST',
        push: false,
        container: '.pjax-subject-target',
        scrollTo: false,
        timeout: 2000,
        data: data
      })
    })
  },
  deleteCartItem: function () {
    $(document).on('click', '[data-delete-id]', function () {
      var id = $(this).attr('data-delete-id');
      $.ajax({
        type: 'POST',
        data: {
          ITEM_ID: id,
          DELETE_CART_ITEM: 'Y'
        }
      }).done(function () {
        $('[data-delete-container=' + id + ']').remove();
        if ($('[data-delete-container]').length <= 0) {
          window.location.reload();
        }
      })
    })
  }
};

