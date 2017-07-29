var app = angular.module("wine", []);
app.controller("detail_promotion", function($scope, $http) {
	$scope.pid = GetQueryString("id");
	$http.get(getHeadUrl() + "promotion?pid=" + $scope.pid).success(function(response) {
		$scope.promotionList = response.data;
	});
});