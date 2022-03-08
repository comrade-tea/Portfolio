"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
	var $document = $(document);
	var $window = $(window);

	var $header = $(".header");
	var $html = $("html");
	var $body = $("body");

	// home scroll options
	var enableHomeSectionScroll = void 0;

	var changeSectionTime = 1.2;
	var parallaxTime = 1.2;
	var parallaxForward = 70; // % percent

	// когда-нибудь
	// let homeScrollOptions = {
	// 	changeSectionTime: 1.2,
	// 	parallaxTime: 1.2,
	// 	parallaxForward: 70
	// };

	// home panels globals
	var homePanelsisActive = false;
	var $activePanel = void 0;
	var $activePanelLink = void 0;
	var panelTimeout = void 0;
	var closePanelTime = 1300;

	function closeActivePanel() {
		clearInterval(panelTimeout);

		if ($activePanel) {
			$(".section-hero").removeClass("section-hero--overlay");
			if ($activePanelLink) $activePanelLink.removeClass("is-active");

			TweenMax.to($activePanel, 0.3, {
				x: "100%", opacity: 0, ease: Power3.easeInOut, onComplete: function onComplete() {
					$activePanel = null;
					$activePanelLink = null;
					homePanelsisActive = false;
				}
			});
		}
	}

	function toggleBodyOverflow() {
		$body.toggleClass("body-hidden");
	}

	// $('.navigation').perfectScrollbar();

	// phone input mask
	$("input[type='tel']").mask("+7(999) 999-9999", { autoclear: false });

	$(".slick").slick({
		dots: true,
		arrows: false
	});

	function canISectionScroll() {
		if ($window.height() <= 400 && $(".p-home").length) {
			enableHomeSectionScroll = false;
			$html.addClass("disable-auto-scroll");
		} else {
			enableHomeSectionScroll = true;
		}
	}

	// enableHomeSectionScroll = true;
	canISectionScroll();

	var initAboutPopup = function () {
		var $popups = $(".person-popup");
		var $activePopup = void 0;

		if ($popups.length) {
			$("[data-person-id]").on("click", function () {
				var $this = $(this);
				var id = $this.attr("data-person-id");
				$activePopup = $("#" + id);

				toggleBodyOverflow();
				// $popup.addClass("person-popup--open");
				TweenMax.to($activePopup, 0.4, { x: "0%", opacity: 1, ease: Power3.easeIn });
			});

			$(".person-popup__back").on("click", function () {
				toggleBodyOverflow();
				// $popups.removeClass("person-popup--open");
				TweenMax.to($activePopup, 0.2, {
					x: "-100%", opacity: 0, ease: Power3.easeIn, onComplete: function onComplete() {
						$activePopup = null;
					}
				});
			});

			$(document).keyup(function (e) {
				if (e.keyCode == 27) {
					// escape key maps to keycode `27`
					toggleBodyOverflow();
					// $popups.removeClass("person-popup--open");
					TweenMax.to($activePopup, 0.2, { x: "-100%", opacity: 0, ease: Power3.easeIn });
					// $activePopup = null;
				}
			});
		}
	}();

	var initProjectDetails = function () {
		var $pdSlider = $(".pd-slider");
		var $currentEl = $(".fraction__current");
		var $totalEl = $(".fraction__max");

		$pdSlider.on("init reInit beforeChange afterChange", function (event, slick, currentSlide, nextSlide) {
			// set current slide number
			var i = (currentSlide ? currentSlide : 0) + 1;
			$currentEl.text(i);

			// set total number of slides
			if (event.type == "init") {
				$totalEl.html(slick.slideCount);
			}

			// apply effects
			if (event.type == "beforeChange") {
				// enable for 3+ slides
				$(slick.$slides).removeClass("slick-out");
				$(slick.$slides[currentSlide]).addClass("slick-out");
			}
		});

		// init slider
		$pdSlider.slick({
			fade: true,
			speed: 1400,
			responsive: [{
				breakpoint: 640,
				settings: {
					dots: true
				}
			}]
		});

		// pd slider arrows
		$("[data-pdslider-arr]").on("click", function () {
			var $this = $(this);
			var direction = $this.attr("data-pdslider-arr");

			if (direction == "next") {
				$pdSlider.slick("slickNext");
			} else {
				$pdSlider.slick("slickPrev");
			}
		});

		// panel lg/sm toggle
		var $panel = $(".pd-panel");
		$(".pd-panel-head__info").on("click", function () {
			$panel.toggleClass("pd-panel--closed");
		});
	}();

	var initAnimateBlocks = function () {
		if ($window.width() < 576) {
			$("[data-aos-delay]").attr("data-aos-delay", "0");
		}

		AOS.init({
			// offset: 200,
			duration: 600,
			easing: "ease-out",
			once: true
		});
	}();

	//disable: window.innerWidth < 576
	// delay: 100,
	var initServiceToggle = function () {
		var $currentDDown = void 0;
		// let $ddownItems = $(".ddown");

		$(".ddown-head").on("click", function () {
			var $this = $(this);
			var $parent = $this.parent();
			var $body = $this.siblings(".ddown-body");

			// open
			if (!$currentDDown) {
				// console.log("meh1?");
				$parent.addClass("ddown--active");
				$body.slideDown();

				$currentDDown = $parent;
			} else if ($parent[0] == $currentDDown[0]) {
				// console.log("meh?2");
				$currentDDown.removeClass("ddown--active");
				$currentDDown.find(".ddown-body").slideUp();

				$currentDDown = null;
			} else {
				$currentDDown.removeClass("ddown--active");
				$currentDDown.find(".ddown-body").slideUp();

				$parent.addClass("ddown--active");
				$body.slideDown();

				$currentDDown = $parent;
			}

			// slick fix
			var $slider = $($body.find(".slick"));
			if ($slider.length) {
				$slider.css('display', 'block');
				$slider.get(0).slick.setPosition();
			}
		});
	}();

	var initMap = function () {
		if ($("#map").length) {
			(function () {
				var center = new google.maps.LatLng(55.706822, 37.662144);
				var mapOptions = {
					zoom: 14,
					scrollwheel: false,
					center: center,
					styles: [{
						"featureType": "landscape",
						"stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }]
					}, {
						"featureType": "poi",
						"stylers": [{ "saturation": -100 }, { "lightness": 51 }, { "visibility": "simplified" }]
					}, {
						"featureType": "road.highway",
						"stylers": [{ "saturation": -100 }, { "visibility": "simplified" }]
					}, {
						"featureType": "road.arterial",
						"stylers": [{ "saturation": -100 }, { "lightness": 30 }, { "visibility": "on" }]
					}, {
						"featureType": "road.local",
						"stylers": [{ "saturation": -100 }, { "lightness": 40 }, { "visibility": "on" }]
					}, {
						"featureType": "transit",
						"stylers": [{ "saturation": -100 }, { "visibility": "simplified" }]
					}, { "featureType": "administrative.province", "stylers": [{ "visibility": "off" }] }, {
						"featureType": "water",
						"elementType": "labels",
						"stylers": [{ "visibility": "on" }, { "lightness": -25 }, { "saturation": -100 }]
					}, {
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }]
					}]

				};
				var map = new google.maps.Map(document.getElementById('map'), mapOptions);

				var marker = new google.maps.Marker({
					// position: {lat: 55.808254, lng: 37.6164365},
					position: center,
					map: map,
					animation: google.maps.Animation.DROP,
					icon: "/media/img/map-point.png",
					title: 'ООО «Росика»'
				});

				var contentString = "Москва, 1-ый Кожуховский проезд, дом 11";
				var infowindow = new google.maps.InfoWindow({
					content: contentString
				});
				marker.addListener('click', function () {
					infowindow.open(map, marker);
				});
			})();
		}
	}();

	var initMenu = function () {
		var $menu = $("#menu");
		var $menuPanel = $(".menu-panel");
		var navDelay = 0.4;
		var openTime = 0.3;

		function closeMenu() {
			if (Modernizr.touchevents) {
				toggleBodyOverflow();
			}

			$menuPanel.removeClass("menu-panel--open");
			$menu.attr("disabled", true);

			new TimelineMax().staggerTo(".nav__item", 0.05, { opacity: 0, x: "-40px", ease: Power2.easeInOut }, -0.05, "sync").to(".navigation", 0.5, {
				height: "0%",
				// ease: Power3.easeInOut,
				onComplete: function onComplete() {
					$menu.attr("disabled", false);
				}
			}, "sync");
		}

		function openMenu() {
			if (Modernizr.touchevents) {
				toggleBodyOverflow();
			}

			$menu.attr("disabled", true);
			$menuPanel.addClass("menu-panel--open");

			new TimelineMax().to(".navigation", openTime, {
				height: "100%",
				onComplete: function onComplete() {
					$menu.attr("disabled", false);
				}
			}, navDelay).staggerFromTo(".nav__item", 0.3, { opacity: 0, x: "-40px" }, {
				opacity: 1, x: "0px", ease: Power2.easeInOut
			}, 0.1, navDelay);
		}

		$menu.on("click", function () {
			if ($menuPanel.hasClass("menu-panel--open")) {
				closeMenu();
			} else {
				openMenu();
			}
		});

		// close on missclick
		var mobileNavClass = "navigation";
		$(document).on("click", function (e) {
			if (!$(e.target).is($menu) && !$menu.find(e.target).length && !$(e.target).hasClass(mobileNavClass) && !$("." + mobileNavClass).find(e.target).length && $menuPanel.hasClass("menu-panel--open")) {
				closeMenu();
			}
		});
	}();

	var initHomeScroll = function () {

		if ($(".p-home").length && enableHomeSectionScroll) {
			(function () {
				var setDotsColor = function setDotsColor($nextSection) {

					if ($nextSection) {
						var navColor = $nextSection.data("nav-color");
						if (navColor) {
							$homeNav.css("border-color", navColor);
						} else {
							$homeNav.css("border-color", "#000000");
						}
					} else {
						// 1st section on init
						var _navColor = $activeSection.data("nav-color");
						if (_navColor) {
							$homeNav.css("border-color", _navColor);
						} else {
							$homeNav.css("border-color", "#000000");
						}
					}
				};

				var fadeoutScrollDown = function fadeoutScrollDown() {
					TweenMax.to(".scroll-down", 0.3, { opacity: 0 });
				};

				var fadeInScrollDown = function fadeInScrollDown() {
					TweenMax.to(".scroll-down", 1, { opacity: 1 });
				};

				var fadeSection = function fadeSection(index) {
					if (!isActive) {
						isActive = true;

						TweenMax.to($sections, 0.3, {
							opacity: 0, onComplete: function onComplete() {
								var direction = activeIndex < index ? "next" : "prev";
								var indexStart = activeIndex; // duplicate for loop

								for (var i = 0; i < Math.abs(indexStart - index); i++) {
									if (direction === "next") {
										nextSnap();
									} else {
										prevSnap();
									}
								}

								TweenMax.set($activeSection, { xPercent: 0, yPercent: 0 });
								TweenMax.to($activeSection, 1, {
									opacity: 1, onComplete: function onComplete() {
										TweenMax.set($sections, { opacity: 1 });
										isActive = false;
									}
								});
							}
						});
					}

					function nextSnap() {
						if (activeIndex === 0) {
							closeActivePanel();
							// fadeoutScrollDown();
						}

						activeIndex++;

						mixSections(activeIndex, "next");
					}

					function prevSnap() {
						// isActive = true;
						activeIndex--;

						// $navItems.removeClass("is-active");
						// $navItems.eq(activeIndex).addClass("is-active");

						mixSections(activeIndex, "prev");
					}
				};

				var nextSection = function nextSection() {
					if (activeIndex < $sections.length - 1 && !isActive) {
						if (activeIndex === 0 && $activePanelLink) {
							closeActivePanel();
						}

						isActive = true;
						activeIndex++;

						$navItems.removeClass("is-active");
						$navItems.eq(activeIndex).addClass("is-active");

						animateSection(activeIndex, "next");
					}
				};

				var prevSection = function prevSection() {
					if (activeIndex !== 0 && !isActive) {
						isActive = true;
						activeIndex--;

						$navItems.removeClass("is-active");
						$navItems.eq(activeIndex).addClass("is-active");

						animateSection(activeIndex, "prev");
					}
				};

				var mixSections = function mixSections(nextIndex, direction) {
					var _TweenMax$set2;

					var $nextSection = $sections.eq(nextIndex);
					var nextSectionData = void 0;

					var $parallaxImgActive = $activeSection.find(".parallax-block__img-w img").length ? $activeSection.find(".parallax-block__img-w img") : $activeSection.find(".section-hero__bg img");
					var $parallaxImgNext = $nextSection.find(".parallax-block__img-w img").length ? $nextSection.find(".parallax-block__img-w img") : $nextSection.find(".section-hero__bg img");

					// console.log($parallaxImgActive, $parallaxImgNext);

					var axis = void 0;
					var translateValue = void 0;

					// set nav color
					setDotsColor($nextSection);

					// move forward
					if (direction === "next") {
						nextSectionData = $nextSection.attr("data-from");

						switch (nextSectionData) {
							case "left":
								translateValue = "+=100";
								axis = "xPercent";

								TweenMax.set($parallaxImgActive, { xPercent: "-" + parallaxForward + "%" });
								TweenMax.set($parallaxImgNext, { xPercent: "0%" });
								break;

							case "right":
								translateValue = "-=100";
								axis = "xPercent";

								TweenMax.set($parallaxImgActive, { xPercent: parallaxForward + "%" });
								TweenMax.set($parallaxImgNext, { xPercent: "0%" });
								break;

							case "bottom":
								translateValue = "-=100";
								axis = "yPercent";

								TweenMax.set($parallaxImgActive, { yPercent: parallaxForward + "%" });
								TweenMax.set($parallaxImgNext, { yPercent: "0%" });
								break;
						}
					}

					// move back
					else {
							nextSectionData = $activeSection.attr("data-from");

							switch (nextSectionData) {
								case "left":
									translateValue = "-=100";
									axis = "xPercent";

									TweenMax.set($parallaxImgActive, { xPercent: parallaxForward + "%" });
									TweenMax.set($parallaxImgNext, { xPercent: "0%" });

									break;

								case "right":
									translateValue = "+=100";
									axis = "xPercent";

									TweenMax.set($parallaxImgActive, { xPercent: "-" + parallaxForward + "%" });
									TweenMax.set($parallaxImgNext, { xPercent: "0%" });
									break;
								case "bottom":
									translateValue = "+=100";
									axis = "yPercent";

									TweenMax.set($parallaxImgActive, { yPercent: "-" + parallaxForward + "%" });
									TweenMax.set($parallaxImgNext, { yPercent: "0%" });
									break;
							}
						}

					// animate blocks (translate)
					TweenMax.set($activeSection, _defineProperty({}, axis, translateValue));
					TweenMax.set($nextSection, (_TweenMax$set2 = {}, _defineProperty(_TweenMax$set2, axis, translateValue), _defineProperty(_TweenMax$set2, "onComplete", function onComplete() {

						$navItems.removeClass("is-active");
						$navItems.eq(activeIndex).addClass("is-active");
					}), _TweenMax$set2));

					// change active slide
					$activeSection.removeClass("section--active");
					$activeSection = $nextSection.addClass("section--active");
				};

				var animateSection = function animateSection(nextIndex, direction) {
					var _TweenLite$to2;

					var $nextSection = $sections.eq(nextIndex);
					var nextSectionData = void 0;

					var $parallaxImgActive = $activeSection.find(".parallax-block__img-w img").length ? $activeSection.find(".parallax-block__img-w img") : $activeSection.find(".section-hero__bg img");
					var $parallaxImgNext = $nextSection.find(".parallax-block__img-w img").length ? $nextSection.find(".parallax-block__img-w img") : $nextSection.find(".section-hero__bg img");

					// console.log($parallaxImgActive);
					// console.log($parallaxImgActive, $parallaxImgNext);

					var axis = void 0;
					var translateValue = void 0;

					// set nav color
					setDotsColor($nextSection);

					// move forward
					if (direction === "next") {
						nextSectionData = $nextSection.attr("data-from");

						switch (nextSectionData) {
							case "left":
								translateValue = "+=100";
								axis = "xPercent";

								TweenMax.fromTo($parallaxImgActive, parallaxTime, { xPercent: "0%" }, { xPercent: "-" + parallaxForward + "%" });
								TweenMax.fromTo($parallaxImgNext, parallaxTime, { xPercent: parallaxForward + "%" }, { xPercent: "0%" });
								break;

							case "right":
								translateValue = "-=100";
								axis = "xPercent";

								TweenMax.fromTo($parallaxImgActive, parallaxTime, { xPercent: "0%" }, { xPercent: parallaxForward + "%" });
								TweenMax.fromTo($parallaxImgNext, parallaxTime, { xPercent: "-" + parallaxForward + "%" }, { xPercent: "0%" });
								break;

							case "bottom":
								translateValue = "-=100";
								axis = "yPercent";

								TweenMax.fromTo($parallaxImgActive, parallaxTime, { yPercent: "0%" }, { yPercent: parallaxForward + "%" });
								TweenMax.fromTo($parallaxImgNext, parallaxTime, { yPercent: "-" + parallaxForward + "%" }, { yPercent: "0%" });
								break;
						}
					}

					// move back
					else {
							nextSectionData = $activeSection.attr("data-from");

							switch (nextSectionData) {
								case "left":
									translateValue = "-=100";
									axis = "xPercent";

									TweenMax.fromTo($parallaxImgActive, parallaxTime, { xPercent: "0%" }, { xPercent: parallaxForward + "%" });
									TweenMax.fromTo($parallaxImgNext, parallaxTime, { xPercent: "-" + parallaxForward + "%" }, { xPercent: "0%" });

									break;

								case "right":
									translateValue = "+=100";
									axis = "xPercent";

									TweenMax.fromTo($parallaxImgActive, parallaxTime, { xPercent: "0%" }, { xPercent: "-" + parallaxForward + "%" });
									TweenMax.fromTo($parallaxImgNext, parallaxTime, { xPercent: parallaxForward + "%" }, { xPercent: "0%" });
									break;
								case "bottom":
									translateValue = "+=100";
									axis = "yPercent";

									TweenMax.fromTo($parallaxImgActive, parallaxTime, { yPercent: "0%" }, { yPercent: "-" + parallaxForward + "%" });
									TweenMax.fromTo($parallaxImgNext, parallaxTime, { yPercent: parallaxForward + "%" }, { yPercent: "0%" });
									break;
							}
						}

					// animate blocks (translate)
					TweenLite.to($activeSection, changeSectionTime, _defineProperty({}, axis, translateValue));
					TweenLite.to($nextSection, changeSectionTime, (_TweenLite$to2 = {}, _defineProperty(_TweenLite$to2, axis, translateValue), _defineProperty(_TweenLite$to2, "onComplete", function onComplete() {
						isActive = false;
					}), _TweenLite$to2));

					// tl.add([tweenCurrentSection, tweenNextSection]);

					// change active slide
					$activeSection.removeClass("section--active");
					$activeSection = $nextSection.addClass("section--active");
				};

				$window.on("orientationchange", function (e) {
					setTimeout(function () {
						// alert(`${$window.width() > $window.height()}, please disable`);
						if ($window.width() > $window.height()) {
							// alert("wtf?");
							enableHomeSectionScroll = false;
							$html.addClass("disable-auto-scroll");
						} else {
							console.log("portrait");
						}
					}, 300);
				});

				var isActive = false;
				var activeIndex = 0;
				var $activeSection = $(".section--active");
				var $sections = $(".section");
				var $homeNav = $(".home-nav");
				var $navItems = $(".home-nav__item");

				// key handler
				$document.keydown(function (e) {
					if (enableHomeSectionScroll) {
						switch (e.which) {
							case 38:
								// up
								prevSection();
								break;
							case 40:
								// down
								nextSection();
								break;

							default:
								return; // exit this handler for other keys
						}
					}

					e.preventDefault(); // prevent the default action (scroll / move caret)
				});

				// mouse handler
				$window.on("mousewheel DOMMouseScroll", function (e) {
					if (enableHomeSectionScroll) {
						if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
							//UP
							prevSection();
						} else {
							//DOWN
							nextSection();
						}
					}
				});

				// swipe handler
				window.mc = new Hammer($("#section-wrap")[0]);
				mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
				mc.on("panup pandown", function (ev) {
					if (enableHomeSectionScroll) {
						var _direction = ev.type;

						if (_direction == "panup") {
							nextSection();
						} else if (_direction == "pandown") {
							prevSection();
						}
					}
				});

				// page dots
				$navItems.on("click", function () {
					if (enableHomeSectionScroll) {
						var $this = $(this);
						var sectionIndex = +$this.attr("data-to-section");

						fadeSection(sectionIndex);
					}
				});

				$(".scroll-down").on("click", function () {
					if (enableHomeSectionScroll) {
						nextSection();
					} else {
						$("html, body").animate({ scrollTop: $window.height() }, 1000);
					}
				});

				$(".footer-bot__scrolltop").on("click", function () {
					if (enableHomeSectionScroll) {
						fadeSection(0);
					} else {
						$("html, body").animate({ scrollTop: 0 }, 1000);
					}
				});

				TweenMax.set($("[data-from=\"bottom\"]"), { yPercent: 100 });
				TweenMax.set($("[data-from=\"left\"]"), { xPercent: -100 });
				TweenMax.set($("[data-from=\"right\"]"), { xPercent: 100 });
			})();
		} // end if
	}();

	var initHomePanels = function () {

		var $panelsWrap = $(".panels-wrap");
		var $panelLinks = $("[data-show-panel]");

		$panelLinks.on("mouseenter mousemove", function () {
			var $sectionHero = $(".section-hero");

			panelTimeout = clearInterval(panelTimeout);

			if ($sectionHero.hasClass("section--active") && !homePanelsisActive) {

				var $this = $(this);
				var id = $this.attr("data-show-panel");
				var $newPanel = $("#" + id);

				if (!$activePanel) {
					homePanelsisActive = true;

					$activePanel = $newPanel;
					$activePanelLink = $this.addClass("is-active");
					$sectionHero.addClass("section-hero--overlay");
					TweenMax.to($newPanel, 0.3, { x: "0%", opacity: 1, onComplete: function onComplete() {
							homePanelsisActive = false;
						} });

					panelTimeout = setTimeout(closeActivePanel, closePanelTime);
				} else if (!$this.hasClass("is-active") && !homePanelsisActive) {
					homePanelsisActive = true;

					var $oldActivePanel = $activePanel;
					$activePanel = $newPanel;

					$activePanelLink.removeClass("is-active");
					$activePanelLink = $this.addClass("is-active");

					new TimelineLite().to($oldActivePanel, 0.4, { x: "100%", opacity: 0 }, "sync").to($activePanel, 0.3, {
						x: "0%", opacity: 1, onComplete: function onComplete() {
							homePanelsisActive = false;
							// $activePanel = $newPanel;
						}
					}, "sync");
				}
			}
		});
		$panelLinks.on("mouseleave", function () {
			panelTimeout = setTimeout(closeActivePanel, closePanelTime);
		});

		$panelsWrap.on("mouseenter mousemove", function () {
			panelTimeout = clearInterval(panelTimeout);
		});
		$panelsWrap.on("mouseleave", function () {
			panelTimeout = setTimeout(closeActivePanel, closePanelTime);
		});
	}();

	var initPageNotHome = function () {
		if (!$(".p-home").length) {

			$(".footer-bot__scrolltop").on("click", function () {
				$("html, body").animate({ scrollTop: 0 }, 1000);
			});
		}
	}();
});