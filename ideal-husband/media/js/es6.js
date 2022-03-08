$(function () {
	const $document = $(document);
	const $window = $(window);

	const $header = $(".header");
	const _iconPath = "media/img/";
	const _headerHeight = 122;
	const _headerHeightSmallDevice = 68;


	let initPageNavDEV = (function () {
		function pageWidget(pages) {
			let widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
			widgetWrap.prependTo("body");
			for (let i = 0; i < pages.length; i++) {
				$('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
			}
			let widgetStilization = $('<style>body {position:relative} .widget_wrap{position:fixed;top:0;left:0;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline} </style>');
			widgetStilization.prependTo(".widget_wrap");
		}

		pageWidget([
			"home",
			"blog",
			"blog-details",
			"not-found"
		]);
	}());

	let initMobileNav = (function () {

		// hamburger click handler
		let $mobileMenuButton = $("[data-mnav-toggler]");
		$mobileMenuButton.on("click", function (e) {
			e.preventDefault();
			let $this = $(this);

			if ($this.hasClass("open")) {
				closeNav();
			} else {
				openNav();
			}
		});

		// out of menu handler
		let mobileNavClass = "mobile-menu";
		$(document).on("click", function (e) {
			if (!$(e.target).is(".hamburger, .hamburger span")
				&& !$(e.target).hasClass(mobileNavClass)
				&& !$(`.${mobileNavClass}`).find(e.target).length
			) {
				closeNav();
			}
		});

		$(".mobile-nav__link").on("click", function () {
			closeNav();
		});

		function openNav() {
			$(".mobile-menu").addClass("is-open");
			$(".wrapper").addClass("is-blacked");
			$mobileMenuButton.addClass("open");
		}

		function closeNav() {
			$(".mobile-menu").removeClass("is-open");
			$(".wrapper").removeClass("is-blacked");
			$mobileMenuButton.removeClass("open");
		}
	}());

	if ($(".p-home").length) {
		$("[data-nav]").onePageNav();
	}

	// phone input mask
	//$("input[type='tel']").mask("+7(999) 999-9999", {autoclear: false});

	$(".slick").slick({
		dots: true,
		arrows: false
	});

	// scroll 2 handler
	$("[data-scroll-to]").on("click", function (e) {
		e.preventDefault();

		let $this = $(this);
		let scrollTo = $this.data("scroll-to");

		if (scrollTo == "top") {
			$('html, body').animate({
				scrollTop: 0
			}, 1000);
		}
		else if ($(scrollTo).length) {
			let scrollTop = $(scrollTo).offset().top;
			$("html, body").animate({
				scrollTop: scrollTop - ($window.width() > 640 ? _headerHeight : _headerHeightSmallDevice)
			}, 1000);
		}
		else {
			console.warn("There is no element with this id");
		}
	});

	$("[data-show-reviews]").on("click", function (e) {
		e.preventDefault();

		let $this = $(this);
		let $clientBlock = $this.closest(".client-block");

		$clientBlock.removeClass("client-block--partly-hide");
		$this.hide();
	});

	let initBlockAnimations = (function () {

		let lineSpeed = 0.8;
		let textSpeed = 0.4;

		if ($window.width() < 700) {
			console.log("ok");
			lineSpeed = 0.4;
			textSpeed = 0.2;
		}

		if ($window.width() < 576) {
			$("[data-aos-delay]").attr("data-aos-delay", "0");
		}
		AOS.init({
			// offset: 200,
			duration: 600,
			easing: "ease-out",
			once: true,
			//disable: window.innerWidth < 576
			// delay: 100,
		});

		//AOS.refresh();

		window.sr = ScrollReveal();
		sr.reveal('.block-title', {
			beforeReveal: function (domEl) {
				let $this = $(domEl);
				let $line = $this.find(".block-title__line");
				let $allText = $this.find(".block-title__info");

				let tl = new TimelineLite();
				tl
					.to($line, lineSpeed, {x: "0"})
					.to($allText, textSpeed, {opacity: 1, x: 0});
			}
		});

		sr.reveal(".link-more", {
			distance: '10px',
			scale: 0.9,
			duration: 300,
			delay: 240,
			//reset: true,
		});

		if ($window.width() > 576) {
			sr.reveal(".client-block__title", {
				distance: '0px',
				scale: 1,
				duration: 200,
				delay: 200,
			});
		}
	}());

	let initCube = (function () {
		// if ($(".cube").length && !$("html").hasClass("no-preserve3d")) {
		if ($(".cube").length) {

			// CUBE animation and change size on resze
			let front = $(".front");
			let left = $(".left");
			let right = $(".right");
			let bottom = $(".bottom");
			let back = $(".back");
			let top = $(".top");

			if (!$("html").hasClass("no-preserve3d")) {

				/*		var leftButtonDown = false;

				 $(document).mousedown(function (e) {
				 if (e.which === 1) leftButtonDown = true;
				 });
				 $(document).mouseup(function (e) {
				 if (e.which === 1) leftButtonDown = false;
				 });

				 function tweakMouseMoveEvent(e) {
				 // Check from jQuery UI for IE versions < 9
				 if ($.browser.msie && !e.button && !(document.documentMode >= 9)) {
				 leftButtonDown = false;
				 }
				 if (e.which === 1 && !leftButtonDown) e.which = 0;
				 }*/

				/*
				 $(document).on("mousemove touchmove", function (e) {
				 // Call the tweak function to check for LMB and set correct e.which
				 // tweakMouseMoveEvent(e);

				 if (leftButtonDown) {
				 console.log("wheeel")
				 $(".cube").css({
				 "transform": `rotateX(+${e.pageY}deg) rotateY(+${e.pageX}deg)`
				 })

				 console.log($(".cube").css("transform"));
				 }
				 });
				 */

				// init cube rotation
				function initCubeRotate() {
					// var hammertime = new Hammer(document.getElementById("cube"));
					let hammertime = new Hammer(document.getElementById("cube-wrap"));
					let currentDrag = {x: 0, y: 0};

					// save dragged position "on" drag end
					hammertime.on("panstart", function (ev) {
						$("body").addClass("cursor-rotate");
					});

					hammertime.on("panend", function (ev) {
						currentDrag.x += ev.deltaX;
						currentDrag.y += ev.deltaY;

						$("body").removeClass("cursor-rotate");
					});

					// rotate cube on drag
					hammertime.on("pan", function (ev) {
						// $("body").css("cursor", "auto");
						TweenMax.to(".cube", 0.5, {
							rotationX: ev.deltaX + currentDrag.x,
							rotationY: ev.deltaY + currentDrag.y,
							ease: Power3.easeOut
						});
					});
				}


				let zAxis;
				let transformOrigin;

				function updateZAxis() {
					if ($window.width() > 700) {
						zAxis = "-430px";
						transformOrigin = "50% 50% -181px"
					} else {
						zAxis = "-150px";
						transformOrigin = "50% 50% -75px"
					}

					TweenMax.set(".cube", {transformOrigin: transformOrigin});
					TweenMax.set(back, {z: zAxis});
					TweenMax.set(top, {z: zAxis});

				}

				updateZAxis();
				$window.resize(updateZAxis);

				// set origin position of cube sides
				TweenMax.set(front, {rotationX: "-90deg"});
				TweenMax.set(left, {rotationY: "90deg", rotationX: "90deg"});
				TweenMax.set(right, {rotationY: "-90deg", rotationX: "90deg"});
				TweenMax.set(back, {rotationY: "180deg", rotationX: "-90deg"});
				TweenMax.set(top, {rotationX: "-110deg"});

				// animate cube build
				let tl = new TimelineMax();
				tl
					.to(front, 2, {opacity: 1, rotationX: "0deg", ease: Power4.easeOut}, "sync")
					.to(back, 2, {opacity: 1, rotationX: "0deg", ease: Power4.easeOut}, "sync")
					.to(bottom, 2, {opacity: 1}, "sync")
					.to(left, 2, {opacity: 1, rotationX: "0deg", ease: Power4.easeOut}, "sync2-=1.6")
					.to(right, 2, {opacity: 1, rotationX: "0deg", ease: Power4.easeOut}, "sync2-=1.6")
					.to(top, 2, {opacity: 1, rotationX: "-270deg", ease: Power4.easeOut}, "sync2-=1")
					.to(".hero__title", 0.4, {opacity: 1})
					.to(".hero__subtitle", 0.4, {opacity: 1})
					.set(".hero-scroll", {className: "+=is-open", onComplete: initCubeRotate});
			}

			else {
				/*animate only text*/
				let tl = new TimelineMax();
				tl
					.to(".hero__title", 0.4, {opacity: 1})
					.to(".hero__subtitle", 0.4, {opacity: 1})
					.set(".hero-scroll", {className: "+=is-open"});
			}
		}
	}());


});