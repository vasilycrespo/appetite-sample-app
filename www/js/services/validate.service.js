"use strict";
/*global angular, window, cordova, app*/
/*jslint nomen: true*/
angular.module('app.validate', []).service('$validate', ['$config', function ($$config) {
    var me = this;
    me.email = function (input) {
        if(input === undefined) return false;
        var res = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/g.test(input);
        return res;
    };
    me.name = function (input) {
        if(input === undefined) return false;
        var res = /^([A-Z ]){2,}$/ig.test(input);
        return res;
    };
    me.phone = function (input) {
        if(input === undefined) return false;
        var res = /^(\d)+(-)?([\d])+(-)?([\d])+(-)?([\d])+$/ig.test(input);
        return res;
    };
    me.length = function (input, min, max) {
        if(input === undefined) return false;
        var res = true;
        if (min && input.length < min ) res = false; 
        if (max && input.length > max ) res = false; 
        return res;
    }
}]);