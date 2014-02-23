define(['jBootValidator', 'sinon'], function (JBootValidator, Sinon) {
    describe('jbootvalidator', function () {
        var form;

        beforeEach(function () {
            this.clock = sinon.useFakeTimers();
            form = $('<form>');
            $(document.body).append(form);
        });

        it('should do nothing when no required or pattern attributes on keyup', function () {
            var formControl = formControlInput();

            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('keyup');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(false);
            expect(form.find('span.help-block.jb-input-reqd').length).toBe(0);
        });

        it('should do nothing when no required or pattern attributes on focus', function () {
            var formControl = formControlInput();

            var formGroup = formGroupDiv()
                .append(formControl);

            form.append(formGroup)
                .jBootValidator();

            formControl.trigger('focus');
            this.clock.tick(301);

            expect(formGroup.hasClass('has-error')).toBe(false);
            expect(form.find('span.help-block.jb-input-reqd').length).toBe(0);
        });

        function formGroupDiv() {
            return $('<div>').addClass('form-group');
        }

        function formControlInput() {
            return $('<input>').addClass('form-control').attr('type', 'text');
        }

        afterEach(function () {
            this.clock.restore();
            form.remove();
            form = null;
        });
    });
});