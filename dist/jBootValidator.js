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
        function __() {
            this.constructor = d;
        }

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
            return '<span class="help-block ' + this.failureClass() + '">' + text + '</span>';
        };

        Rule.prototype.failureClass = function () {};

        Rule.prototype.isBlank = function () {
            return this.val === null || this.val.trim() === '';
        };

        Rule.prototype.doesntHaveHelpBlock = function () {
            return this.formGroup.find('span.help-block.' + this.failureClass()).length === 0;
        };

        Rule.prototype.appendHelpBlock = function (helpBlock) {
            if (this.inputGroup.length > 0) {
                this.inputGroup.after(helpBlock);
            }
            else {
                this.input.after(helpBlock);
            }
        };

        Rule.prototype.validate = function () {
            var result = true;
            if (this.shouldValidate()) {
                if (this.isInvalid()) {
                    result = false;
                    if (this.doesntHaveHelpBlock()) {
                        var helpBlock = this.createHelpBlock(this.getMessage());
                        this.appendHelpBlock(helpBlock);
                        return false;
                    }
                } else {
                    this.formGroup.find('span.help-block.'  + this.failureClass()).remove();
                }
            }
            return result;
        };

        Rule.prototype.getMessage = function () { };
        Rule.prototype.shouldValidate = function () { };
        Rule.prototype.isInvalid = function () { };
        return Rule;
    })();

    var RequiredTextRule = (function (_super) {
        __extends(RequiredTextRule, _super);
        function RequiredTextRule(input) {
            _super.call(this, input);
        }

        RequiredTextRule.prototype.shouldValidate = function () {
            return this.input.attr('required') && this.input.attr('type') !== 'checkbox';
        };

        RequiredTextRule.prototype.getMessage = function () {
            return 'This field is required.';
        };

        RequiredTextRule.prototype.failureClass = function () {
            return 'jb-input-reqd';
        };

        RequiredTextRule.prototype.isInvalid = function () {
            return this.isBlank();
        };
        return RequiredTextRule;
    })(Rule);

    var RequiredCheckBoxRule = (function (_super) {
        __extends(RequiredCheckBoxRule, _super);
        function RequiredCheckBoxRule(input) {
            this.checkboxDiv = input.closest('div.checkbox');
            _super.call(this, input);
        }

        RequiredCheckBoxRule.prototype.shouldValidate = function () {
            return  this.input.attr('required') && this.input.attr('type') === 'checkbox';
        };

        RequiredCheckBoxRule.prototype.getMessage = function () {
            return 'This field is required.';
        };

        RequiredCheckBoxRule.prototype.appendHelpBlock = function (helpBlock) {
            this.checkboxDiv.after(helpBlock);
        };

        RequiredCheckBoxRule.prototype.failureClass = function () {
            return 'jb-checkbox-reqd';
        };

        RequiredCheckBoxRule.prototype.isInvalid = function () {
            return !this.input.is(':checked');
        };
        return RequiredCheckBoxRule;
    })(Rule);

    var PatternRule = (function (_super) {
        __extends(PatternRule, _super);
        function PatternRule(input) {
            this.pattern = input.attr('pattern');
            this.title = input.attr('title');
            _super.call(this, input);
        }

        PatternRule.prototype.shouldValidate = function () {
            return !this.isBlank() && this.input.attr('pattern');
        };

        PatternRule.prototype.isInvalid = function () {
            return !new RegExp(this.pattern).test(this.val);
        };

        PatternRule.prototype.failureClass = function () {
            return 'jb-input-pattern';
        };

        PatternRule.prototype.getMessage = function () {
            return this.title ? this.title : 'This field is invalid.';
        };
        return PatternRule;
    })(Rule);

    $.fn.jbValidate = function (e) {
        var $input = $(this),
            $formGroup = $input.closest('.form-group'),
            invalid = false;

        invalid = (new RequiredTextRule($input).validate() ? invalid : true);
        invalid = (new RequiredCheckBoxRule($input).validate() ? invalid : true);
        invalid = (new PatternRule($input).validate() ? invalid : true);

        if (invalid) {
            $formGroup.addClass('has-error');
        } else {
            $formGroup.removeClass('has-error');
        }
    };

    $.fn.jBootValidator = function (options) {
        var opts = $.extend({}, $.fn.jBootValidator.defaults, options);
        if (opts.validationCallback) {
            this.submit(function (e) {
                if (opts.validateOnSubmit) {
                    $(this).find('input, select').each($.fn.jbValidate);
                }
                opts.validationCallback(e);
            });
        }

        return this.attr('novalidate', 'novalidate')
            .find('select, input').bind('keyup focus change', $.debounce($.fn.jbValidate, 300)).blur($.fn.jbValidate);
    };

    $.fn.jBootValidator.defaults = {
        validateOnSubmit: false,
        validationCallback: undefined
    };

}(jQuery));

