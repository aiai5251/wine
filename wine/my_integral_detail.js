var app = angular.module("wine", []);
app.controller("my_integral_detail", function($scope, $http) {
	$scope.uid = getUid();
	if($scope.uid.length == 0) {
		location.href = "com/go.html?url=" + location.href;
		return;
	}
	
	$http.get(getHeadUrl() + "point?uid=" + $scope.uid).success(function(response) {
		$scope.pointList = response.data;		
	});
});