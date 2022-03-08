/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/index.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/_modules/header.js":
/*!***********************************!*\
  !*** ./src/js/_modules/header.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ \"./node_modules/gsap/index.js\");\n/* harmony import */ var body_scroll_lock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-scroll-lock */ \"./node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js\");\n/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/helpers */ \"./src/js/utils/helpers.js\");\n\n\n\nvar $hamburger = $(\"[data-toggle-menu]\");\nvar $menu = $(\".menu\");\nvar tlMenuReveal = gsap__WEBPACK_IMPORTED_MODULE_0__[\"gsap\"].timeline({\n  paused: true\n});\ntlMenuReveal.fromTo($menu, {\n  y: \"-100%\"\n}, {\n  duration: .25,\n  y: \"0\",\n  ease: gsap__WEBPACK_IMPORTED_MODULE_0__[\"Power0\"].easeNone\n}).fromTo(\".m-nav__item\", {\n  opacity: 0,\n  y: \"-100%\",\n  rotationX: gsap__WEBPACK_IMPORTED_MODULE_0__[\"gsap\"].utils.wrap([90, -90])\n}, {\n  duration: .3,\n  stagger: {\n    each: .1\n  },\n  y: \"0%\",\n  rotationX: 0,\n  opacity: 1\n});\n$hamburger.on(\"click\", function () {\n  if (!$hamburger.hasClass(\"is-active\")) openNav();else closeNav();\n});\n\nfunction openNav() {\n  $hamburger.addClass(\"is-active\");\n  tlMenuReveal.timeScale(1).play();\n\n  if (_utils_helpers__WEBPACK_IMPORTED_MODULE_2__[\"helpers\"].isTouchDevice()) {\n    Object(body_scroll_lock__WEBPACK_IMPORTED_MODULE_1__[\"disableBodyScroll\"])($menu[0]);\n  }\n}\n\nfunction closeNav() {\n  $hamburger.removeClass(\"is-active\");\n  gsap__WEBPACK_IMPORTED_MODULE_0__[\"gsap\"].to(\".m-subnav\", {\n    duration: 0.2,\n    height: 0\n  });\n  $(\".m-nav__link\").removeClass(\"is-open\");\n  tlMenuReveal.timeScale(1.6).reverse();\n  Object(body_scroll_lock__WEBPACK_IMPORTED_MODULE_1__[\"enableBodyScroll\"])($menu[0]);\n} // mobile nav ↓\n\n\nvar MenuAnimation = {\n  slideUpTime: 0.4,\n  slideDownTime: 0.4\n};\n$(\"[data-mnav-lvl]\").on(\"click\", function () {\n  var $this = $(this);\n\n  if (!$this.hasClass(\"is-open\")) {\n    openSubmenu($this);\n  } else {\n    closeSubmenu($this);\n  }\n});\n\nfunction openSubmenu($opener) {\n  var $sublist = $opener.siblings(\"ul\");\n  var $sublistItems = $sublist.find(\"> li\");\n  var openerIndex = +$opener.data(\"mnav-lvl\");\n  var $openerSameIndex = $(\".is-open[data-mnav-lvl=\" + openerIndex + \"]\");\n\n  if ($openerSameIndex.length) {\n    closeSubmenu($openerSameIndex);\n  }\n\n  $opener.addClass(\"is-open\"); // animate subnav\n\n  gsap__WEBPACK_IMPORTED_MODULE_0__[\"gsap\"].to($sublist, {\n    duration: MenuAnimation.slideDownTime,\n    height: \"auto\",\n    ease: \"none\"\n  }); // animate items\n\n  /*gsap.fromTo($sublistItems, 0.15, {alpha: 0, scale: 0.8, rotationX: 45}, {\r\n  \talpha: 1,\r\n  \tscale: 1,\r\n  \trotationX: 0,\r\n  \tease: Back.easeOut,\r\n  \tclearProps: \"transform\",\r\n  \tstagger: MenuAnimation.slideDownTime / $sublistItems.length\r\n  });*/\n}\n\nfunction closeSubmenu($opener) {\n  var $sublist = $opener.siblings(\"ul\");\n  $opener.removeClass(\"is-open\");\n  gsap__WEBPACK_IMPORTED_MODULE_0__[\"gsap\"].to($sublist, MenuAnimation.slideUpTime, {\n    height: 0,\n    onComplete: function onComplete() {\n      // close tree\n      collapseTree($opener);\n    }\n  });\n}\n\nfunction collapseTree($from) {\n  var $allOpeners = $from.parent().find(\"[data-mnav-lvl]\");\n  var $allSublists = $from.parent().find(\"ul\");\n  $allOpeners.removeClass(\"is-open\");\n  gsap__WEBPACK_IMPORTED_MODULE_0__[\"gsap\"].set($allSublists, {\n    height: 0\n  });\n} // mobile nav ↑\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./src/js/_modules/header.js?");

