(function ($) {
    $.fn.jBootValidator = function () {
        return this.bind('keyup', function (e) {
			console.log('you did it');
        });
    };
}(jQuery));

