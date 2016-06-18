"use strict";
/*global angular, window, cordova, app*/
/*jslint nomen: true*/
angular.module('app.login', []).service('$login', ['$ionicLoading', '$profile', '$localDB', '$timeout', function ($ionicLoading, $profile, $localDB, $timeout) {
    var me = this,
	    isEmpty = function (obj) {
	        if (obj == null) return true;
	        if (obj.length > 0)    return false;
	        if (obj.length === 0)  return true;
	        for (var key in obj) {
	            if (hasOwnProperty.call(obj, key)) return false;
	        }
	        return true;
	    };
    me.login = function(data, successCallback, errorCallback) {
      $ionicLoading.show();
    	var response = {},
    	    account = $localDB.validCredentials(data)
      $timeout(function(){
        $ionicLoading.hide();
        if(!account){
          response.status = 401
          response.error = {message: "Your email or password is wrong."};
          errorCallback(response);
        } else {
          me.endQuickstart();
          $profile.set(account, false, function() {
            response.status = 200
            response.data = $profile.get();
            successCallback(response);
          });
        }
      }, 900);
    };
    me.loged = function() {
    	if(isEmpty($profile.get())) {
    		return false;
    	} else {
    		return true;
    	}
    };
    me.logout = function() {
    	$profile.clear();
      me.clearQuickstart();
    };
    me.quickstart = function() {
        var quickstart = window.localStorage.getItem('appetite.app.quickstart');
        if (quickstart === null) {
            quickstart = false;
        } else {
          quickstart = true;
        }
        return JSON.parse(quickstart);
    }
    me.endQuickstart = function () {
      window.localStorage.setItem('appetite.app.quickstart', JSON.stringify(true));
    };
    me.clearQuickstart = function () {
      window.localStorage.removeItem('appetite.app.quickstart');
    };

}]);