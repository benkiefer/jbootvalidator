describe('jbootvalidator submit', function () {
    var form;

    beforeEach(function () {
        form = $('<form>');
        $(document.body).append(form);
    });

    it('should invoke callback on submit but not validate', function () {
        var called = false,
            $formGroup = formGroupDiv(),
            $input = formControlInput(true);

        function callback(e) {
            called = true;
        }

        $formGroup.append($input);
        form.append($formGroup)
            .jBootValidator({
                validationCallback: callback
            });

        form.submit();

        expect(called).toBe(true);
        expect(form.find('span.help-block.jbootval').length).toBe(0);
        expect($formGroup.hasClass('has-error')).toBe(false);
    });

    it('should validate form on submit if callback and validation present', function () {
        var called = false,
            $formGroup = formGroupDiv(),
            $input = formControlInput(true);

        function callback(e) {
            called = true;
        }

        $formGroup.append($input);
        form.append($formGroup)
            .jBootValidator({
                validationCallback: callback,
                validateOnSubmit: true
            });

        form.submit();

        expect(called).toBe(true);
        expect(form.find('span.help-block.jbootval').length).toBe(1);
        expect($formGroup.hasClass('has-error')).toBe(true);
    });

    function formGroupDiv() {
        return $('<div>').addClass('form-group');
    }

    function formControlInput(required) {
        var $input = $('<input>').addClass('form-control');
        if (required) {
            $input.attr('required', true);
        }
        return $input;
    }

    afterEach(function () {
        form.remove();
        form = null;
    });
});