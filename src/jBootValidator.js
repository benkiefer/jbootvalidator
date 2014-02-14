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

    if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }

    var __extends = this.__extends || function (d, b) {
        function __() { this.constructor = d; }
        __.prototype = b.prototype;
        d.prototype = new __();
    };

    var Rule = (function () {
        function Rule(input) {
            this.input = input;
            this.formGroup = input.closest('.form-group');
            this.inputGroup = input.closest('.input-group');
            this.val = input.val();
        }

        Rule.prototype.createHelpBlock = function (text) {
            return '<span class="help-block jbootval">' + text + '</span>';
        };

        Rule.prototype.doesntHaveHelpBlock = function () {
            return this.formGroup.find('span.help-block.jbootval').length === 0;
        };

        Rule.prototype.validate = function () {
            if (this.shouldValidate()) {
                if (this.isValid()) {
                    if (this.doesntHaveHelpBlock()) {
                        var helpBlock = this.createHelpBlock(this.getMessage());
                        if (this.inputGroup.length > 0){
                            this.inputGroup.after(helpBlock);
                        } else {
                            this.input.after(helpBlock);
                        }
                        this.formGroup.addClass('has-error');
                    }
                } else {
                    this.formGroup.removeClass('has-error').find('span.help-block.jbootval').remove();
                }
            }
        };

        Rule.prototype.getMessage = function () { };
        Rule.prototype.shouldValidate = function () { };
        Rule.prototype.isValid = function () { };
        return Rule;
    })();

    var RequiredRule = (function (_super) {
        __extends(RequiredRule, _super);
        function RequiredRule(input) {
            _super.call(this, input);
        }

        RequiredRule.prototype.shouldValidate = function () {
            return this.input.attr('required');
        };

        RequiredRule.prototype.getMessage = function () {
            return 'This field is required.';
        };

        RequiredRule.prototype.isValid = function () {
            return this.val === null || this.val.trim() === '';
        };
        return RequiredRule;
    })(Rule);

    var PatternRule = (function (_super) {
        __extends(PatternRule, _super);
        function PatternRule(input) {
            this.pattern = input.attr('pattern');
            this.title = input.attr('title');
            _super.call(this, input);
        }

        PatternRule.prototype.shouldValidate = function () {
            return this.input.attr('pattern');
        };
        PatternRule.prototype.isValid = function () {
            return !new RegExp(this.pattern).test(this.val);
        };

        PatternRule.prototype.getMessage = function () {
            return this.title ? this.title : 'This field is invalid.';
        };
        return PatternRule;
    })(Rule);

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

        function validate (e) {
            var $input = $(this);
            new RequiredRule($input).validate();
            new PatternRule($input).validate();
        }

        return this.attr('novalidate', 'novalidate')
            .find('.form-control').bind('keyup focus change', $.debounce(validate, 300));
    };

    $.fn.jBootValidator.defaults = {
        validateOnSubmit: false,
        validationCallback: undefined
    };

}(jQuery));

