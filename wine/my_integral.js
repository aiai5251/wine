var app = angular.module("wine", []);
app.controller("my_integral", function($scope, $http) {
	$scope.uid = getUid();
	$scope.point = GetQueryInt("point");

	if($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}

	$http.get(getHeadUrl() + "point?uid=" + $scope.uid).success(function(response) {
		$scope.pointList = response.data;
	});

});