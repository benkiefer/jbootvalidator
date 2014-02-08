describe('jbootvalidator', function () {
    var form;

    beforeEach(function () {
        form = $('<form>');
        $(document.body).append(form);
    });

    it('should do nothing when no required or pattern attributes', function () {

        var formControl = formControlInput();

        var formGroup = formGroupDiv()
            .append(formControl);

        form.append(formGroup)
            .jBootValidator();

        formControl.trigger('keyup');

        expect(formGroup.hasClass('has-error')).toBe(false);
        expect(form.find('span.help-block.jbootval').length).toBe(0);
    });

    function formGroupDiv() {
        return $('<div>').addClass('form-group');
    }

    function formControlInput() {
        return $('<input>').addClass('form-control');
    }

    afterEach(function () {
        form.remove();
        form = null;
    });
});