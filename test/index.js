/**
* Dependencies.
*/
var Code = require('code');
var Lab = require('lab');
var Auth = require('../lib/index.js');

// Test shortcuts
var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.experiment;
var it = lab.test;

describe('auth', function(){
    it('set session', function(done) {

        var auth = Auth();

        var session = {
            scope: 'user'
        };

        expect(auth.session.store).to.be.null();
        auth.session.set(session);
        expect(auth.session.store.scope).to.equal(session.scope);

        done();
    });

    it('get session', function(done) {

        var auth = Auth();

        var session = {
            scope: 'user'
        };

        auth.session.set(session);
        expect(auth.session.get().scope).to.equal(session.scope);

        done();

    });

    it('clear session', function(done) {

        var auth = Auth();

        var session = {
            scope: 'user'
        };

        auth.session.set(session);
        expect(auth.session.store.scope).to.equal(session.scope);
        auth.session.clear();
        expect(auth.session.store).to.be.null();

        done();

    });

    it('session is authenticated', function(done) {

        var auth = Auth();

        var session = {
            scope: 'user'
        };

        expect(auth.isAuthenticated()).to.be.false();
        auth.session.set(session);
        expect(auth.isAuthenticated()).to.be.true();
        auth.session.clear();
        expect(auth.isAuthenticated()).to.be.false();

        done();

    });

    it('session is authorized single scope', function(done) {

        var auth = Auth();

        var session = {
            scope: 'user'
        };

        auth.session.set(session);
        expect(auth.isAuthorized('user')).to.be.true();
        expect(auth.isAuthorized(['admin', 'user'])).to.be.true();
        expect(auth.isAuthorized('other')).to.be.false();

        done();

    });

    it('session is authorized multiple scopes', function(done) {

        var auth = Auth();

        var session = {
            scope: ['admin', 'user']
        };

        auth.session.set(session);
        expect(auth.isAuthorized('user')).to.be.true();
        expect(auth.isAuthorized('admin')).to.be.true();
        expect(auth.isAuthorized(['admin', 'user'])).to.be.true();
        expect(auth.isAuthorized('other')).to.be.false();

        done();

    });

    it('session is authorized with template object', function(done) {

        var auth = Auth();

        var session = {
            scope: ['user', 'user-123']
        };

        auth.session.set(session);
        expect(auth.isAuthorized('user')).to.be.true();
        expect(auth.isAuthorized('user-{request.id}', { request: { id: 123 } })).to.be.true();
        expect(auth.isAuthorized('user-{request.id}', { request: { id: 456 } })).to.be.false();
        expect(auth.isAuthorized('other')).to.be.false();

        done();

    });

});
