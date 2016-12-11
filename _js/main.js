window.onload = function () {
	
	var $window = $(window);
	
	var $mainSection = $("#main");
	
	var pattern = Trianglify({
		width: $mainSection.width(),
		height: $mainSection.innerHeight()
	}).canvas();
	
	var $pattern = $(pattern);
	
	$window.on("resize", function () {
		// console.log("resize");
		$pattern.css({
			width: $mainSection.width(),
			height: $mainSection.innerHeight()
		})
	});
	
	$mainSection.append($pattern);
	
	
};