/***/ }),

/***/ "./src/js/_modules/heroLamp.js":
/*!*************************************!*\
  !*** ./src/js/_modules/heroLamp.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ \"./node_modules/gsap/index.js\");\n/* harmony import */ var throttle_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! throttle-debounce */ \"./node_modules/throttle-debounce/esm/index.js\");\n/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/helpers */ \"./src/js/utils/helpers.js\");\n\n\n\nvar $hero = $(\".hero\");\nvar circleRadius = 18.22;\n\nif ($hero.length) {\n  var $body = $(\"body\");\n\n  if (_utils_helpers__WEBPACK_IMPORTED_MODULE_2__[\"helpers\"].isTouchDevice()) {\n    $hero.addClass(\"hero--device_touch\");\n    var tl = gsap__WEBPACK_IMPORTED_MODULE_0__[\"default\"].timeline({\n      repeat: -1,\n      yoyo: true\n    });\n    var animationIsPlaying = true;\n    tl.to($body, {\n      duration: 2,\n      \"--clip-x\": \"\".concat(100 - circleRadius, \"%\"),\n      \"--clip-y\": \"\".concat(circleRadius, \"%\")\n    }).to($body, {\n      duration: 2,\n      \"--clip-x\": \"\".concat(circleRadius, \"%\"),\n      \"--clip-y\": \"\".concat(100 - circleRadius, \"%\")\n    }).to($body, {\n      duration: 2,\n      \"--clip-x\": \"\".concat(100 - circleRadius, \"%\"),\n      \"--clip-y\": \"\".concat(100 - circleRadius, \"%\")\n    }).to($body, {\n      duration: 2,\n      \"--clip-x\": \"\".concat(circleRadius, \"%\"),\n      \"--clip-y\": \"\".concat(circleRadius, \"%\")\n    });\n    $hero.on(\"click\", function () {\n      if (animationIsPlaying) {\n        tl.pause();\n        gsap__WEBPACK_IMPORTED_MODULE_0__[\"default\"].to(\".hero\", {\n          \"--circle-radius\": \"100vmax\"\n        });\n      } else {\n        tl.play();\n        gsap__WEBPACK_IMPORTED_MODULE_0__[\"default\"].to(\".hero\", {\n          \"--circle-radius\": \"\".concat(circleRadius, \"vmax\")\n        });\n      }\n\n      animationIsPlaying = !animationIsPlaying;\n    });\n  } else {\n    var setMouseCoors = Object(throttle_debounce__WEBPACK_IMPORTED_MODULE_1__[\"throttle\"])(50, true, function (e) {\n      $body.css('--clip-x', \"\".concat(e.pageX, \"px\")); // $hero.css('--clip-y', `${(e.pageY - (350 / 3))}px`);\n\n      $body.css('--clip-y', \"\".concat(e.pageY - 350 / Math.PI, \"px\"));\n    });\n    $body.on(\"mousemove\", setMouseCoors);\n  }\n}\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./src/js/_modules/heroLamp.js?");

/***/ }),

