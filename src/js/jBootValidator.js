(function ($) {
    'use strict';

    $.fn.jBootValidator = function () {
        var invalidPattern = 'This field is invalid.',
            missingRequired = 'This field is required.';

        function createHelpBlock(text) {
            return '<span class="help-block jbootval">' + text + '</span>';
        }

        function doesntHaveHelpBlock(el) {
            return el.find('span.help-block.jbootval').length === 0;
        }

        return this.find('input.form-control').bind('keyup', function (e) {
            var $input = $(this),
                $formGroup = $input.closest('.form-group'),
                val = $input.val(),
                pattern = $input.attr('pattern'),
                title = $input.attr('title');

            if ($input.attr('required')) {
                if (val === null || val.trim() === '') {
                    if (doesntHaveHelpBlock($formGroup)) {
                        $input.after(createHelpBlock(missingRequired));
                        $formGroup.addClass('has-error');
                    }
                } else {
                    $formGroup.removeClass('has-error').find('span.help-block.jbootval').remove();
                }
            }
            if (pattern) {
                if (!new RegExp(pattern).test(val)) {
                    if (doesntHaveHelpBlock($formGroup)) {
                        $input.after(createHelpBlock(title ? title : invalidPattern));
                        $formGroup.addClass('has-error');
                    }
                } else {
                    $formGroup.removeClass('has-error').find('span.help-block.jbootval').remove();
                }
            }
        });
    };
}(jQuery));

