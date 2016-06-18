"use strict";
/*global angular, window, cordova, app*/
app.controller('homeController', ['$scope', '$state', '$api', '$timeout', '$ionicPopup', '$profile', '$login', '$ionicLoading', '$rootScope', function ($scope, $state, $api, $timeout, $ionicPopup, $profile, $login, $ionicLoading, $rootScope) {
	$ionicLoading.show();
    if (!$login.loged()) {
        $state.go("login");
        return;
    }
    if(!$login.quickstart()){
    	$state.go("quickstart");
    };
	$scope.cards = [{"title":"Mario's lounge","subtitle":"4 miles from here","icon":"ion-ios-location","body":"Come and enjoy a fresh pizza with your friends. Ask for our chef's newest creation, the \"Strabaganzza Pizza\".","footer":"53 Comments","title_image":"img/user1.jpg","body_image":"img/post1.jpg"},{"title":"Anna","subtitle":"2 mins ago","icon":false,"body":"Wanna go out to eat something nice, anibody?","footer":"12 Comments","title_image":"img/user2.jpg","body_image":false},{"title":"Luis Angel","subtitle":"1 hour ago","icon":false,"body":"Look at this meal, spicy uh don't you think? ","footer":"3 Comments","title_image":"img/user3.jpg","body_image":"img/post3.jpg"},{"title":"Sushi Fusion","subtitle":"2 miles from here","icon":"ion-ios-location","body":" Come and try the best sushi in town! One roll is never enought. Once you taste Sushi Fusion Oriental Cuccine, you will never want to eat on a different place anymore.","footer":"165 Comments","title_image":"img/user4.png","body_image":"img/post4.jpg"},{"title":"What's your favorite pizza?","subtitle":"quick questions","icon":"ion-help-circled","body":false,"footer":false,"title_image":"img/user1.jpg","body_image":false}];
	$scope.profile = $profile.get();
	$scope.switchMenu = function () {
		if($scope.menuOn) {
			$scope.menu.close();
		} else {
			$scope.menu.open();
		}
	};
	$scope.menu = {
		close:function () {
			$scope.showGauge = false;
			$scope.menuOpen = false;	
			$scope.menuClose = true;
			$timeout(function() {
				$scope.menuOn = false;
			}, 700);
		},
		open: function () {
			$scope.menuOn = true;
			$scope.menuClose = false;
			$scope.menuOpen = true;	
		}
	};
	$scope.showCredits = function () {
		if($scope.promise) $timeout.cancel($scope.promise);
		$scope.showGauge = true;
		$scope.promise = $timeout(function() {
			$scope.showGauge = false;
		}, 1500);

		$scope.$apply();
	};
	$scope.menuAction = function (action) {
		$scope.menu.close();
		switch(action) {
		    case "start":
		        break;
		    case "account":
				$ionicPopup.alert({
				    title: 'Ouch!',
				    template: 'Feature not available on this code sample!'
				});
		        break;
		    case "shopping":
				$ionicPopup.alert({
				    title: 'Ouch!',
				    template: 'Feature not available on this code sample!'
				});
		        break;
		    case "logout":
				$ionicPopup.confirm({
					title: 'Login out',
					template: 'Are you sure you want to leave now?'
				}).then(function(res) {
					if(res) {
						$login.logout();
						$state.go('login');
					}
				});
		        break;
		}
	};
	$ionicLoading.hide();
}]);