/***/ "./src/js/_modules/mousemoveChangeImg.js":
/*!***********************************************!*\
  !*** ./src/js/_modules/mousemoveChangeImg.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ \"./node_modules/gsap/index.js\");\n/* harmony import */ var throttle_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! throttle-debounce */ \"./node_modules/throttle-debounce/esm/index.js\");\n/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/helpers */ \"./src/js/utils/helpers.js\");\n\n\n\ngsap__WEBPACK_IMPORTED_MODULE_0__[\"default\"].defaults({\n  overwrite: \"auto\"\n});\n\nif (!_utils_helpers__WEBPACK_IMPORTED_MODULE_2__[\"helpers\"].isTouchDevice()) {\n  var $hoverSections = $(\".reasons__hover-part\");\n  var activeItem;\n  $hoverSections.mouseenter(function (e) {\n    var $this = $(this);\n    var $img = $this.find(\"img\");\n    gsap__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fromTo($img, {\n      autoAlpha: 0\n    }, {\n      duration: .25,\n      autoAlpha: 1\n    });\n\n    if (!activeItem) {\n      activeItem = $this;\n    }\n  });\n  $hoverSections.mousemove(function (e) {\n    var $this = $(this);\n    var $img = $this.find(\"img\");\n    var rect = $this[0].getBoundingClientRect();\n    gsap__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set($img, {\n      x: e.clientX - rect.left + 20,\n      y: e.clientY - rect.top\n    });\n  });\n  $hoverSections.mouseleave(function () {\n    activeItem = null;\n    var $this = $(this);\n    var $img = $this.find(\"img\");\n    gsap__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set($img, {\n      autoAlpha: 0\n    });\n  });\n}\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./src/js/_modules/mousemoveChangeImg.js?");

/***/ }),

/***/ "./src/js/_modules/mousemoveParallax.js":
/*!**********************************************!*\
  !*** ./src/js/_modules/mousemoveParallax.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ \"./node_modules/gsap/index.js\");\n/* harmony import */ var throttle_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! throttle-debounce */ \"./node_modules/throttle-debounce/esm/index.js\");\n/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/helpers */ \"./src/js/utils/helpers.js\");\n\n\n\nvar $parallaxSections = $(\"[data-parallax-section]\");\nvar mouse = {\n  x: 0,\n  y: 0,\n  moved: false\n};\n\nif ($parallaxSections.length) {\n  var parallaxIt = function parallaxIt(target, movement) {\n    gsap__WEBPACK_IMPORTED_MODULE_0__[\"default\"].to(target, {\n      duration: 0.3,\n      x: (mouse.x - rect.width / 2) / rect.width * movement,\n      y: (mouse.y - rect.height / 2) / rect.height * movement\n    });\n  };\n\n  var rect = $parallaxSections[0].getBoundingClientRect(); // Ticker event will be called on every frame\n\n  gsap__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ticker.add(function () {\n    var $targets = $(\"[data-parallax-target]\");\n\n    if (mouse.moved) {\n      $targets.each(function () {\n        var $this = $(this);\n        var targetMovement = $this.data(\"parallaxTarget\") ? $this.data(\"parallaxTarget\") : -20;\n        parallaxIt(this, targetMovement);\n      });\n    }\n\n    mouse.moved = false;\n  });\n\n  if (!_utils_helpers__WEBPACK_IMPORTED_MODULE_2__[\"helpers\"].isTouchDevice()) {\n    $parallaxSections.mousemove(function (e) {\n      mouse.moved = true;\n      mouse.x = e.clientX - rect.left;\n      mouse.y = e.clientY - rect.top;\n    });\n  } else {\n    var previousXIsPositive;\n    var previousYIsPositive;\n    gsap__WEBPACK_IMPORTED_MODULE_0__[\"default\"].utils.toArray(\"[data-parallax-target]\").forEach(function (target, index) {\n      gsap__WEBPACK_IMPORTED_MODULE_0__[\"default\"].to(target, {\n        duration: 3,\n        repeat: -1,\n        x: function x(index, el) {\n          var movement = el.dataset.parallaxTarget / 10;\n          var value = gsap__WEBPACK_IMPORTED_MODULE_0__[\"default\"].utils.random(-movement, movement);\n\n          if (previousXIsPositive) {\n            value = -value;\n          }\n\n          previousXIsPositive = value > 0;\n          return \"\".concat(value, \"%\");\n        },\n        y: function y(index, el) {\n          var movement = el.dataset.parallaxTarget / 10;\n          var value = gsap__WEBPACK_IMPORTED_MODULE_0__[\"default\"].utils.random(-movement, movement);\n\n          if (previousYIsPositive) {\n            value = -value;\n          }\n\n          previousYIsPositive = value > 0;\n          return \"\".concat(value, \"%\");\n        },\n        // z: `random(-10%, 10%, 2)`,\n        repeatRefresh: true,\n        ease: \"none\"\n      });\n    });\n  }\n\n  $(window).on(\"resize scroll\", function () {\n    rect = $parallaxSections[0].getBoundingClientRect();\n  });\n}\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./src/js/_modules/mousemoveParallax.js?");

