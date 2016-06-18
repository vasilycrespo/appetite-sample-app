"use strict";
/*global document, angular, window, cordova, app, ionic, StatusBar*/
/*jslint nomen: true*/

var app = angular.module('appetite', ['ionic', 'ngLodash', 'app.http', 'app.api', 'app.profile', 'app.config', 'ionic.contrib.ui.tinderCards', 'app.validate', 'app.login', 'app.error', 'app.local.db']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            cache: false,
            templateUrl: 'components/home/home.html',
            controller: 'homeController'
        })
        .state('login', {
            url: '/login',
            cache: false,
            templateUrl: 'components/login/login.html',
            controller: 'loginController'
        })
        .state('register', {
            url: '/register',
            cache: false,
            templateUrl: 'components/register/register.html',
            controller: 'registerController'
        })
        .state('quickstart', {
            url: '/quickstart',
            cache: false,
            templateUrl: 'components/quickstart/quickstart.html',
            controller: 'quickstartController'
        });
});

app.run(function ($ionicPlatform, $rootScope, $state, $ionicLoading) {
    $ionicPlatform.ready(function () {
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from2, fromParams) {
            $rootScope.stateChangeSuccess = {'ev': ev, 'to': to, 'toParams': toParams, 'from': from2, 'fromParams': fromParams};
            $rootScope.previousState = from2.name;
            $rootScope.currentState = to.name;
        });

        $rootScope.go = function (view) {
            $ionicLoading.show({duration: 300});
            $state.go(view);
        };

        $rootScope.back = function () {
            if ($rootScope.previousState) {
                $ionicLoading.show({duration: 300});
                $state.go($rootScope.previousState);
            }
        };

        if (window.screen && window.screen.lockOrientation) {
            window.screen.lockOrientation('portrait');
        }

        if (ionic.Platform.isAndroid()) {
            window.addEventListener("native.showkeyboard", function () {
                if (document.getElementsByTagName("body")[0].className.indexOf("keyboard-body") === -1) {
                    document.getElementsByTagName("body")[0].className += " keyboard-body";
                }
            });
            window.addEventListener("native.hidekeyboard", function () {
                document.getElementsByTagName("body")[0].className = document.getElementsByTagName("body")[0].className.replace("keyboard-body", "");
            });
        }
    });

    $ionicPlatform.onHardwareBackButton(function (event) {
        var exceptionViews = [];
        if ($rootScope.previousState) {
            event.preventDefault();
            event.stopPropagation();
            if (exceptionViews.indexOf($rootScope.previousState) >= 0) {
                return;
            }
            $state.go($rootScope.previousState);
        }
    });
    $ionicPlatform.on('resume', function () {
        $rootScope.foreground = true;
    });
    $ionicPlatform.on('pause', function () {
        $rootScope.foreground = false;
    });
});