$(function () {

	var $formBtn = $(".form__submit");

	$(document).on("submit", ".form", function (e) {
		e.preventDefault();
		var form = $(this);
		if (!form.valid()) return;
		spinnerShow();
		var model = {
			username: $("[name='Username']").val(),
			email: $("[name='Email']").val(),
			message: $("[name='Message']").val()
		};
		$.post(form.attr("action"), model, function (data) {

			spinnerHide();
			closeModalWindow();

			if (!data.errors) {
				swal(
					{
						title: "Спасибо!",
						text: "Мы ответим вам в ближайшее время.",
						type: "success",
						allowOutsideClick: true
					}
				);
			}
			else {
				swal(
					{
						title: "Ууупс...",
						text: "Что-то пошло не так.",
						type: "error",
						allowOutsideClick: true
					}
				);
			}

		});
	});

	function closeModalWindow() {
		var inst = $("[data-remodal-id=modal]").remodal();
		inst.close();
	}

	function spinnerShow() {
		$formBtn
			.attr("disabled", true)
			.addClass("btn-status--ajax");
	}

	function spinnerHide() {
		$formBtn
			.removeAttr("disabled")
			.removeClass("btn-status--ajax");
	}
});