/***/ }),

/***/ "./src/js/_modules/swiper-reviews.js":
/*!*******************************************!*\
  !*** ./src/js/_modules/swiper-reviews.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/swiper.esm.js\");\n\nswiper__WEBPACK_IMPORTED_MODULE_0__[\"Swiper\"].use([swiper__WEBPACK_IMPORTED_MODULE_0__[\"Navigation\"]]);\nvar $swipers = $(\"[data-swiper-reviews]\");\n$swipers.each(function () {\n  var $swiper = $(this);\n  var $swiperContainer = $swiper.find(\".swiper-container\");\n  var $swiperSection = $swiper.closest(\"section\");\n  var $prevEl = $swiperSection.find(\".swiper-controls__btn--prev\");\n  var $nextEl = $swiperSection.find(\".swiper-controls__btn--next\");\n  var swiperInstance = new swiper__WEBPACK_IMPORTED_MODULE_0__[\"Swiper\"]($swiperContainer[0], {\n    // loop: true,\n    roundLengths: true,\n    // fix blur bug\n    slidesPerView: 1,\n    spaceBetween: 20,\n    navigation: {\n      prevEl: $prevEl[0],\n      nextEl: $nextEl[0]\n    },\n    breakpoints: {\n      480: {\n        slidesPerView: 2\n      },\n\n      /*800: {\r\n      \tspaceBetween: 40,\r\n      },*/\n      980: {\n        spaceBetween: 40,\n        slidesPerView: 3\n      }\n    }\n  });\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./src/js/_modules/swiper-reviews.js?");

/***/ }),

/***/ "./src/js/_modules/swiper-slider.js":
/*!******************************************!*\
  !*** ./src/js/_modules/swiper-slider.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/swiper.esm.js\");\n\nswiper__WEBPACK_IMPORTED_MODULE_0__[\"Swiper\"].use([swiper__WEBPACK_IMPORTED_MODULE_0__[\"Navigation\"], swiper__WEBPACK_IMPORTED_MODULE_0__[\"Pagination\"], swiper__WEBPACK_IMPORTED_MODULE_0__[\"EffectFade\"]]);\nvar $swiperDefault = $(\"[data-swiper-default]\");\n$swiperDefault.each(function () {\n  var $swiper = $(this);\n  var $swiperContainer = $swiper.find(\".swiper-container\");\n  var $swiperWrap = $swiper.closest(\".swiper\");\n  var $prevEl = $swiperWrap.find(\".swiper-controls__btn--prev\");\n  var $nextEl = $swiperWrap.find(\".swiper-controls__btn--next\");\n  var $pagination = $swiperWrap.find(\".swiper-panel__pagination\");\n  var swiperInstance = new swiper__WEBPACK_IMPORTED_MODULE_0__[\"Swiper\"]($swiperContainer[0], {\n    // loop: true,\n    roundLengths: true,\n    // fix blur bug\n    effect: \"fade\",\n    pagination: {\n      el: $pagination[0],\n      type: \"fraction\",\n      formatFractionCurrent: function formatFractionCurrent(number) {\n        return number < 10 ? \"0\".concat(number) : number;\n      },\n      formatFractionTotal: function formatFractionTotal(number) {\n        return number < 10 ? \"0\".concat(number) : number;\n      }\n    },\n    navigation: {\n      prevEl: $prevEl[0],\n      nextEl: $nextEl[0]\n    }\n  });\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./src/js/_modules/swiper-slider.js?");

/***/ }),

