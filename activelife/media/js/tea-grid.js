if ($("[data-tea-grid]").length) {
	(function () {

		function removeMargins() {
			$teaGrids.find("li").removeClass("remove-margin"); //remove all classes

			$teaGrids.each(function (index, el) {
				var $el = $(el);
				var itemWidthPercent = ~~(($el.find("li").outerWidth() * 100) / $el.outerWidth()),
					itemsFirstRow = ~~(100 / itemWidthPercent);

				//remove margin each grid 1st row
				for (var i = 0; i < itemsFirstRow; i++) {
					$el.find("> li").eq(i).addClass("remove-margin");
				}
			});
		}

		var deferWrap = function deferWrap(fn, timer) {
			var currentTimer;
			return function () {
				var _this = this,
					_arguments = arguments;

				if (!currentTimer) {
					currentTimer = setTimeout(function () {
						currentTimer = undefined;
						return fn.apply(_this, _arguments);
					}, timer);
				}
			};
		};

		//get all grids
		var $teaGrids = $("[data-tea-grid]");
		removeMargins();

		$(window).resize(deferWrap(removeMargins, 200));

	})();
}