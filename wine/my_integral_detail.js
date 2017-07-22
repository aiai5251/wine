var app = angular.module("wine", []);
app.controller("my_integral_detail", function($scope, $http) {
	$scope.uid = getUid();
	 $http.get(getHeadUrl() + "getPointDetailList?uid=" + $scope.uid).success(function(response) {
	 	$scope.pointList = response.data.pointList;
	 	console.log(response);
	 });
});