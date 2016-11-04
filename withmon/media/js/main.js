$(function () {
	var $window = $(window);
	
	var $navBar = $(".uk-navbar-nav");
	var $navDropdownLinks = $navBar.find(".uk-parent");
	var $navbarItems = $navBar.find("li");
	var navBarWidth = 0;
	
	$navbarItems.each(function (index, el) {
		var $el = $(el);
		navBarWidth += $el.width();
	});
	
	$navBar.css({width: navBarWidth + 20});
	 
	// mobile dropdown handler
	$navDropdownLinks.on("click", function () {
		var $this = $(this);
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
		$(".search__btn").on("click", function (e) {
			e.preventDefault();
			
			var $this = $(this);
			
			$this.toggleClass("is-active");
			$this.siblings(".search__input").toggleClass("is-open");
		});
	}
	
	
});