/***/ "./src/js/_modules/swiper-slideshow.js":
/*!*********************************************!*\
  !*** ./src/js/_modules/swiper-slideshow.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ \"./node_modules/gsap/index.js\");\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/swiper.esm.js\");\n\n\nswiper__WEBPACK_IMPORTED_MODULE_1__[\"Swiper\"].use([swiper__WEBPACK_IMPORTED_MODULE_1__[\"Navigation\"], swiper__WEBPACK_IMPORTED_MODULE_1__[\"EffectFade\"], swiper__WEBPACK_IMPORTED_MODULE_1__[\"Autoplay\"]]);\nvar $swipers = $(\"[data-swiper-slideshow]\");\n$swipers.each(function () {\n  var $swiper = $(this);\n  var $swiperContainer = $swiper.find(\".swiper-container\");\n  var swiperInstance = new swiper__WEBPACK_IMPORTED_MODULE_1__[\"Swiper\"]($swiperContainer[0], {\n    // loop: true,\n    roundLengths: true,\n    // fix blur bug\n    slidesPerView: 1,\n    effect: \"fade\",\n    loop: true,\n    speed: 0,\n    allowTouchMove: false,\n    noSwiping: true,\n    // autoHeight: true,\n    autoplay: {\n      delay: 140,\n      disableOnInteraction: false\n    }\n  });\n  swiperInstance.autoplay.stop();\n  $swiper.hover(startAnimation, pauseAnimation);\n\n  function startAnimation() {\n    gsap__WEBPACK_IMPORTED_MODULE_0__[\"gsap\"].to($swiper, {\n      duration: .4,\n      scale: 1.03,\n      onComplete: function onComplete() {\n        return swiperInstance.autoplay.start();\n      }\n    });\n  }\n\n  function pauseAnimation() {\n    gsap__WEBPACK_IMPORTED_MODULE_0__[\"gsap\"].to($swiper, {\n      duration: .2,\n      scale: 1,\n      onStart: function onStart() {\n        return swiperInstance.autoplay.stop();\n      }\n    });\n  }\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./src/js/_modules/swiper-slideshow.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_modules/header */ \"./src/js/_modules/header.js\");\n/* harmony import */ var _modules_heroLamp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_modules/heroLamp */ \"./src/js/_modules/heroLamp.js\");\n/* harmony import */ var _modules_mousemoveParallax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_modules/mousemoveParallax */ \"./src/js/_modules/mousemoveParallax.js\");\n/* harmony import */ var _modules_mousemoveChangeImg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_modules/mousemoveChangeImg */ \"./src/js/_modules/mousemoveChangeImg.js\");\n/* harmony import */ var _modules_swiper_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_modules/swiper-slider */ \"./src/js/_modules/swiper-slider.js\");\n/* harmony import */ var _modules_swiper_reviews__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_modules/swiper-reviews */ \"./src/js/_modules/swiper-reviews.js\");\n/* harmony import */ var _modules_swiper_slideshow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_modules/swiper-slideshow */ \"./src/js/_modules/swiper-slideshow.js\");\n// modules\n\n\n\n // import \"./_modules/slideshowHover\";\n\n\n\n // import \"./_modules/semanticUi\";\n// import \"./_modules/scrollAnimations\";\n// import \"./_modules/smoothScrollbars\";\n// import \"./_modules/forms\";\n// import \"./_modules/text-trim\";\n// import \"./_modules/accordion\";\n// import \"./_modules/tabs\";\n// import \"./_modules/browserUpdate\";\n// helpers\n// import \"./utils/others\";\n\n__webpack_require__(/*! ./utils/navigation.dev */ \"./src/js/utils/navigation.dev.js\");\n\nif (true) {\n  __webpack_require__(/*! ./utils/ntc-generator */ \"./src/js/utils/ntc-generator.js\");\n}\n/*$(\"[data-loader]\").on(\"click\", function () {\r\n\tconsole.log(\"----\", \"loading...\")\r\n\timport(/!* webpackChunkName: \"swiper\" *!/ \"./_modules/swipers\").then((mod) => {\r\n\t\tconsole.log(\"----\", \"loading is ended motherfucker!\")\r\n\t\tconsole.log(\"----\", mod);\r\n\t})\r\n})*/\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/utils/helpers.js":
