describe('jbootvalidator', function () {
    var form;

    beforeEach(function () {
        form = $('<form>');
        $(document.body).append(form);
    });

    it('should add no validate attribute to form', function () {
        form.jBootValidator();
        expect(form.attr('novalidate')).toBe('novalidate');
    });

    afterEach(function () {
        form.remove();
        form = null;
    });
});