$(function () {
	var $window = $(window);
	var $navDropdownLinks = $(".uk-navbar-nav").find(".uk-parent");
	
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
	
	
	$window.on("touchmove", function () {
		$navDropdownLinks.removeClass("uk-open")
	});
	
	if ($window.width() <= 640) {
		$(".search__btn").on("click", function (e) {
			e.preventDefault();
			
			var $this = $(this);
			
			$this.toggleClass("is-active");
			$this.siblings(".search__input").toggleClass("is-open");
		});
	}
	
	
});