describe("A suite is just a function", function () {
    var form;

    beforeEach(function () {
        form = $('<form>');
        $(document.body).append(form);
    });

    it('should update input value on keyup', function () {
        var $input = $('<input>');
        $input.addClass('form-control');
        form.append($input)
        form.jBootValidator();

        $input.trigger('keyup');

        expect($input.val()).toBe('working');
    });

    afterEach(function () {
        form.remove();
        form = null;
    });
});