define(['jBootValidator', 'sinon'], function (jBootValidator, Sinon) {
    describe('jbootvalidator(pattern)', function () {
        var form;

        beforeEach(function () {
            this.clock = sinon.useFakeTimers();
            form = $('<form>');
            $(document.body).append(form);
        });

        it('should add has-error class when pattern does not match', function () {
            var formControl = formControlInput('\\d+', '').val('b');

            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(true);
        });

        it('should also be triggered by focus', function () {
            var formControl = formControlInput('\\d+', '').val('b');

            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('focus');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(true);
        });

        it('should add help-block after form control when pattern doesnt match', function () {
            var formControl = formControlInput('\\d+', 'my title').val('b');
            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            var $span = formGroup.find('span.help-block.jbootval');
            expect($span.text()).toBe('my title');
        });

        it('should add help-block with default message when pattern doesnt match and no title attribute', function () {
            var formControl = formControlInput('\\d+').val('b');
            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            var $span = formGroup.find('span.help-block.jbootval');
            expect($span.text()).toBe('This field is invalid.');
        });

        it('should add help-block with default message when pattern doesnt match and title attribute is blank', function () {
            var formControl = formControlInput('\\d+', '').val('b');
            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            var $span = formGroup.find('span.help-block.jbootval');
            expect($span.text()).toBe('This field is invalid.');
        });

        it('should only add help-block once regardless of number of keyups', function () {
            var formControl = formControlInput('\\d+', 'my title').val('b');
            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);
            formControl.trigger('keyup');
            this.clock.tick(301);

            var $span = formGroup.find('span.help-block.jbootval');
            expect($span.length).toBe(1);
        });

        it('should not add help-block as a child of the form-group should always be after form-control', function () {
            var formControl = formControlInput('\\d+', 'my title').val('b');
            var colWidthDiv = $('<div>')
                .append(formControl);

            var formGroup = formGroupDiv()
                .append(colWidthDiv);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.children('span.help-block.jbootval').length).toBe(0);

            var $span = colWidthDiv.find('span.help-block.jbootval');
            expect($span.text()).toBe('my title');
        });

        it('should not add help-block as a child of the form-group should always be after form-control', function () {
            var formControl = formControlInput('\\d+', 'my title').val('b');
            var colWidthDiv = $('<div>')
                .append(formControl);

            var formGroup = formGroupDiv()
                .append(colWidthDiv);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.children('span.help-block.jbootval').length).toBe(0);

            var $span = colWidthDiv.find('span.help-block.jbootval');
            expect($span.text()).toBe('my title');
        });

        it('should remove help-block when the required issue is resolved', function () {
            var formControl = formControlInput('\\d+', 'my title').val('9');

            var colWidthDiv = $('<div>')
                .append(formControl)
                .append(helpBlockSpan());

            var formGroup = formGroupDiv()
                .append(colWidthDiv);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.find('span.help-block.jbootval').length).toBe(0);
        });

        it('should not remove non jbootval help-blocks when the required issue is resolved', function () {
            var formControl = formControlInput('\\d+', 'my title').val('9');

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

            expect(formGroup.find('span.help-block.jbootval').length).toBe(0);
            expect(formGroup.find('span.help-block').length).toBe(1);
        });

        it('should remove has-error when the required issue is resolved', function () {
            var formControl = formControlInput('\\d+', 'my title').val('9');

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

        function formControlInput(pattern, title) {
            var $input = $('<input>').addClass('form-control').attr('pattern', pattern);
            if (title) {
                $input.attr('title', title);
            }
            return $input;
        }

        function helpBlockSpan() {
            return $('<span>').addClass('help-block.jbootval');
        }

        afterEach(function () {
            this.clock.restore();
            form.remove();
            form = null;
        });
    });
});