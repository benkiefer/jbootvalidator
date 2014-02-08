(function ($) {
    'use strict';

    if (typeof $.debounce !== 'function') {
        $.debounce = function (func, wait, immediate) {
            var timeout;
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                if (immediate && !timeout) func.apply(context, args);
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };
    }

    $.fn.jBootValidator = function () {
        if (typeof String.prototype.trim !== 'function') {
            String.prototype.trim = function () {
                return this.replace(/^\s+|\s+$/g, '');
            };
        }

        var invalidPattern = 'This field is invalid.',
            missingRequired = 'This field is required.';

        function createHelpBlock(text) {
            return '<span class="help-block jbootval">' + text + '</span>';
        }

        function doesntHaveHelpBlock(el) {
            return el.find('span.help-block.jbootval').length === 0;
        }


        return this.attr('novalidate', 'novalidate')
            .find('.form-control')
            .bind('keyup focus change', $.debounce(function (e) {
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
            }, 300)
        );
    };
}(jQuery));

