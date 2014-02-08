describe('debounce', function () {
    beforeEach(function () {
        this.clock = sinon.useFakeTimers();
    });

    it('should fire once after time has passed', function () {
        var stub = sinon.stub(),
            $input = $('<input>').keyup($.debounce(stub, 300));
        $input.trigger('keyup');
        $input.trigger('keyup');
        this.clock.tick(299);
        expect(stub.callCount).toBe(0);
        this.clock.tick(2);
        expect(stub.callCount).toBe(1);
    });

    afterEach(function () {
        this.clock.restore();
    });
});