/**
* Dependencies.
*/
var RenderTemplate = require('./render-template');
var Intersection = require('./intersection');

module.exports = function(){

    var isBrowser = false;

    if (typeof window !== 'undefined') {
        isBrowser = true;
    }

    var auth = {
        session: {}
    };

    auth.session.set = function(session) {

        auth.session.store = session;

        if (isBrowser) {
            localStorage.setItem('userSession', JSON.stringify(session));
        }

    };

    auth.session.get = function(){

        if (isBrowser && !auth.session.store) {
            auth.session.store = JSON.parse(localStorage.getItem('userSession'));
        }

        if (auth.session.store) {
            return auth.session.store;
        }

        return null;

    };

    auth.session.clear = function(){
        auth.session.store = null;

        if (isBrowser) {
            localStorage.removeItem('userSession');
        }

    };

    auth.session.store = null;

    auth.isAuthenticated = function() {
        return !!auth.session.get();
    };

    auth.isAuthorized = function(scope, templateObj) {

        var session = auth.session.get();
        var scopes = [].concat(scope);

        if (scope) {
            scopes.forEach(function(scope, i) {
                if (/{([^}]+)}/.test(scope)) {
                    scopes[i] = RenderTemplate(scope, templateObj);
                }
            });
        }

        if (!scope ||
            ((scope === true) && session) ||
            (session && Intersection(scopes, [].concat(session.scope)).length)) {
            return true;
        }

        return false;
    };

    return auth;
};
