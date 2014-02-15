define(['jBootValidator', 'sinon'], function (JBootValidator, Sinon) {
    describe('jbootvalidator(required) input', function () {
        var form;

        beforeEach(function () {
            this.clock = sinon.useFakeTimers();
            form = $('<form>');
            $(document.body).append(form);
        });

        it('can validate an input without using full jBootValidator', function () {
            var checkbox = checkboxDiv(true, false),
                colWidthDiv = $('<div>').append(checkbox),
                formGroup = formGroupDiv().append(colWidthDiv);

            checkbox.find('input').jbValidate();

            expect(formGroup.hasClass('has-error')).toBe(true);
        });

        it('should add has-error class when required checkbox is not checked', function () {
            var checkbox = checkboxDiv(true, false),
                colWidthDiv = $('<div>').append(checkbox),
                formGroup = formGroupDiv().append(colWidthDiv);

            form.append(formGroup)
                .jBootValidator();

            checkbox.find('input').trigger('change');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(true);
        });

        it('should not add help-block when required checkbox is checked', function () {
            var checkbox = checkboxDiv(true, true),
                colWidthDiv = $('<div>').append(checkbox),
                formGroup = formGroupDiv().append(colWidthDiv);

            form.append(formGroup)
                .jBootValidator();

            checkbox.find('input').trigger('change');
            this.clock.tick(301);

            expect(formGroup.find('span.help-block.jBootVal').length).toBe(0);
        });

        it('should add help-block when required checkbox is not checked', function () {
            var checkbox = checkboxDiv(true, false),
                colWidthDiv = $('<div>').append(checkbox),
                formGroup = formGroupDiv().append(colWidthDiv);

            form.append(formGroup)
                .jBootValidator();

            checkbox.find('input').trigger('change');
            this.clock.tick(301);

            expect(colWidthDiv.find('span.help-block.jbootval').length).toBe(1);
            expect(checkbox.find('span.help-block.jbootval').length).toBe(0);
        });

        it('should not add has-error class when required checkbox is checked', function () {
            var checkbox = checkboxDiv(true, true),
                colWidthDiv = $('<div>').append(checkbox),
                formGroup = formGroupDiv().append(colWidthDiv);

            form.append(formGroup)
                .jBootValidator();

            checkbox.find('input').trigger('change');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(false);
        });

        it('should remove help-block when required checkbox is checked and help-block is present', function () {
            var checkbox = checkboxDiv(true, true),
                colWidthDiv = $('<div>').append(checkbox).append(helpBlockSpan()),
                formGroup = formGroupDiv().append(colWidthDiv).addClass('has-error');

            form.append(formGroup)
                .jBootValidator();

            checkbox.find('input').trigger('change');
            this.clock.tick(301);

            expect(formGroup.find('span.help-block.jbootval').length).toBe(0);
        });


        it('should remove help-block when required checkbox is checked and help-block is present', function () {
            var checkbox = checkboxDiv(true, true),
                colWidthDiv = $('<div>').append(checkbox).append(helpBlockSpan()),
                formGroup = formGroupDiv().append(colWidthDiv).addClass('has-error');

            form.append(formGroup)
                .jBootValidator();

            checkbox.find('input').trigger('change');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(false);
        });


        function formGroupDiv() {
            return $('<div>').addClass('form-group');
        }

        function checkboxDiv(required, checked) {
            var $input = $('<input>').attr('type', 'checkbox'),
                $label = $('<label>').text('my label').append($input),
                $inputDiv = $('<div>').addClass('checkbox').append($label);

            if (required) {
                $input.attr('required', true);
            }
            if (checked) {
                $input.attr('checked', '');
            }

            return $inputDiv;
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