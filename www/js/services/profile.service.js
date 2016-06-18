"use strict";
/*global angular, window, cordova, app*/
/*jslint nomen: true*/
angular.module('app.profile', []).service('$profile', ['$rootScope', '$ionicLoading', '$timeout', '$localDB', function ($rootScope, $ionicLoading, $timeout, $localDB) {
    var me = this;
    me.get = function () {
        var profile = window.localStorage.getItem('appetite.app.profile');
        if (profile === null) {
            profile = "{}";
        }
        return JSON.parse(profile);
    };
    me.set = function (item, isNew, success, error) {
        $ionicLoading.show();
        $timeout(function(){
            if(isNew){
                if($localDB.exist(item.email)){
                    $ionicLoading.hide();
                    error("Email already registered.");
                    return;
                };
                $localDB.insert(item);
            }
            try {
                item = JSON.stringify(item);
            } catch (e) {
                return e;
            }
            window.localStorage.setItem('appetite.app.profile', item);
            $ionicLoading.hide();
            success(me.get());
        }, 900);
    };
    me.clear = function () {
        window.localStorage.removeItem('appetite.app.profile');
        return;
    };
}]);