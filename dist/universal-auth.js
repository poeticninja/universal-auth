(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.UniversalAuth = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./intersection":2,"./render-template":3}],2:[function(require,module,exports){
module.exports = function(arrayOne, arrayTwo) {

    var common = [];
    var obj = {};

    arrayOne.forEach(function(item){
        obj[item] = true;
    });

    arrayTwo.forEach(function(item){
        if (item in obj) {
            common.push(item);
        }
    });

    return common;

};

},{}],3:[function(require,module,exports){
module.exports = function(template, obj) {

    return template.replace(/{([^}]+)}/g, function ($0, chain) {

        var path = chain.split('.');

        for (var i = 0, length = path.length; i < length; ++i) {
            var key = path[i];
            if (key[0] === '-' && Array.isArray(obj)) {
                key = key.slice(1, key.length);
                key = obj.length - key;
            }

            if (!obj ||
                !obj.hasOwnProperty(key) ||
                typeof obj !== 'object') {

                console.log('Missing key', key, 'in template', chain);

                obj = null;

                break;
            }

            obj = obj[key];
        }

        return (obj === undefined || obj === null ? '' : obj);

    });
};

},{}]},{},[1])(1)
});