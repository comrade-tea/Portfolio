jQuery(function () {
	var $window = jQuery(window);
	
	var $navBar = jQuery(".uk-navbar-nav");
	var $navDropdownLinks = $navBar.find(".uk-parent");
	var $navbarItems = $navBar.find("li");
	var navBarWidth = 0;
	
	//pager change active
/*	var pagerItems = jQuery(".custom-pager li");
	pagerItems.on("click", function () {
		var $this = jQuery(this);
		
		pagerItems.removeClass("uk-active");
		$this.addClass("uk-active");
	});*/
	
	// set width for navbar
	$window.resize(function () {
		//topnav set width
		navBarWidth = 0;
		$navbarItems.each(function (index, el) {
			var $el = jQuery(el);
			navBarWidth += $el.width();
		});
		$navBar.css({width: navBarWidth + 20});
		
		//subpage leftbar
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
	
	 
	// mobile dropdown handler
	$navDropdownLinks.on("click", function () {
		var $this = jQuery(this);
		var $dropdown = $this.find(".uk-dropdown");
		
		var offset = $this[0].getBoundingClientRect(),
			offsetX = offset.left,
			offsetY = offset.bottom - 1;
		
		setTimeout(function () {
			$dropdown[0].style.setProperty("top", offsetY + "px", "important");
			$dropdown[0].style.setProperty("left", offsetX + "px", "important");
		}, 0);
		
	});
	
	//remove nav-dropdown on mobile
	$window.on("touchmove", function () {
		$navDropdownLinks.removeClass("uk-open")
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