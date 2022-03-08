$(function () {
	const $document = $(document);
	const $window = $(window);

	const $header = $(".header");
	const $html = $("html");
	const $body = $("body");

	// home scroll options
	let enableHomeSectionScroll;

	let changeSectionTime = 1.2;
	let parallaxTime = 1.2;
	let parallaxForward = 70; // % percent

	// когда-нибудь
	// let homeScrollOptions = {
	// 	changeSectionTime: 1.2,
	// 	parallaxTime: 1.2,
	// 	parallaxForward: 70
	// };

	// home panels globals
	let homePanelsisActive = false;
	let $activePanel;
	let $activePanelLink;
	let panelTimeout;
	let closePanelTime = 1300;

	function closeActivePanel() {
		clearInterval(panelTimeout);

		if ($activePanel) {
			$(".section-hero").removeClass("section-hero--overlay");
			if ($activePanelLink)
				$activePanelLink.removeClass("is-active");

			TweenMax.to($activePanel, 0.3, {
				x: "100%", opacity: 0, ease: Power3.easeInOut, onComplete: function () {
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
	$("input[type='tel']").mask("+7(999) 999-9999", {autoclear: false});

	$(".slick").slick({
		dots: true,
		arrows: false
	});

	function canISectionScroll() {
		if ($window.height() <= 400 && $(".p-home").length) {
			enableHomeSectionScroll = false;
			$html.addClass("disable-auto-scroll");
		}
		else {
			enableHomeSectionScroll = true;
		}
	}

	// enableHomeSectionScroll = true;
	canISectionScroll();


	let initAboutPopup = (function () {
		let $popups = $(".person-popup");
		let $activePopup;

		if ($popups.length) {
			$("[data-person-id]").on("click", function () {
				let $this = $(this);
				let id = $this.attr("data-person-id");
				$activePopup = $(`#${id}`);

				toggleBodyOverflow();
				// $popup.addClass("person-popup--open");
				TweenMax.to($activePopup, 0.4, {x: "0%", opacity: 1, ease: Power3.easeIn});
			});

			$(".person-popup__back").on("click", function () {
				toggleBodyOverflow();
				// $popups.removeClass("person-popup--open");
				TweenMax.to($activePopup, 0.2, {
					x: "-100%", opacity: 0, ease: Power3.easeIn, onComplete: function () {
						$activePopup = null;
					}
				});
			});

			$(document).keyup(function (e) {
				if (e.keyCode == 27) { // escape key maps to keycode `27`
					toggleBodyOverflow();
					// $popups.removeClass("person-popup--open");
					TweenMax.to($activePopup, 0.2, {x: "-100%", opacity: 0, ease: Power3.easeIn});
					// $activePopup = null;
				}
			});
		}
	}());

	let initProjectDetails = (function () {
		let $pdSlider = $(".pd-slider");
		let $currentEl = $(".fraction__current");
		let $totalEl = $(".fraction__max");

		$pdSlider.on("init reInit beforeChange afterChange", function (event, slick, currentSlide, nextSlide) {
			// set current slide number
			let i = (currentSlide ? currentSlide : 0) + 1;
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
			responsive: [
				{
					breakpoint: 640,
					settings: {
						dots: true
					}
				},
			]
		});

		// pd slider arrows
		$("[data-pdslider-arr]").on("click", function () {
			let $this = $(this);
			let direction = $this.attr("data-pdslider-arr");

			if (direction == "next") {
				$pdSlider.slick("slickNext");
			}
			else {
				$pdSlider.slick("slickPrev");
			}
		});

		// panel lg/sm toggle
		let $panel = $(".pd-panel");
		$(".pd-panel-head__info").on("click", function () {
			$panel.toggleClass("pd-panel--closed")
		});


	}());

	let initAnimateBlocks = (function () {
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
	}());

	let initServiceToggle = (function () {
		let $currentDDown;
		// let $ddownItems = $(".ddown");

		$(".ddown-head").on("click", function () {
			let $this = $(this);
			let $parent = $this.parent();
			let $body = $this.siblings(".ddown-body");

			// open
			if (!$currentDDown) {
				// console.log("meh1?");
				$parent.addClass("ddown--active");
				$body.slideDown();

				$currentDDown = $parent;
			}
			else if ($parent[0] == $currentDDown[0]) {
				// console.log("meh?2");
				$currentDDown.removeClass("ddown--active");
				$currentDDown.find(".ddown-body").slideUp();

				$currentDDown = null;
			}
			else {
				$currentDDown.removeClass("ddown--active");
				$currentDDown.find(".ddown-body").slideUp();

				$parent.addClass("ddown--active");
				$body.slideDown();

				$currentDDown = $parent;
			}

			// slick fix
			let $slider = $($body.find(".slick"));
			if ($slider.length) {
				$slider.css('display', 'block');
				$slider.get(0).slick.setPosition();
			}
		});
	}());

	let initMap = (function () {
		if ($("#map").length) {
			let center = new google.maps.LatLng(55.706822, 37.662144);
			let mapOptions = {
				zoom: 14,
				scrollwheel: false,
				center: center,
				styles: [{
					"featureType": "landscape",
					"stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]
				}, {
					"featureType": "poi",
					"stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]
				}, {
					"featureType": "road.highway",
					"stylers": [{"saturation": -100}, {"visibility": "simplified"}]
				}, {
					"featureType": "road.arterial",
					"stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]
				}, {
					"featureType": "road.local",
					"stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]
				}, {
					"featureType": "transit",
					"stylers": [{"saturation": -100}, {"visibility": "simplified"}]
				}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {
					"featureType": "water",
					"elementType": "labels",
					"stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]
				}, {
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]
				}]

			};
			let map = new google.maps.Map(document.getElementById('map'), mapOptions);

			let marker = new google.maps.Marker({
				// position: {lat: 55.808254, lng: 37.6164365},
				position: center,
				map: map,
				animation: google.maps.Animation.DROP,
				icon: "/media/img/map-point.png",
				title: 'ООО «Росика»'
			});

			let contentString = `Москва, 1-ый Кожуховский проезд, дом 11`;
			let infowindow = new google.maps.InfoWindow({
				content: contentString
			});
			marker.addListener('click', function () {
				infowindow.open(map, marker);
			});
		}
	}());

	let initMenu = (function () {
		let $menu = $("#menu");
		let $menuPanel = $(".menu-panel");
		let navDelay = 0.4;
		let openTime = 0.3;

		function closeMenu() {
			if (Modernizr.touchevents) {
				toggleBodyOverflow();
			}

			$menuPanel.removeClass("menu-panel--open");
			$menu.attr("disabled", true);

			new TimelineMax()
				.staggerTo(".nav__item", 0.05, {opacity: 0, x: "-40px", ease: Power2.easeInOut}, -0.05, "sync")
				.to(".navigation", 0.5, {
					height: "0%",
					// ease: Power3.easeInOut,
					onComplete: function () {
						$menu.attr("disabled", false)
					}
				}, "sync")
		}

		function openMenu() {
			if (Modernizr.touchevents) {
				toggleBodyOverflow();
			}

			$menu.attr("disabled", true);
			$menuPanel.addClass("menu-panel--open");

			new TimelineMax()
				.to(".navigation", openTime, {
					height: "100%",
					onComplete: function () {
						$menu.attr("disabled", false);
					}
				}, navDelay)
				.staggerFromTo(".nav__item", 0.3,
					{opacity: 0, x: "-40px"},
					{
						opacity: 1, x: "0px", ease: Power2.easeInOut
					}, 0.1, navDelay)
		}

		$menu.on("click", function () {
			if ($menuPanel.hasClass("menu-panel--open")) {
				closeMenu();
			}
			else {
				openMenu();
			}
		});

		// close on missclick
		const mobileNavClass = "navigation";
		$(document).on("click", function (e) {
			if (!$(e.target).is($menu)
				&& !$menu.find(e.target).length
				&& !$(e.target).hasClass(mobileNavClass)
				&& !$("." + mobileNavClass).find(e.target).length
				&& $menuPanel.hasClass("menu-panel--open")
			) {
				closeMenu();
			}
		});
	}());

	let initHomeScroll = (function () {

		if ($(".p-home").length && enableHomeSectionScroll) {

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

			let isActive = false;
			let activeIndex = 0;
			let $activeSection = $(".section--active");
			let $sections = $(".section");
			let $homeNav = $(".home-nav");
			let $navItems = $(".home-nav__item");

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
					}
					else {
						//DOWN
						nextSection();
					}
				}
			});

			// swipe handler
			window.mc = new Hammer($("#section-wrap")[0]);
			mc.get('pan').set({direction: Hammer.DIRECTION_ALL});
			mc.on("panup pandown", function (ev) {
				if (enableHomeSectionScroll) {
					let direction = ev.type;

					if (direction == "panup") {
						nextSection();
					} else if (direction == "pandown") {
						prevSection();
					}
				}
			});

			// page dots
			$navItems.on("click", function () {
				if (enableHomeSectionScroll) {
					let $this = $(this);
					let sectionIndex = +$this.attr("data-to-section");

					fadeSection(sectionIndex);
				}
			});

			$(".scroll-down").on("click", function () {
				if (enableHomeSectionScroll) {
					nextSection();
				} else {
					$("html, body").animate({scrollTop: $window.height()}, 1000);
				}
			});

			$(".footer-bot__scrolltop").on("click", function () {
				if (enableHomeSectionScroll) {
					fadeSection(0);
				}
				else {
					$("html, body").animate({scrollTop: 0}, 1000);
				}
			});

			function setDotsColor($nextSection) {

				if ($nextSection) {
					let navColor = $nextSection.data("nav-color");
					if (navColor) {
						$homeNav.css("border-color", navColor);
					} else {
						$homeNav.css("border-color", "#000000");
					}
				} else {
					// 1st section on init
					let navColor = $activeSection.data("nav-color");
					if (navColor) {
						$homeNav.css("border-color", navColor);
					} else {
						$homeNav.css("border-color", "#000000");
					}
				}
			}

			function fadeoutScrollDown() {
				TweenMax.to(".scroll-down", 0.3, {opacity: 0})
			}
			function fadeInScrollDown() {
				TweenMax.to(".scroll-down", 1, {opacity: 1})
			}


			TweenMax.set($(`[data-from="bottom"]`), {yPercent: 100});
			TweenMax.set($(`[data-from="left"]`), {xPercent: -100});
			TweenMax.set($(`[data-from="right"]`), {xPercent: 100});


			function fadeSection(index) {
				if (!isActive) {
					isActive = true;

					TweenMax.to($sections, 0.3, {
						opacity: 0, onComplete: function () {
							let direction = activeIndex < index ? "next" : "prev";
							let indexStart = activeIndex; // duplicate for loop

							for (let i = 0; i < Math.abs(indexStart - index); i++) {
								if (direction === "next") {
									nextSnap();
								}
								else {
									prevSnap();
								}
							}

							TweenMax.set($activeSection, {xPercent: 0, yPercent: 0});
							TweenMax.to($activeSection, 1, {
								opacity: 1, onComplete: function () {
									TweenMax.set($sections, {opacity: 1});
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
			}

			function nextSection() {
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
			}

			function prevSection() {
				if (activeIndex !== 0 && !isActive) {
					isActive = true;
					activeIndex--;

					$navItems.removeClass("is-active");
					$navItems.eq(activeIndex).addClass("is-active");

					animateSection(activeIndex, "prev");
				}
			}

			function mixSections(nextIndex, direction) {
				let $nextSection = $sections.eq(nextIndex);
				let nextSectionData;

				let $parallaxImgActive = $activeSection.find(".parallax-block__img-w img").length ? $activeSection.find(".parallax-block__img-w img") : $activeSection.find(".section-hero__bg img");
				let $parallaxImgNext = $nextSection.find(".parallax-block__img-w img").length ? $nextSection.find(".parallax-block__img-w img") : $nextSection.find(".section-hero__bg img");

				// console.log($parallaxImgActive, $parallaxImgNext);

				let axis;
				let translateValue;

				// set nav color
				setDotsColor($nextSection);


				// move forward
				if (direction === "next") {
					nextSectionData = $nextSection.attr("data-from");

					switch (nextSectionData) {
						case "left":
							translateValue = "+=100";
							axis = "xPercent";

							TweenMax.set($parallaxImgActive, {xPercent: `-${parallaxForward}%`});
							TweenMax.set($parallaxImgNext, {xPercent: "0%",});
							break;

						case "right":
							translateValue = "-=100";
							axis = "xPercent";

							TweenMax.set($parallaxImgActive, {xPercent: `${parallaxForward}%`});
							TweenMax.set($parallaxImgNext, {xPercent: "0%",});
							break;

						case "bottom":
							translateValue = "-=100";
							axis = "yPercent";

							TweenMax.set($parallaxImgActive, {yPercent: `${parallaxForward}%`});
							TweenMax.set($parallaxImgNext, {yPercent: "0%",});
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

							TweenMax.set($parallaxImgActive, {xPercent: `${parallaxForward}%`});
							TweenMax.set($parallaxImgNext, {xPercent: "0%"});

							break;

						case "right":
							translateValue = "+=100";
							axis = "xPercent";

							TweenMax.set($parallaxImgActive, {xPercent: `-${parallaxForward}%`});
							TweenMax.set($parallaxImgNext, {xPercent: "0%"});
							break;
						case "bottom":
							translateValue = "+=100";
							axis = "yPercent";

							TweenMax.set($parallaxImgActive, {yPercent: `-${parallaxForward}%`});
							TweenMax.set($parallaxImgNext, {yPercent: "0%",});
							break;
					}
				}

				// animate blocks (translate)
				TweenMax.set($activeSection, {[axis]: translateValue});
				TweenMax.set($nextSection, {
					[axis]: translateValue,
					onComplete: function () {

						$navItems.removeClass("is-active");
						$navItems.eq(activeIndex).addClass("is-active");
					}
				});


				// change active slide
				$activeSection.removeClass("section--active");
				$activeSection = $nextSection.addClass("section--active");
			}

			function animateSection(nextIndex, direction) {

				let $nextSection = $sections.eq(nextIndex);
				let nextSectionData;

				let $parallaxImgActive = $activeSection.find(".parallax-block__img-w img").length ? $activeSection.find(".parallax-block__img-w img") : $activeSection.find(".section-hero__bg img");
				let $parallaxImgNext = $nextSection.find(".parallax-block__img-w img").length ? $nextSection.find(".parallax-block__img-w img") : $nextSection.find(".section-hero__bg img");

				// console.log($parallaxImgActive);
				// console.log($parallaxImgActive, $parallaxImgNext);

				let axis;
				let translateValue;

				// set nav color
				setDotsColor($nextSection);


				// move forward
				if (direction === "next") {
					nextSectionData = $nextSection.attr("data-from");

					switch (nextSectionData) {
						case "left":
							translateValue = "+=100";
							axis = "xPercent";

							TweenMax.fromTo($parallaxImgActive, parallaxTime,
								{xPercent: "0%"},
								{xPercent: `-${parallaxForward}%`}
							);
							TweenMax.fromTo($parallaxImgNext, parallaxTime,
								{xPercent: `${parallaxForward}%`},
								{xPercent: "0%",}
							);
							break;

						case "right":
							translateValue = "-=100";
							axis = "xPercent";

							TweenMax.fromTo($parallaxImgActive, parallaxTime,
								{xPercent: "0%"},
								{xPercent: `${parallaxForward}%`}
							);
							TweenMax.fromTo($parallaxImgNext, parallaxTime,
								{xPercent: `-${parallaxForward}%`},
								{xPercent: "0%",}
							);
							break;

						case "bottom":
							translateValue = "-=100";
							axis = "yPercent";

							TweenMax.fromTo($parallaxImgActive, parallaxTime,
								{yPercent: "0%"},
								{yPercent: `${parallaxForward}%`}
							);
							TweenMax.fromTo($parallaxImgNext, parallaxTime,
								{yPercent: `-${parallaxForward}%`},
								{yPercent: "0%",}
							);
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

							TweenMax.fromTo($parallaxImgActive, parallaxTime,
								{xPercent: "0%"},
								{xPercent: `${parallaxForward}%`}
							);
							TweenMax.fromTo($parallaxImgNext, parallaxTime,
								{xPercent: `-${parallaxForward}%`},
								{xPercent: "0%"}
							);

							break;

						case "right":
							translateValue = "+=100";
							axis = "xPercent";

							TweenMax.fromTo($parallaxImgActive, parallaxTime,
								{xPercent: "0%"},
								{xPercent: `-${parallaxForward}%`}
							);
							TweenMax.fromTo($parallaxImgNext, parallaxTime,
								{xPercent: `${parallaxForward}%`},
								{xPercent: "0%"}
							);
							break;
						case "bottom":
							translateValue = "+=100";
							axis = "yPercent";

							TweenMax.fromTo($parallaxImgActive, parallaxTime,
								{yPercent: "0%"},
								{yPercent: `-${parallaxForward}%`}
							);
							TweenMax.fromTo($parallaxImgNext, parallaxTime,
								{yPercent: `${parallaxForward}%`},
								{yPercent: "0%",}
							);
							break;
					}
				}

				// animate blocks (translate)
				TweenLite.to($activeSection, changeSectionTime, {[axis]: translateValue});
				TweenLite.to($nextSection, changeSectionTime, {
					[axis]: translateValue,
					onComplete: function () {
						isActive = false;
					}
				});

				// tl.add([tweenCurrentSection, tweenNextSection]);

				// change active slide
				$activeSection.removeClass("section--active");
				$activeSection = $nextSection.addClass("section--active");
			}

		} // end if
	}());

	let initHomePanels = (function () {


		let $panelsWrap = $(".panels-wrap");
		let $panelLinks = $("[data-show-panel]");

		$panelLinks.on("mouseenter mousemove", function () {
			let $sectionHero = $(".section-hero");

			panelTimeout = clearInterval(panelTimeout);

			if ($sectionHero.hasClass("section--active") && !homePanelsisActive) {

				let $this = $(this);
				let id = $this.attr("data-show-panel");
				let $newPanel = $(`#${id}`);

				if (!$activePanel) {
					homePanelsisActive = true;

					$activePanel = $newPanel;
					$activePanelLink = $this.addClass("is-active");
					$sectionHero.addClass("section-hero--overlay");
					TweenMax.to($newPanel, 0.3, {x: "0%", opacity: 1, onComplete: function () {
						homePanelsisActive = false;
					}});

					panelTimeout = setTimeout(closeActivePanel, closePanelTime);
				}
				else if (!$this.hasClass("is-active") && !homePanelsisActive) {
					homePanelsisActive = true;

					let $oldActivePanel = $activePanel;
					$activePanel = $newPanel;

					$activePanelLink.removeClass("is-active");
					$activePanelLink = $this.addClass("is-active");

					new TimelineLite()
						.to($oldActivePanel, 0.4, {x: "100%", opacity: 0}, "sync")
						.to($activePanel, 0.3, {
							x: "0%", opacity: 1, onComplete: function () {
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

	}());

	let initPageNotHome = (function () {
		if (!$(".p-home").length) {

			$(".footer-bot__scrolltop").on("click", function () {
				$("html, body").animate({scrollTop: 0}, 1000);
			});

		}
	}());

});