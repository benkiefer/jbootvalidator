describe('jbootvalidator(required) input', function () {
    var form;

    beforeEach(function () {
        this.clock = sinon.useFakeTimers();
        form = $('<form>');
        $(document.body).append(form);
    });

    it('should add help block after input group when input group is present', function () {
        var formControl = formControlInput(true).val(''),
            inputGroup = $('<div>').addClass('input-group'),
            addon = $('<span>').addClass('input-group-addon').text('$');

        inputGroup.append(addon).append(formControl);

        var colWidthDiv = $('<div>').addClass('col-md-12').append(inputGroup);

        var formGroup = formGroupDiv()
            .append(colWidthDiv);

        form.append(formGroup)
            .jBootValidator();

        formControl.trigger('keyup');
        this.clock.tick(301);

        expect(formGroup.hasClass('has-error')).toBe(true);

        expect(form.find('span.help-block.jbootval').length).toBe(1);
        expect($('.input-group').find('span.help-block.jbootval').length).toBe(0);
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
        this.clock.restore();
        form.remove();
        form = null;
    });
});