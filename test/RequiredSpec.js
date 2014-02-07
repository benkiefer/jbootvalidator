describe('jbootvalidator(required)', function () {
    var form;

    beforeEach(function () {
        form = $('<form>');
        $(document.body).append(form);
    });

    it('should add has-error class when required input is blank', function () {
        var formGroup = formGroupDiv();
        var formControl = formControlInput(true);
        formGroup.append(formControl);
        form.append(formGroup);

        form.jBootValidator();

        formControl.trigger('keyup');

        expect(formGroup.hasClass('has-error')).toBe(true);
    });

    it('should add help-block after form control when required input is blank', function () {
        var formGroup = formGroupDiv();
        var formControl = formControlInput(true);
        formGroup.append(formControl);
        form.append(formGroup);

        form.jBootValidator();

        formControl.trigger('keyup');

        var $span = form.find('span.help-block');
        expect($span.text()).toBe('This field is required.');
    });

    it('should not add help-block as a child of the form-group should always be after form-control', function () {
        var formGroup = formGroupDiv();
        var colWidthDiv = $('<div>');
        var formControl = formControlInput(true);
        colWidthDiv.append(formControl);
        formGroup.append(colWidthDiv);
        form.append(formGroup);

        form.jBootValidator();

        formControl.trigger('keyup');

        expect(form.children('span.help-block').length).toBe(0);

        var $span = colWidthDiv.find('span.help-block');
        expect($span.text()).toBe('This field is required.');
    });

    function formGroupDiv () {
        var $div = $('<div>');
        $div.addClass('form-group');
        return  $div;
    }

    function formControlInput (required) {
        var $input = $('<input>');
        $input.addClass('form-control');
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