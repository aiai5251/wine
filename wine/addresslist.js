var app = angular.module("wine", []);
app.controller("addresslist", function($scope, $http) {
	
	$scope.push = function(pushId) {
		if (pushId == 1) {
			location.href = "address_control.html";
		} else {
			location.href = "address_add.html";
		}
	}

});