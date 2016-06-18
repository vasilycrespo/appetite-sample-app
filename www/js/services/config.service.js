"use strict";
/*global angular, window, cordova, app*/

angular.module('app.config', []).factory('$config', [function () {
    var data, env;
    env = 'DEV';
    data = {};
    data.DEV = {
        'API_URL'            : 'http://192.168.0.147:10010',
    };
    data.PROD = {
        'API_URL'        : '<PRODUCTION END-POINT>',
    };
    return function (key) {
        if (key === 'env') {
            return env;
        }

        if (key) {
            return data[env][key];
        }
    };
}]);