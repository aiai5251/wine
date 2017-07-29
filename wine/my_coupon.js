var app = angular.module("wine", []);
app.controller("my_coupon", function($scope, $http) {
	$scope.uid = getUid();
	if ($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}
	
	$http.get(getHeadUrl() + "my_coupon?uid=" + $scope.uid).success(function(response) {
		$scope.couponList = response.data;
	});

});