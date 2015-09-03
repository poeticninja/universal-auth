/**
* Dependencies.
*/
var Code = require('code');
var Lab = require('lab');
var Intersection = require('../lib/intersection');

// Test shortcuts
var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.experiment;
var it = lab.test;

describe('Intersection', function(){
    it('finds common items in arrays', function(done) {

        var arrayOne = ['one', 'three', 'six', 'eight', 'ten'];
        var arrayTwo = ['zero', 'one', 'six', 'ten'];

        expect(Intersection(arrayOne, arrayTwo).length).to.equal(3);
        expect(Intersection(arrayOne, arrayTwo)).to.include(['one', 'six', 'ten']);

        done();
    });
    it('does not find common items in arrays', function(done) {

        var arrayOne = ['one', 'three', 'six', 'eight', 'ten'];
        var arrayTwo = ['zero', 'two', 'five', 'nine'];

        expect(Intersection(arrayOne, arrayTwo).length).to.equal(0);

        done();
    });
});