/*!*********************************!*\
  !*** ./src/js/utils/helpers.js ***!
  \*********************************/
/*! exports provided: helpers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"helpers\", function() { return helpers; });\nvar helpers = {\n  setVhCssVar: function setVhCssVar() {\n    //- set static view height for mobile devices ↓\n    var w = window.innerWidth;\n\n    var setDocHeight = function setDocHeight() {\n      document.documentElement.style.setProperty('--vh', \"\".concat(window.innerHeight / 100, \"px\"));\n    };\n\n    window.addEventListener(\"resize\", function () {\n      if (window.innerWidth === w) return;\n      w = window.innerWidth;\n      setDocHeight();\n    });\n    setDocHeight(); // **\n    // usage in sass: height: calc(var(--vh, 1vh) * 100 - var(--header_height))\n    // **\n    //- set static view height for mobile devices ↑\n  },\n  isTouchDevice: function isTouchDevice() {\n    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;\n  }\n};\n\n//# sourceURL=webpack:///./src/js/utils/helpers.js?");

/***/ }),

/***/ "./src/js/utils/navigation.dev.js":
/*!****************************************!*\
  !*** ./src/js/utils/navigation.dev.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function($) {function pageWidget(pages) {\n  var widgetWrap = $(\"<div class=\\\"widget_wrap\\\"><ul class=\\\"widget_list\\\"></ul></div>\");\n  widgetWrap.prependTo(\"body\");\n\n  for (var i = 0; i < pages.length; i++) {\n    $(\"<li class=\\\"widget_item\\\"><a class=\\\"widget_link\\\" href=\\\"\" + pages[i] + \".html\" + \"\\\">\" + pages[i] + \"</a></li>\").appendTo(\".widget_list\");\n  }\n\n  widgetWrap.find(\"a\").each(function (index, el) {\n    var regexp = new RegExp(\"#([^\\\\s]*)\", \"g\");\n    var hashlessText = window.location.href.replace(regexp, \"\");\n\n    if (hashlessText === this.href) {\n      $(this).css(\"color\", \"orange\");\n    }\n  });\n  var paddingBottom = \"8px\";\n  var widgetStilization = $(\"<style>.widget_wrap{position:fixed;top:0;left:0;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;transition:all .3s ease;transform:translate(-100%,0)}.widget_wrap:after{content:\\\" \\\";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{transform:translate(0,0)}.widget_item{padding:0 0 \".concat(paddingBottom, \"}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline} </style>\"));\n  widgetStilization.prependTo(\".widget_wrap\");\n}\n\npageWidget([\"home\", \"about\", \"reasons\", \"screensaver-competition\", \"ecology\", \"tree-branches\", \"cartoon-competition\", \"404\"]);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./src/js/utils/navigation.dev.js?");

/***/ }),

/***/ "./src/js/utils/ntc-generator.js":
/*!***************************************!*\
  !*** ./src/js/utils/ntc-generator.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function($) {var ntc = __webpack_require__(/*! ntcjs */ \"./node_modules/ntcjs/src/index.js\");\n\nvar SHOW_BUTTON = false;\nvar colors = [\"#02022b\", \"#1c5cbe\", \"#878f9a\", \"#d3d6db\", \"#e1e5e8\", \"#598bd6\", \"#c4c4c4\"];\nvar colorMap = {};\ncolors.forEach(function (item) {\n  var ntcName = ntc.name(item);\n  var colorName = ntcName[1].toLowerCase().replace(/ /g, \"-\");\n  colorMap[colorName] = item;\n}); // output\n\nif (SHOW_BUTTON) {\n  var $btnCopy = $(\"<button class='btn ntc-button'>copy color scheme!</button>\");\n  $(\"body\").append($btnCopy);\n  $btnCopy.on(\"click\", function () {\n    var dummy = document.createElement(\"input\"),\n        text = JSON.stringify(colorMap);\n    document.body.appendChild(dummy);\n    dummy.value = text;\n    dummy.select();\n    document.execCommand(\"copy\");\n    document.body.removeChild(dummy);\n    alert(\"scheme is copied to clipboard?!?!?\");\n  });\n}\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./src/js/utils/ntc-generator.js?");

/***/ })

/******/ });