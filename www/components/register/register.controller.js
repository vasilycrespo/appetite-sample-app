"use strict";
/*global angular, window, cordova, app*/

app.controller('registerController', ['$scope', '$rootScope', '$localDB', '$state', '$api', '$timeout', '$validate', '$error', '$profile', '$login', function ($scope, $rootScope, $localDB, $state, $api, $timeout, $validate, $error, $profile, $login) {
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
    $scope.register = function () {
        console.log($scope.data.full_name);
        console.log($validate.name($scope.data.full_name));
    	if (!$validate.name($scope.data.full_name)) {
    		$error.display("Please, write a valid full name.");
    		return;
    	}
    	if (!$validate.email($scope.data.email)) {
    		$error.display("Please, write a valid email address.");
    		return;
    	}
    	if (!$validate.length($scope.data.location, 2)) {
    		$error.display("Please, write a valid location.");
    		return;
    	}
    	if (!$validate.phone($scope.data.phone)) {
    		$error.display("Please, write a valid phone number.");
    		return;
    	}
    	if(!$validate.length($scope.data.password, 6)){
    		$error.display("A password must contain at least six characters.");
    		return;
    	}
    	if($scope.data.password!==$scope.data.re_password){
    		$error.display("Passwords doesn't match");
    		return;
    	}
    	$profile.set($scope.data, true, function(res) {
    		$state.go("quickstart");	
    	}, function (err){
    		$error.display(err);
    	});

    };

}]);