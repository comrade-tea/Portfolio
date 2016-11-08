jQuery(function () {
	var $window = jQuery(window);
	
	var $navBar = jQuery(".uk-navbar-nav");
	var $navDropdownLinks = $navBar.find(".uk-parent");
	var $navbarItems = $navBar.find("li");
	var navBarWidth = 0;
	

	// remove nav dropdown on touch devices
	if ($("html").hasClass("uk-touch")) {
		jQuery(".header").find(".uk-parent").removeAttr("data-uk-dropdown");
	}

	// subpage leftbar
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
	
	 
	//search toggler
	if ($window.width() <= 640) {
		jQuery(".header-search-btn").on("click", function (e) {
			e.preventDefault();
			
			var $this = jQuery(this);
			
			$this.toggleClass("is-active");
			$this.siblings(".header-search-input").toggleClass("is-open");
		});
	}
	

	jQuery("#price-search").ionRangeSlider({
		type: "double",
		grid: true,
		min: 0,
		max: 50
	});
	
	
	/*single job page*/
	jQuery(".dd-options__toggle").on("click", function () {
		var $this = jQuery(this);
		var $body = $this.siblings(".dd-options__body");
		
		$body.slideToggle("slow");
	});
	
});