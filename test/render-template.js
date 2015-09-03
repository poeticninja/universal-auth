/**
* Dependencies.
*/
var Code = require('code');
var Lab = require('lab');
var RenderTemplate = require('../lib/render-template');

// Test shortcuts
var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.experiment;
var it = lab.test;

describe('RenderTemplate', function(){
    it('renders property from object', function(done) {

        var templateObj = {
            params: {
                id: 123
            },
            query: {
                id: 345,
                users: ['123', '456', '789']
            }
        };

        expect(RenderTemplate('user-{params.id}', templateObj)).to.equal('user-123');
        expect(RenderTemplate('user-{query.id}', templateObj)).to.equal('user-345');
        expect(RenderTemplate('user-{query.users.0}', templateObj)).to.equal('user-123');
        expect(RenderTemplate('user-{query.users.-1}', templateObj)).to.equal('user-789');
        expect(RenderTemplate('user-{query.users.-2}', templateObj)).to.equal('user-456');

        done();
    });

    it('does not render property from object', function(done) {

        var templateObj = {
            params: {}
        };

        expect(RenderTemplate('user-{params.id}', templateObj)).to.equal('user-');

        done();
    });
});
