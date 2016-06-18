"use strict";
/*global angular, window, cordova, app*/

app.controller('quickstartController', ['$scope', '$rootScope', '$state', '$api', '$timeout', '$localDB', '$profile', '$login', function ($scope, $rootScope, $state, $api, $timeout, $localDB, $profile, $login) {
    
    if (!$login.loged()) {
        $state.go("login");
        return;
    }
	if ($login.quickstart()){
        $state.go("home");
        return;
	}

	$scope.step = 1;
	$scope.toStep = function(step) {
		switch(step) {
		    case 2:
		    	$scope.step = 2;
		        $scope.transtion = 1;
		        $timeout(function(){
		        	$scope.transtion = 2;	
		        }, 500);

		        break;
		    case 3:
		        break;
		}
	};
	var cardTypes = [
	    {image: 'img/sample1.jpg', text: "Japanese ramen soup", "id": 1},
	    {image: 'img/sample2.jpg', text: "Sweet cake", "id": 2},
	    {image: 'img/sample3.jpg', text: "Paella Valenciana", "id": 3},
	    {image: 'img/sample4.jpg', text: "Chocolate cupckackes", "id": 4},
	    {image: 'img/sample5.jpg', text: "Baked pork", "id": 5},
	    {image: 'img/sample6.jpg', text: "Sweet cream chololate mix", "id": 6},
	    {image: 'img/sample7.jpg', text: "Sushi Scorpion", "id": 7},
	    {image: 'img/sample8.jpg', text: "Bacon sandwitch", "id": 8},
	    {image: 'img/sample9.jpg', text: "Mix Ice cream", "id": 9},
	    {image: 'img/sample10.jpg', text: "Sashimi", "id": 10}
	  ];
	  $scope.cards = Array.prototype.slice.call(cardTypes, 0);
	  $scope.cardDestroyed = function(index, item) {
	  	var answer = false;
	  	if($scope.lastLocation > 0) {
	  		answer = true
	  	} else {
	  		answer = false;
	  	}
	  	if (item.id === 7 && answer) {
	  		$scope.sushi = true;
	  	}
	  	$scope.credits += 0.1;
	    $scope.cards.splice(index, 1);
	    if($scope.cards.length === 0) {
	    	$scope.congrats = true;
	    	$login.endQuickstart();
	    }
	  };
	  $scope.cardPartialSwipe = function (amt) {
	  	$scope.lastLocation = amt;
	  }
	  $scope.credits = 0;
}]);