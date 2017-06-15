var app = angular.module("wine", []);
app.controller("address_control", function($scope, $http) {
	 $scope.push = function() {
		location.href = "address_add.html";
	}
	 
});