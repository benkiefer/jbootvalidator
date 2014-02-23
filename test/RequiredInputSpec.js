define(['jBootValidator', 'sinon'], function (JBootValidator, Sinon) {
    describe('jbootvalidator(required) input', function () {
        var form;

        beforeEach(function () {
            this.clock = sinon.useFakeTimers();
            form = $('<form>');
            $(document.body).append(form);
        });

        it('should add has-error class when required input is blank', function () {
            var formControl = formControlInput(true);
            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(true);
        });

        it('can validate an input without using full jBootValidator', function () {
            var formControl = formControlInput(true);
            var formGroup = formGroupDiv()
                .append(formControl);

            formControl.jbValidate();

            expect(formGroup.hasClass('has-error')).toBe(true);
        });

        it('should also be triggered by focus', function () {
            var formControl = formControlInput(true);
            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('focus');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(true);
        });

        it('should add has-error class when required input is only spaces', function () {
            var formControl = formControlInput(true)
                .val('      ');
            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(true);
        });

        it('should handle changes to the required attribute', function () {
            var formControl = formControlInput(false);
            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(false);

            formControl.attr('required', '').trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(true);

            formControl.removeAttr('required').trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(false);
        });

        it('should handle adding and removing of the required attribute', function () {
            var formControl = formControlInput(true);
            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            var $span = formGroup.find('span.help-block.jb-input-reqd');
            expect($span.text()).toBe('This field is required.');
        });

        it('should only add help-block once regardless of number of keyups', function () {
            var formControl = formControlInput(true);
            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);
            formControl.trigger('keyup');
            this.clock.tick(301);

            var $span = formGroup.find('span.help-block.jb-input-reqd');
            expect($span.length).toBe(1);
            expect(formGroup.hasClass('has-error')).toBe(true);
        });

        it('should not add help-block as a child of the form-group should always be after form-control', function () {
            var formControl = formControlInput(true);
            var colWidthDiv = $('<div>')
                .append(formControl);

            var formGroup = formGroupDiv()
                .append(colWidthDiv);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.children('span.help-block.jb-input-reqd').length).toBe(0);

            var $span = colWidthDiv.find('span.help-block.jb-input-reqd');
            expect($span.text()).toBe('This field is required.');
        });

        it('should remove help-block when the required issue is resolved', function () {
            var formControl = formControlInput(true).val('present');

            var colWidthDiv = $('<div>')
                .append(formControl)
                .append(helpBlockSpan());

            var formGroup = formGroupDiv()
                .append(colWidthDiv);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.find('span.help-block.jb-input-reqd').length).toBe(0);
        });

        it('should not remove non jb-input-reqd help-blocks when the required issue is resolved', function () {
            var formControl = formControlInput(true).val('present');

            var colWidthDiv = $('<div>')
                .append(formControl)
                .append($('<span>').addClass('help-block').text('testing'))
                .append(helpBlockSpan());

            var formGroup = formGroupDiv()
                .append(colWidthDiv);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.find('span.help-block.jb-input-reqd').length).toBe(0);
            expect(formGroup.find('span.help-block').length).toBe(1);
        });

        it('should remove has-error when the required issue is resolved', function () {
            var formControl = formControlInput(true)
                .val('present');

            var colWidthDiv = $('<div>')
                .append(formControl)
                .append(helpBlockSpan());

            var formGroup = formGroupDiv()
                .addClass('has-error')
                .append(colWidthDiv);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(false);
        });

        function formGroupDiv() {
            return $('<div>').addClass('form-group');
        }

        function formControlInput(required) {
            var $input = $('<input>').addClass('form-control').attr('type', 'text');
            if (required) {
                $input.attr('required', true);
            }
            return $input;
        }

        function helpBlockSpan() {
            return $('<span>').addClass('help-block.jb-input-reqd');
        }

        afterEach(function () {
            this.clock.restore();
            form.remove();
            form = null;
        });
    });
});