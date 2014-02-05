(function ($) {
    $.fn.jBootValidator = function () {
        return this.find('input.form-control').bind('keyup', function (e) {
			$(this).val('working');
        });
    };
}(jQuery));

