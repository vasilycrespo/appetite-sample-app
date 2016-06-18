"use strict";
/*global angular, window, cordova, app*/
/*jslint nomen: true*/
angular.module('app.error', []).service('$error', [ '$ionicPopup', function ($ionicPopup) {
    var me = this;

    me.display = function(error) {
    	var message = "Unexpected error, please try again";
    	try {
	    	if (typeof error === 'string') {
	 			message = error;
	 		} else if (typeof error === 'object'){
	 			if(error.message) message = error.message;
	 			if(error.error.message) message = error.error.message;
	 		}
    	} catch (e) {};
		$ionicPopup.alert({
		    title: 'Ouch!',
		    template: message
		});
    };

}]);