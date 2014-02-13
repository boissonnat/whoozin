var assert = require("assert")
describe('Use dummy test to validate the entire CI round trip', function(){
    it('should count 6 letters in <foobar>', function(){
        assert.equal(4, "foobar".length);
    })
})