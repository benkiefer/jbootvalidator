(function ($) {
    'use strict';

    $.fn.jBootValidator = function () {
        return this.find('input.form-control').bind('keyup', function (e) {
            var $input = $(this),
                val = $input.val();

			if($input.attr('required')){
                if (val === null || val.trim() === ''){
                    $input.after('<span class="help-block jbootval">This field is required.</span>')
                        .parent('.form-group').addClass('has-error');
                } else {
                    $input.closest('.form-group').removeClass('has-error').find('span.help-block.jbootval').remove();
                }
            }
        });
    };
}(jQuery));

