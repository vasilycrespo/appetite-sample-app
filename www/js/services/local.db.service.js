"use strict";
/*global angular, window, cordova, app*/
/*jslint nomen: true*/
angular.module('app.local.db', []).service('$localDB', ['$rootScope', '$ionicLoading', '$timeout', function ($rootScope, $ionicLoading, $timeout) {
    var me = this,
        isEmpty = function (obj) {
            if (obj == null) return true;
            if (obj.length > 0)    return false;
            if (obj.length === 0)  return true;
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }
            return true;
        };
    me.get = function () {
        var database = window.localStorage.getItem('appetite.app.local.db');
        if (database === null) {
            database = "[]";
        }
        return JSON.parse(database);
    };
    me.insert = function (item) {
        var database = me.get();
        database.push(item);
        try {
            database = JSON.stringify(database);
        } catch (e) {
            return e;
        }
        window.localStorage.setItem('appetite.app.local.db', database);
    };
    me.exist = function (email) {
        var exist = false;

        if(isEmpty(me.get())) {
            return false;
        }
        me.get().forEach(function(account, index){
            if (account.email === email) exist = true;
            return;
        });
        return exist;
    }
    me.validCredentials = function (login) {
        var exist = false, profile;
        if(isEmpty(me.get())) {
            return false;
        }
        me.get().forEach(function(account, index){
            if (account.email === login.email && account.password === login.password) {
                exist = account; 
            } 
            return;
        });
        return exist;
    }
    me.clear = function () {
        window.localStorage.removeItem('appetite.app.local.db');
        return;
    };
}]);