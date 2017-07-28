var app = angular.module("wine", []);
app.controller("order_detail", function($scope, $http) {
	$scope.oid = GetQueryString("id");
	
	$http.get(getHeadUrl() + "order?id=" + $scope.oid).success(function(response) {
		$scope.order = response.data;
	});
	
	$scope.payAction = function(model) {
		location.href = "order.html?id=" + model.id;
	}
	
	$scope.makeSureAction = function() {
		if ($scope.makeSureClicked) {
	 		return;
	 	}
	 	$scope.makeSureClicked = true;
	 	$http.get(getHeadUrl() + "order_modify?id=" + $scope.order.id + "&status=3").success(function(response) {
			$scope.order.status = 3;	 	
	 	});
	}
});