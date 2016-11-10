jQuery(function () {
	
	var $window = jQuery(window);
	var $navBar = jQuery(".uk-navbar-nav");
	
	
	//remove nav dropdown
	var $header = jQuery(".header");
	$window.on("resize", function () {
		if ($window.width() < 980) {
			$header.find(".uk-parent").removeAttr("data-uk-dropdown");
		} else {
			$header.find(".uk-parent").attr("data-uk-dropdown", true);
		}
	});
	
	// show/hide m-footer
	var lastScrollTop = 0;
	var mfooter = jQuery(".m-footer");
	$(window).scroll(function (event) {
		var st = $(this).scrollTop();
		if (st > lastScrollTop) {
			mfooter.removeClass("is-visible");
		} else {
			mfooter.addClass("is-visible");
		}
		lastScrollTop = st;
	});
	
	// header m-search toggler
	var $headerLogo = $(".header-logo");
	jQuery(".m-search-toggler").on("click", function (e) {
		e.preventDefault();
		var $this = jQuery(this);
		
		$this.toggleClass("is-highlight");
		$this.siblings(".m-search-wrap").toggleClass("is-visible");
		$headerLogo.fadeToggle(200);
	});
	
});