define(['jBootValidator', 'sinon'], function (JBootValidator, Sinon) {
    describe('jbootvalidator form', function () {
        var form;

        beforeEach(function () {
            this.clock = sinon.useFakeTimers();
            form = $('<form>');
            $(document.body).append(form);
            this.jbValStub = sinon.stub($.fn, 'jbValidate');
        });

        it('should fire callback on submit and validate when both are true', function () {
            var input = formControlInput(),
                textarea = formControlTextArea(),
                select = formControlSelect(),
                invoked = false;

            function submitCallBack(formObject, e) {
                e.preventDefault();
                expect(form.html()).toBe(formObject.html());
                invoked = true;
                return false;
            }

            var formGroup = formGroupDiv()
                .append(input)
                .append(select)
                .append(textarea);

            form.append(formGroup)
                .jBootValidator({
                    validateOnSubmit: true,
                    callback: submitCallBack
                });

            form.submit();

            expect(invoked).toBe(true);
            expect(this.jbValStub.callCount).toBe(3);
        });

        it('should not validate if submit validate is false (default) but still call callback', function () {
            var input = formControlInput(),
                select = formControlSelect(),
                textArea = formControlTextArea(),
                invoked = false;

            function submitCallBack(formObject, e) {
                e.preventDefault();
                expect(form.html()).toBe(formObject.html());
                invoked = true;
                return false;
            }

            var formGroup = formGroupDiv()
                .append(input)
                .append(textArea)
                .append(select);

            form.append(formGroup)
                .jBootValidator({
                    callback: submitCallBack
                });

            form.submit();

            expect(invoked).toBe(true);
            expect(this.jbValStub.callCount).toBe(0);
        });

        function formGroupDiv() {
            return $('<div>').addClass('form-group');
        }

        function formControlInput() {
            return $('<input>').addClass('form-control').attr('type', 'text');
        }

        function formControlTextArea() {
            return $('<textarea>').addClass('form-control');
        }

        function formControlSelect() {
            return $('<select>').addClass('form-control')
                .append($('<option>').val('').text('Select One').attr('disabled', 'disabled').attr('selected', 'selected'))
                .append($('<option>').val('Valid').text('Valid'));
        }

        afterEach(function () {
            this.jbValStub.restore();
            this.clock.restore();
            form.remove();
            form = null;
        });
    });
});