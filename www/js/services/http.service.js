"use strict";
/*global angular, window, cordova, app */
/*jslint nomen: true*/

angular.module('app.http', []).service('$httpHandler', ['$http', '$q', 'lodash', function ($http, $q, _) {

    var me = this;

    me.call = function (path, method, data, timeout) {
        var deferred = $q.defer(), param = {};

        param.method = (method === undefined) ? 'GET' : method.toUpperCase();
        param.url = path;

        if (data) {
            if (param.method === 'GET') {
                param.url = param.url + '?' + ((!_.isString(data)) ? me.jsonToQueryString(data) : data);
            } else {
                param.data = JSON.stringify(data);
            }
        }

        param.timeout = timeout;

        function errorCallback(error) {
            deferred.reject(error);
        }

        function successCallback(response) {
            deferred.resolve(response);
        }

        $http(param).then(successCallback, function () {
            $http(param).then(successCallback, errorCallback);
        });

        return deferred.promise;
    };

    me.jsonToQueryString = function (json) {
        return Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
    };

}]);
