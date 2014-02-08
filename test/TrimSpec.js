describe('jbootvalidator', function () {
    var form;

    beforeEach(function () {
        form = $('<form>');
        $(document.body).append(form);
    });

    it('should add trim function when it does not exist', function () {
        String.prototype.trim = undefined;

        expect('boo '.trim).toBe(undefined);
        form.jBootValidator();

        expect('boo '.trim()).toBe('boo');
    });

    afterEach(function () {
        form.remove();
        form = null;
    });
});