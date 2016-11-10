jQuery(function () {
	var $window = jQuery(window);
	
	var $navBar = jQuery(".uk-navbar-nav");
	var $navDropdownLinks = $navBar.find(".uk-parent");
	var $navbarItems = $navBar.find("li");
	var navBarWidth = 0;
	

	// remove nav dropdown on touch devices
	$window.on("resize", function () {
		if ($window.width() < 980) {
			jQuery(".header").find(".uk-parent").removeAttr("data-uk-dropdown");
		} else {
			jQuery(".header").find(".uk-parent").attr("data-uk-dropdown", true);
		}
	});

	var lastScrollTop = 0;
	var mfooter = jQuery(".m-footer");
	$(window).scroll(function(event){
		var st = $(this).scrollTop();
		if (st > lastScrollTop){
			mfooter.removeClass("is-visible");
		} else {
			// upscroll code
			mfooter.addClass("is-visible");
		}
		lastScrollTop = st;
	});

	//search toggler
	if ($window.width() <= 640) {
		jQuery(".header-search-btn").on("click", function (e) {
			e.preventDefault();

			var $this = jQuery(this);

			$this.toggleClass("is-active");
			$this.siblings(".header-search-input").toggleClass("is-open");
		});
	}


/*	// subpage leftbar
	$window.resize(function () {

		var $subLeftBar = jQuery(".subpage-lbar"),
			$subLeftBarInner = jQuery(".subpage-lbar__inner");
		
		if ($window.width() <= 980) {
			$subLeftBar.addClass("uk-offcanvas");
			$subLeftBarInner.addClass("uk-offcanvas-bar");
		}
		else {
			$subLeftBar.removeClass("uk-offcanvas");
			$subLeftBarInner.removeClass("uk-offcanvas-bar");
		}
	}).resize();
	

	jQuery("#price-search").ionRangeSlider({
		type: "double",
		grid: true,
		min: 0,
		max: 50
	});
	
	/!*single job page*!/
	jQuery(".dd-options__toggle").on("click", function () {
		var $this = jQuery(this);
		var $body = $this.siblings(".dd-options__body");
		
		$body.slideToggle("slow");
	});*/
	
});