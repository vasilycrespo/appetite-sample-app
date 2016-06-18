"use strict";
/*global angular, window, cordova, app*/
/*jslint nomen: true*/
angular.module('app.api', []).service('$api', ['$httpHandler', '$config', function ($httpHandler, $config) {

    var me = this;

    me.test = function (successCallback, errorCallback) {
        return $httpHandler.call($config('API_URL') + "/test").then(function (data) {
            if (typeof successCallback === "function") {
                successCallback(data);
            }
        }, function (error) {
            if (typeof errorCallback === "function") {
                errorCallback(error);
            }
        });
    };


}]);