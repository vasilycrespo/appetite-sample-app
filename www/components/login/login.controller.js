"use strict";
/*global angular, window, cordova, app*/

app.controller('loginController', ['$scope', '$rootScope', '$state', '$api', '$timeout', '$validate', '$login', '$error', '$ionicLoading', function ($scope, $rootScope, $state, $api, $timeout, $validate, $login, $error, $ionicLoading) {
    $ionicLoading.show();
    if ($login.loged()) {
        $state.go("home");
        return;
    }
    $scope.data = {};
    $scope.start = function () {
    	$scope.started = true;
    	$timeout(function(){
    		$scope.startButtonHide = true;
    	}, 800)
    };
    $scope.logIn = function () {
    	if (!$validate.email($scope.data.email)) {
    		$error.display("Please, write a valid email address.");
    		return;
    	}
    	if(!$validate.length($scope.data.password, 6)){
    		$error.display("A password must contain at least six characters.");
    		return;
    	}
    	$login.login($scope.data, function(res) {
            $state.go("home");
        }, function (err){
    		$error.display(err);
    	});
    };
    $ionicLoading.hide();
}]);