(function ($) {
    'use strict';

    $.fn.jBootValidator = function () {
        return this.find('input.form-control').bind('keyup', function (e) {
            var $input = $(this),
                $formGroup = $input.closest('.form-group'),
                val = $input.val();

			if($input.attr('required')){
                if (val === null || val.trim() === ''){
                    if ($formGroup.find('span.help-block.jbootval').length === 0) {
                        $input.after('<span class="help-block jbootval">This field is required.</span>');
                        $formGroup.addClass('has-error');
                    }
                } else {
                    $formGroup.removeClass('has-error').find('span.help-block.jbootval').remove();
                }
            }
        });
    };
}(jQuery));

