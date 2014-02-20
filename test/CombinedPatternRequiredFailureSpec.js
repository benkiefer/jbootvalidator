define(['jBootValidator', 'sinon'], function (JBootValidator, Sinon) {
    describe('jbootvalidator(required) input', function () {
        var form;

        beforeEach(function () {
            this.clock = sinon.useFakeTimers();
            form = $('<form>');
            $(document.body).append(form);
        });


        it('should switch between alternating help-block rules when failures change, but only one should display at a time',
            function () {

                var formControl = formControlInput()
                    .attr('required', '')
                    .attr('pattern', '\\d+')
                    .val('bob');

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
                expect(formGroup.find('span.help-block.jb-input-pattern').length).toBe(1);

                formControl.val('').trigger('keyup');
                this.clock.tick(301);

                expect(formGroup.find('span.help-block.jb-input-reqd').length).toBe(1);
                expect(formGroup.find('span.help-block.jb-input-pattern').length).toBe(0);
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