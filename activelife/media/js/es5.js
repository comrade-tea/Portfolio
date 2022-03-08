"use strict";

$(function () {
	var $document = $(document);
	var $window = $(window);

	var $header = $(".header");
	var _iconPath = "media/img";

	var initPageNavDEV = function () {
		function pageWidget(pages) {
			var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
			widgetWrap.prependTo("body");
			for (var i = 0; i < pages.length; i++) {
				$('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
			}
			var widgetStilization = $('<style>body {position:relative} .widget_wrap{position:fixed;top:0;left:0;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline} </style>');
			widgetStilization.prependTo(".widget_wrap");
		}

		pageWidget(["home", "catalog", "category", "product", "cart-1", "cart-2", "cart-3", "cart-4", "brands", "blog", "blog-details", "about", "partners-program", "sales-discounts"]);
	}();

	objectFitImages("img.img-fit");

	//header on scroll
	$window.on("scroll", $.throttle(200, function () {
		if ($document.scrollTop() >= 1) {
			$header.addClass("header--scrolled");
		} else {
			$header.removeClass("header--scrolled");
		}
	}));

	var headerSearchHandler = function () {
		var $form = $(".header-search");
		var $searchBtn = $("#header-search-btn");
		var $closeSearchBtn = $("#header-search-close-btn");
		var $headerNavigation = $(".header-bot__navigation");

		$searchBtn.on("click", function () {
			var $this = $(this);
			$form.addClass("is-open");
			$headerNavigation.addClass("is-hidden");
			$this.attr("data-ready-to-submit", "yes");
		});

		$closeSearchBtn.on("click", function () {
			// let $this = $(this);
			$form.removeClass("is-open");
			$searchBtn.attr("data-ready-to-submit", "no");
			$headerNavigation.removeClass("is-hidden");
		});
	}();

	// init slick-sliders
	$(".slick").slick();

	$(".video-slick").slick().on("afterChange", function (event, slick, currentSlide, nextSlide) {
		if ($playingVideoContainer) {
			var video = $playingVideoContainer.find("video")[0];
			var $playBtn = $playingVideoContainer.find("i");

			$playBtn.removeClass("hide");
			video.load();
			$playingVideoContainer = null;
		}
	});

	// video handler
	var $playingVideoContainer = void 0;

	$(".video-container").on("click", function () {
		var $this = $(this);

		var video = $this.find("video")[0];
		var $playBtn = $this.find("i");

		if (video.paused == true) {
			$playingVideoContainer = $this;
			video.play();
			$playBtn.addClass("hide");
		} else {
			video.pause();
			$playBtn.removeClass("hide");
		}

		video.onended = function () {
			$playBtn.removeClass("hide");
			video.load();
		};
	});

	// init selects
	$(".nice-select").niceSelect();

	// init masonry and grid toggler
	var initMasonryAndGridToggler = function () {
		var $masonryGrid = $(".product-cards-grid");
		$masonryGrid.masonry({
			columnWidth: 280,
			itemSelector: ".product-cards-grid__item",
			gutter: 26
		});

		var $productFilter = $(".products__filter");
		$(".filter-toggle__btn").on("click", function () {
			var $this = $(this);

			$this.toggleClass("is-active");
			$productFilter.toggleClass("is-open");
			setTimeout(function () {
				$masonryGrid.masonry("layout");
			}, 430);
		});
	}();

	// init cart preview (header tip)
	new Tippy($(".header-cart")[0], {
		html: "#cart-preview",
		trigger: "click",
		position: "bottom",
		interactive: true,
		arrow: true,
		animation: 'fade',
		theme: "custom"
	});

	new Tippy($(".cvv-tip")[0], {
		// html: "#cart-preview",
		// trigger: "click",
		// position: "bottom",
		// interactive: true,
		// arrow: true,
		// animation: 'fade',
		// theme: "custom"
	});

	var initProductFotorama = function () {
		var $fotoramaDiv = $('.product-fotorama').on('fotorama:show', function (e, fotorama, extra) {
			highlightThumbnail(fotorama.activeIndex);
		}).fotorama();

		// API
		var fotorama = $fotoramaDiv.data('fotorama');

		// !!!!!Thumbnails click-handler
		var $productThumbnails = $(".product-thumbs__item");

		$productThumbnails.on("click", function (e) {
			var $this = $(this);
			var thumbIndex = $this.index();

			highlightThumbnail(thumbIndex);

			fotorama.show(thumbIndex);
		});

		function highlightThumbnail(index) {
			$productThumbnails.removeClass("is-active");
			$productThumbnails.eq(index).addClass("is-active");
		}
	}();

	var initCustomInputNumber = function () {
		jQuery('<div class="quantity-button quantity-up">+</div>' + '<div class="quantity-button quantity-down">-</div>').insertAfter('.quantity input');

		jQuery('.quantity').each(function () {
			var spinner = jQuery(this),
			    input = spinner.find('input[type="number"]'),
			    btnUp = spinner.find('.quantity-up'),
			    btnDown = spinner.find('.quantity-down'),
			    min = input.attr('min'),
			    max = input.attr('max');

			btnUp.click(function () {
				var oldValue = parseFloat(input.val());
				if (oldValue >= max) {
					var newVal = oldValue;
				} else {
					var newVal = oldValue + 1;
				}
				spinner.find("input").val(newVal);
				spinner.find("input").trigger("change");
			});

			btnDown.click(function () {
				var oldValue = parseFloat(input.val());
				if (oldValue <= min) {
					var newVal = oldValue;
				} else {
					var newVal = oldValue - 1;
				}
				spinner.find("input").val(newVal);
				spinner.find("input").trigger("change");
			});
		});
	}();

	$(".brand-preview__toggler").on("click", function () {
		var $this = $(this);
		var $textBlock = $this.siblings(".brand-preview__text");
		var textBlockScrollHeight = $textBlock.get(0).scrollHeight;
		var textBlockPreviewHeight = 100;
		var $openText = $this.find(".btn-more__open");
		var $closeText = $this.find(".btn-more__close");

		// btn toggle class
		$this.toggleClass("is-active");

		if ($this.hasClass("is-active")) {
			// open text
			$textBlock.height(textBlockScrollHeight); // set textblock height

			// animate text
			$openText.fadeOut("fast", function () {
				$closeText.fadeIn("fast");
			});
		} else {
			// close text
			$textBlock.css("height", textBlockPreviewHeight); // set textblock height
			// animate text
			$closeText.fadeOut("fast", function () {
				$openText.fadeIn("fast");
			});
		}
	});
});