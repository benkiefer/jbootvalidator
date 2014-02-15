define(['jBootValidator', 'sinon'], function (JBootValidator, Sinon) {
    describe('jbootvalidator', function () {
        var form;

        beforeEach(function () {
            this.jbValStub = sinon.stub($.fn, 'jbValidate');
            this.clock = sinon.useFakeTimers();
            form = $('<form>');
            $(document.body).append(form);
        });

        it('should bind to keyup on input', function () {
            var $input = $('<input>');
            form.append($input).jBootValidator();

            $input.trigger('keyup');
            this.clock.tick(301);

            expect(this.jbValStub.callCount).toBe(1);
        });

        it('should bind to change on input', function () {
            var $input = $('<input>');
            form.append($input).jBootValidator();

            $input.trigger('change');
            this.clock.tick(301);

            expect(this.jbValStub.callCount).toBe(1);
        });

        it('should bind to click on input', function () {
            var $input = $('<input>');
            form.append($input).jBootValidator();

            $input.trigger('change');
            this.clock.tick(301);

            expect(this.jbValStub.callCount).toBe(1);
        });

        it('should bind to focus on input', function () {
            var $input = $('<input>');
            form.append($input).jBootValidator();

            $input.trigger('focus');
            this.clock.tick(301);

            expect(this.jbValStub.callCount).toBe(1);
        });

        it('should bind to focus on blur', function () {
            var $input = $('<input>');
            form.append($input).jBootValidator();

            $input.trigger('blur');
            this.clock.tick(301);

            expect(this.jbValStub.callCount).toBe(1);
        });

        it('should bind to keyup on select', function () {
            var $input = $('<select>');
            form.append($input).jBootValidator();

            $input.trigger('keyup');
            this.clock.tick(301);

            expect(this.jbValStub.callCount).toBe(1);
        });

        it('should bind to change on select', function () {
            var $input = $('<select>');
            form.append($input).jBootValidator();

            $input.trigger('change');
            this.clock.tick(301);

            expect(this.jbValStub.callCount).toBe(1);
        });

        it('should bind to click on select', function () {
            var $input = $('<select>');
            form.append($input).jBootValidator();

            $input.trigger('change');
            this.clock.tick(301);

            expect(this.jbValStub.callCount).toBe(1);
        });

        it('should bind to focus on select', function () {
            var $input = $('<select>');
            form.append($input).jBootValidator();

            $input.trigger('focus');
            this.clock.tick(301);

            expect(this.jbValStub.callCount).toBe(1);
        });

        it('should bind to blur on select', function () {
            var $input = $('<select>');
            form.append($input).jBootValidator();

            $input.trigger('blur');
            this.clock.tick(301);

            expect(this.jbValStub.callCount).toBe(1);
        });

        afterEach(function () {
            this.jbValStub.restore();
            this.clock.restore();
            form.remove();
            form = null;
        });
    });
});