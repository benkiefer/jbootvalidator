(function ($) {
//    'use strict';

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

    $.fn.jBootValidator = function (options) {
        var opts = $.extend({}, $.fn.jBootValidator.defaults, options);
        if (opts.validationCallback) {
            this.submit(function (e) {
                e.preventDefault();
                if (opts.validateOnSubmit) {
                    $(this).find('.form-control').each(validate);
                }
                opts.validationCallback(e);
            });
        }

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

        function validate (e) {
            var $input = $(this),
                $formGroup = $input.closest('.form-group'),
                $inputGroup = $input.closest('.input-group'),
                val = $input.val(),
                pattern = $input.attr('pattern'),
                title = $input.attr('title');

            if ($input.attr('required')) {
                if (val === null || val.trim() === '') {
                    if (doesntHaveHelpBlock($formGroup)) {
                        var helpBlock = createHelpBlock(missingRequired);
                        if ($inputGroup.length > 0){
                            $inputGroup.after(helpBlock);
                        } else {
                            $input.after(helpBlock);
                        }
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
        }

        return this.attr('novalidate', 'novalidate')
            .find('.form-control').bind('keyup focus change', $.debounce(validate, 300));
    };

    $.fn.jBootValidator.defaults = {
        validateOnSubmit: false,
        validationCallback: undefined
    };

}(jQuery));

