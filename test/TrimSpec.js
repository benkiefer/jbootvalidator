define(['sinon'], function (Sinon) {
    describe('jbootvalidator(required) select', function () {

        beforeEach(function () {
            String.prototype.trim = sinon.stub();
        });

        it('should add trim function when it does not exist', function () {
            define(['jBootValidator'], function (JBootValidator) {
                expect('boo'.trim()).toBe('boo');
            });
        });

        afterEach(function () {
            sinon.restore([
                String.prototype.trim
            ]);
        });
    });
});
