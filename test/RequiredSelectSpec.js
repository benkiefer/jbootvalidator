describe('jbootvalidator(required) select', function () {
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


    function formGroupDiv() {
        return $('<div>').addClass('form-group');
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