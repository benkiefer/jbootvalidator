describe('jbootvalidator(required)', function () {
    var form;

    beforeEach(function () {
        form = $('<form>');
        $(document.body).append(form);
    });

    it('should add has-error class when required select is blank', function () {
        var formControl = formControlSelect(true);
        var formGroup = formGroupDiv()
            .append(formControl);

        form.append(formGroup)
            .jBootValidator();

        formControl.trigger('change');

        expect(formGroup.hasClass('has-error')).toBe(true);
    });

    it('should add help-block after select when required but not selected', function () {
        var formControl = formControlSelect(true);
        var formGroup = formGroupDiv()
            .append(formControl);

        form.append(formGroup)
            .jBootValidator();

        formControl.trigger('change');

        var $span = formGroup.find('span.help-block.jbootval');
        expect($span.text()).toBe('This field is required.');
    });

    it('should not add help-block after select when required value is present', function () {
        var formControl = formControlSelect(true).val('Valid');
        var formGroup = formGroupDiv()
            .append(formControl);

        form.append(formGroup)
            .jBootValidator();

        formControl.trigger('change');

        expect(formGroup.find('span.help-block.jbootval').length).toBe(0);
    });

    it('should remove help-block when the required issue is resolved', function () {
        var formControl = formControlSelect(true).val('Valid');

        var colWidthDiv = $('<div>')
            .append(formControl)
            .append(helpBlockSpan());

        var formGroup = formGroupDiv()
            .append(colWidthDiv);

        form.append(formGroup)
            .jBootValidator();

        formControl.trigger('change');

        expect(formGroup.find('span.help-block.jbootval').length).toBe(0);
    });

    it('should not remove non jbootval help-blocks when the required issue is resolved', function () {
        var formControl = formControlSelect(true).val('Valid');

        var colWidthDiv = $('<div>')
            .append(formControl)
            .append($('<span>').addClass('help-block').text('testing'))
            .append(helpBlockSpan());

        var formGroup = formGroupDiv()
            .append(colWidthDiv);

        form.append(formGroup)
            .jBootValidator();

        formControl.trigger('change');

        expect(formGroup.find('span.help-block.jbootval').length).toBe(0);
        expect(formGroup.find('span.help-block').length).toBe(1);
    });



    it('should add has-error class when required input is blank', function () {
        var formControl = formControlInput(true);
        var formGroup = formGroupDiv()
            .append(formControl);

        form.append(formGroup)
            .jBootValidator();

        formControl.trigger('keyup');

        expect(formGroup.hasClass('has-error')).toBe(true);
    });

    it('should also be triggered by focus', function () {
        var formControl = formControlInput(true);
        var formGroup = formGroupDiv()
            .append(formControl);

        form.append(formGroup)
            .jBootValidator();

        formControl.trigger('focus');

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

        expect(formGroup.hasClass('has-error')).toBe(true);
    });

    it('should add help-block after form control when required input is blank', function () {
        var formControl = formControlInput(true);
        var formGroup = formGroupDiv()
            .append(formControl);

        form.append(formGroup)
            .jBootValidator();

        formControl.trigger('keyup');

        var $span = formGroup.find('span.help-block.jbootval');
        expect($span.text()).toBe('This field is required.');
    });

    it('should only add help-block once regardless of number of keyups', function () {
        var formControl = formControlInput(true);
        var formGroup = formGroupDiv()
            .append(formControl);

        form.append(formGroup)
            .jBootValidator();

        formControl.trigger('keyup');
        formControl.trigger('keyup');

        var $span = formGroup.find('span.help-block.jbootval');
        expect($span.length).toBe(1);
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

        expect(formGroup.children('span.help-block.jbootval').length).toBe(0);

        var $span = colWidthDiv.find('span.help-block.jbootval');
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

        expect(formGroup.find('span.help-block.jbootval').length).toBe(0);
    });

    it('should not remove non jbootval help-blocks when the required issue is resolved', function () {
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

        expect(formGroup.find('span.help-block.jbootval').length).toBe(0);
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

        expect(formGroup.hasClass('has-error')).toBe(false);
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

    function formControlSelect(required) {
        var $select = $('<select>').addClass('form-control')
            .append($('<option>').val('').text('Select One').attr('disabled', 'disabled').attr('selected', 'selected'))
            .append($('<option>').val('Valid').text('Valid'));
        if (required) {
            $select.attr('required', true);
        }
        return $select;
    }

    function helpBlockSpan() {
        return $('<span>').addClass('help-block.jbootval');
    }

    afterEach(function () {
        form.remove();
        form = null;
    });
});